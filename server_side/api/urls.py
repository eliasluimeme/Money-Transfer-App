from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserViewSet, TransactionViewSet, BalanceViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'balance', BalanceViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/register/', UserViewSet.as_view({'post': 'register'}), name='user-register'),
    path('users/login/', UserViewSet.as_view({'post': 'login'}), name='user-login'),
    path('balance/add/', BalanceViewSet.as_view({'put': 'balance'}), name='balance'),
]