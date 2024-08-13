from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Purchase
from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from django.db.models import Count

@api_view(['GET'])
def recommend_products(request):
    user = request.user

    purchased_products = Purchase.objects.filter(user=user).values_list('product', flat=True)

    if not purchased_products:
        return Response([], status=200)

    recommendations = Product.objects.filter(
        purchases__user__in=Purchase.objects.filter(product__in=purchased_products).values_list('user', flat=True)
    ).exclude(id__in=purchased_products).distinct()

    recommendations = recommendations.annotate(
        purchase_count=Count('purchases')
    ).order_by('-purchase_count')

    serializer = ProductSerializer(recommendations, many=True)
    return Response(serializer.data, status=200)
