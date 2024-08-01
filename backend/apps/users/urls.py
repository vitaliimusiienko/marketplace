from django.urls import path
from .views import UserRegistrationView, UserDetailUpdateView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('update/', UserDetailUpdateView.as_view(), name='user-detail-update'),
]