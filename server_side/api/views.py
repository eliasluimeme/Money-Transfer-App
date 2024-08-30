from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Transaction, Escrow, AgentAvailability, Balance
from .serializers import UserSerializer, TransactionSerializer, AgentAvailabilitySerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import permissions
from django.db import transaction
from .serializers import TransactionSerializer, BalanceSerializer
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError
from decimal import Decimal



class UserViewSet(viewsets.ModelViewSet):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializer(user).data, 
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                }, status=status.HTTP_201_CREATED)
            except IntegrityError as e:
                return Response({'error': 'A user with this username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['put'])
    def switch_role(self, request):
        user = request.user
        new_role = request.data.get('role')
        if new_role in [role[0] for role in User.ROLES]:
            user.role = new_role
            user.save()
            return Response({'message': 'Role updated successfully'})
        return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
    
class IsAgent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'AGENT'

class IsSenderOrAgent(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.sender == request.user or request.user.role == 'AGENT'

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['confirm', 'complete']:
            self.permission_classes = [IsAuthenticated, IsAgent]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated, IsSenderOrAgent]
        return super().get_permissions()

    @transaction.atomic
    def perform_create(self, serializer):
        try:
            print("Performing create with data:", serializer.validated_data)
            amount = serializer.validated_data.get('amount')
            user = self.request.user
            
            # Fetch the user's balance
            try:
                user_balance = Balance.objects.get(user=user)
            except Balance.DoesNotExist:
                raise ValidationError("User has no balance")

            if user_balance.amount < amount:
                raise ValidationError("Insufficient balance")

            # Save the transaction
            transaction = serializer.save(
                sender=user,
                status='PENDING'
            )

            # Create the escrow
            Escrow.objects.create(transaction=transaction, amount=amount, status='HELD')

            # Update the user's balance
            user_balance.amount -= amount
            user_balance.save()

            print(f"Transaction created: {transaction.id}, New balance: {user_balance.amount}")
            return transaction
        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            raise
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            raise ValidationError("An unexpected error occurred")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    @transaction.atomic
    @action(detail=True, methods=['put'])
    def confirm(self, request, pk=None):
        transaction = self.get_object()
        if transaction.status != 'PENDING':
            return Response({'error': 'Transaction is not in PENDING state'}, status=status.HTTP_400_BAD_REQUEST)
        
        transaction.agent = request.user
        transaction.status = 'PROCESSING'
        transaction.save()
        return Response({'message': 'Transaction confirmed'})

    @transaction.atomic
    @action(detail=True, methods=['put'])
    def complete(self, request, pk=None):
        transaction = self.get_object()
        if transaction.status != 'PROCESSING':
            return Response({'error': 'Transaction is not in PROCESSING state'}, status=status.HTTP_400_BAD_REQUEST)
        if request.user != transaction.agent:
            return Response({'error': 'Only the assigned agent can complete this transaction'}, status=status.HTTP_403_FORBIDDEN)
        
        transaction.status = 'COMPLETED'
        transaction.save()
        
        escrow = Escrow.objects.get(transaction=transaction)
        escrow.status = 'RELEASED'
        escrow.save()
        return Response({'message': 'Transaction completed'})

    def destroy(self, request, *args, **kwargs):
        transaction = self.get_object()
        if transaction.status != 'PENDING':
            return Response({'error': 'Only PENDING transactions can be cancelled'}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)

class AgentAvailabilityViewSet(viewsets.ModelViewSet):
    queryset = AgentAvailability.objects.all()
    serializer_class = AgentAvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)

    @action(detail=False, methods=['put'])
    def set_availability(self, request):
        availability, created = AgentAvailability.objects.get_or_create(agent=request.user)
        availability.status = request.data.get('status', 'OFFLINE')
        availability.save()
        return Response({'message': 'Availability updated'})
    
class BalanceViewSet(viewsets.ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def add(self, request):
        amount_to_add = request.data.get('amount')
        
        if amount_to_add is None:
            return Response({'error': 'Amount not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            amount_to_add = Decimal(amount_to_add)
            if amount_to_add <= 0:
                raise ValueError("Amount must be positive")

            user_balance = Balance.objects.get(user=request.user)
            user_balance.amount += amount_to_add
            user_balance.save()

            return Response({'message': 'Balance updated successfully', 'balance': user_balance.amount})
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Balance.DoesNotExist:
            return Response({'error': 'Balance does not exist for this user'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)