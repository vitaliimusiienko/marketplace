from rest_framework import serializers
from .models import ProductReview, SellerReview


class ProductReviewSerializer(serializers.ModelSerializer):  
    class Meta:
        model = ProductReview
        fields = ['id', 'user', 'product', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'user', 'product', 'created_at']
        
class SellerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerReview
        fields = '__all__'
        
    
    