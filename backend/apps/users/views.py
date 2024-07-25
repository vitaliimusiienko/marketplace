from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserRegistrationSerializer,CustomUserSerializer,CustomTokenObtainPairSerializer
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    
class UserDetailUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)
    
    def get_obgect(self):
        return self.request.user
    
    def perform_update(self, serializer):
        if self.request.user != serializer.instance:
            raise PermissionDenied("You don't have permission to edit this user")
        serializer.save()
        
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    