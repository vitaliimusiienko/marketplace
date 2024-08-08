from rest_framework import serializers
from .models import SellerReview, ProductReview
from apps.products.models import Product
from apps.users.models import SellerProfile

class ProductReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = ProductReview
        fields = ['id', 'user', 'product', 'rating', 'comment', 'created_at']
        
class SellerReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = SellerReview
        fields = ['id', 'user', 'seller', 'rating', 'comment', 'created_at']
    
    