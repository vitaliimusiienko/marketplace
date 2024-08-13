
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.request.query_params.get('category')
        if category_id:
            return Product.objects.filter(category_id=category_id)
        return Product.objects.all()
    
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
@api_view(['POST'])
@method_decorator(login_required, name='dispatch')
def buy_product(request, product_id):
    try:
        user = request.user
        product = Product.objects.get(id=product_id)

        if product.stock <= 0:
            return Response({'error': 'Product out of stock'}, status=status.HTTP_400_BAD_REQUEST)

        product.stock -= 1
        product.save()

        return Response({'message': 'Purchase successful'}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)