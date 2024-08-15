from django.urls import path
from .views import RecommendationViewSet

recommended_product_list = RecommendationViewSet.as_view({'get': 'list'})

urlpatterns = [
	  path('recommendations/', recommended_product_list, name='recommended_product_list')
]