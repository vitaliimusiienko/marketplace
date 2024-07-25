from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, UserDetailUpdateView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('me/', UserDetailUpdateView.as_view(), name='user-detail-update'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh-token')
]