from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet, TransactionViewSet, AgentAvailabilityViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'agent-availability', AgentAvailabilityViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]