from rest_framework import serializers
from .models import SellerReview, ProductReview


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
    
    