from rest_framework import serializers
from .models import Product, Category
from apps.reviews.serializers import ProductReviewSerializer

class ProductSerializer(serializers.ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)
    discounted_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'
        
    def get_discounted_price(self, obj):
        return obj.get_discounted_price()

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'products']  