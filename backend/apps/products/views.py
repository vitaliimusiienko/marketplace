
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from apps.reviews.serializers import ProductReviewSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        product = self.get_object()
        reviews = product.reviews.all()
        serializer = ProductReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        category_id = self.request.query_params.get('category', None)
        if category_id:
            return self.queryset.filter(category_id=category_id)
        return self.queryset

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer