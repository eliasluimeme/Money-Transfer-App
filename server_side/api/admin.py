from django.contrib import admin
from .models import User, Transaction, Balance

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'amount', 'status', 'created_at')  # Fields to display
    list_filter = ('status',)  # Add filters by status
    search_fields = ('sender__username', 'receiver__username', 'amount')  # Enable searching

@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_username', 'get_email', 'amount')
    
    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = 'Username'
    
    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'get_balance')
    search_fields = ('username', 'email')
    
    def get_balance(self, obj):
        return obj.balance.amount if hasattr(obj, 'balance') else None
    get_balance.short_description = 'Balance'


# Register your models and the admin classes
# admin.site.register(User, UserAdmin)
# admin.site.register(Balance, BalanceAdmin)
# admin.site.register(Transaction, TransactionAdmin)
