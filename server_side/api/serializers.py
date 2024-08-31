from rest_framework import serializers
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import User, Transaction, Balance, Escrow, AgentAvailability

User = get_user_model()

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['amount']

class UserSerializer(serializers.ModelSerializer):
    balance = BalanceSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'balance']
        extra_kwargs = {'password': {'write_only': True}}

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Balance.objects.get_or_create(user=user, defaults={'amount': 0})
        return user

class TransactionSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()
    receiver_username = serializers.SerializerMethodField()
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'sender', 'sender_username', 'receiver', 'receiver_username', 'status']
        read_only_fields = ['sender', 'status']

    def get_sender_username(self, obj):
        return obj.sender.username if obj.sender else None
        
    def get_receiver_username(self, obj):
        return obj.receiver.username if obj.receiver else None

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_receiver(self, value):
        request = self.context.get('request')
        if request and request.user == value:
            raise serializers.ValidationError("You cannot send money to yourself.")
        return value

    def validate(self, data):
        if 'amount' in data and 'receiver' in data:
            sender = self.context['request'].user
            if sender.balance.amount < data['amount']:
                raise serializers.ValidationError("Insufficient balance to make this transaction.")
        return data

    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        validated_data['status'] = 'PENDING'
        return super().create(validated_data)

class EscrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escrow
        fields = '__all__'

class AgentAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentAvailability
        fields = '__all__'