
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Product, Category, Purchase
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
@permission_classes([IsAdminUser])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        product = serializer.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def purchase_product(request, product_id):
    user = request.user
    quantity = request.data.get('quantity')

    if not quantity:
        return Response({'error': 'Quantity is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    purchase = Purchase(user=user, product=product, quantity=quantity)
    purchase.save()

    return Response({'message': 'Purchase successful'}, status=status.HTTP_201_CREATED)

class DiscountedProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        products_with_promotions = Product.objects.filter(promotion__isnull=False)
        return [product for product in products_with_promotions if product.promotion.is_active()]
    