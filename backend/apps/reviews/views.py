from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProductReview
from apps.products.models import Product
from .serializers import SellerReviewSerializer, ProductReviewSerializer

class ProductReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductReviewSerializer
    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductReview.objects.filter(product_id=product_id).order_by('-created_at')
    
    def perform_create(self, request, serializer):
        serializer.save(user=request.user, product_id=self.kwargs['product_id'])
        
@api_view(['POST'])
def submit_seller_review(request, product_id):
    try:
        user = request.user
        product = Product.objects.get(id=product_id)
        seller = product.seller
        serializer = SellerReviewSerializer(data={
            'seller': seller.id,
            'reviewer': user.id,
            **request.data
        })
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Review submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
