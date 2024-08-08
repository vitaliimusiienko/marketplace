from rest_framework import serializers
from .models import Product
from apps.reviews.serializers import ProductReviewSerializer

class ProductSerializer(serializers.ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)
    
    class Meta:
        models = Product
        fields = ['id', 'name', 'article', 'description', 'price', 'reviews']
    
    