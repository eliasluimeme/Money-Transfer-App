from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = (
        ('SENDER', 'Sender'),
        ('RECEIVER', 'Receiver'),
        ('AGENT', 'Agent'),
    )
    role = models.CharField(max_length=20, choices=ROLES, default='SENDER')

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='custom_user_set',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='custom_user_set',
        related_query_name='custom_user',
    )

class Transaction(models.Model):
    STATUSES = (
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_transactions')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_transactions')
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='processed_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUSES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Escrow(models.Model):
    STATUSES = (
        ('HELD', 'Held'),
        ('RELEASED', 'Released'),
    )
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUSES, default='HELD')
    created_at = models.DateTimeField(auto_now_add=True)
    released_at = models.DateTimeField(null=True, blank=True)

class AgentAvailability(models.Model):
    STATUSES = (
        ('AVAILABLE', 'Available'),
        ('BUSY', 'Busy'),
        ('OFFLINE', 'Offline'),
    )
    agent = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUSES, default='OFFLINE')
    last_updated = models.DateTimeField(auto_now=True)