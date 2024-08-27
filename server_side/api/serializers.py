from rest_framework import serializers
from .models import User, Transaction, Escrow, AgentAvailability

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class EscrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escrow
        fields = '__all__'

class AgentAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentAvailability
        fields = '__all__'