from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Transaction, Escrow, AgentAvailability
from .serializers import UserSerializer, TransactionSerializer, EscrowSerializer, AgentAvailabilitySerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['put'])
    def switch_role(self, request):
        user = request.user
        new_role = request.data.get('role')
        if new_role in [role[0] for role in User.ROLES]:
            user.role = new_role
            user.save()
            return Response({'message': 'Role updated successfully'})
        return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        transaction = serializer.save(sender=self.request.user)
        Escrow.objects.create(transaction=transaction, amount=transaction.amount)

    @action(detail=True, methods=['put'])
    def confirm(self, request, pk=None):
        transaction = self.get_object()
        if transaction.status == 'PENDING' and request.user.role == 'AGENT':
            transaction.agent = request.user
            transaction.status = 'PROCESSING'
            transaction.save()
            return Response({'message': 'Transaction confirmed'})
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def complete(self, request, pk=None):
        transaction = self.get_object()
        if transaction.status == 'PROCESSING' and request.user == transaction.agent:
            transaction.status = 'COMPLETED'
            transaction.save()
            escrow = Escrow.objects.get(transaction=transaction)
            escrow.status = 'RELEASED'
            escrow.save()
            return Response({'message': 'Transaction completed'})
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

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