from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from .models import CustomUser, SellerProfile
from apps.reviews.serializers import SellerReviewSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        

    def create(self, validated_data):     
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        refresh = RefreshToken.for_user(instance)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
class SellerSerializer(serializers.ModelSerializer):
    reviews = SellerReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = SellerProfile
        fields = ['id', 'user', 'reviews']