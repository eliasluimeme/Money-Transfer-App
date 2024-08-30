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
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'receiver', 'status']
        read_only_fields = ['sender', 'status']

    def create(self, validated_data):
        return Transaction.objects.create(**validated_data)

class EscrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escrow
        fields = '__all__'

class AgentAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentAvailability
        fields = '__all__'