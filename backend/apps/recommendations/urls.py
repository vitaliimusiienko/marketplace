from django.urls import path
from .views import recommend_products

urlpattern = [
	path('recommendations/', recommend_products, name='recommend_products')
]