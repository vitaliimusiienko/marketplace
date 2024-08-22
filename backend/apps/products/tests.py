from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.promotions.models import Promotion
from apps.users.models import CustomUser, SellerProfile
from .models import Product, Category, Purchase
from .serializers import ProductSerializer, CategorySerializer

class ProductViewsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Создаем админа для аутентификации
        self.admin_user = User.objects.create_superuser(username='admin', password='adminpass')
        self.client.force_authenticate(user=self.admin_user)
        
        # Создаем обычного пользователя для тестов
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')

        # Создаем профили продавца и категории
        self.seller_profile = SellerProfile.objects.create(user=self.admin_user)
        self.category = Category.objects.create(name='Electronics')

        # Создаем промоакцию
        self.promotion = Promotion.objects.create(discount_percentage=20, is_active=True)
        
        # Создаем продукт
        self.product = Product.objects.create(
            name='Laptop',
            description='High performance laptop',
            seller=self.seller_profile,
            price=1000,
            category=self.category,
            promotion=self.promotion
        )

    def test_product_list(self):
        response = self.client.get('/products/')
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        
    def test_product_detail(self):
        response = self.client.get(f'/products/{self.product.id}/')
        serializer = ProductSerializer(self.product)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        
    def test_create_product(self):
        data = {
            'name': 'Smartphone',
            'description': 'Latest model',
            'seller': self.seller_profile.id,
            'price': 500,
            'category': self.category.id
        }
        response = self.client.post('/products/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
        self.assertEqual(Product.objects.latest('id').name, 'Smartphone')
        
    def test_create_product_no_permission(self):
        self.client.force_authenticate(user=None)
        data = {
            'name': 'Smartwatch',
            'description': 'Newest model',
            'seller': self.seller_profile.id,
            'price': 200,
            'category': self.category.id
        }
        response = self.client.post('/products/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_purchase_product(self):
        data = {'quantity': 2}
        response = self.client.post(f'/products/{self.product.id}/purchase/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Purchase.objects.count(), 1)
        self.assertEqual(Purchase.objects.first().product, self.product)
        
    def test_purchase_product_no_quantity(self):
        response = self.client.post(f'/products/{self.product.id}/purchase/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_discounted_product_list(self):
        response = self.client.get('/products/discounted/')
        products = Product.objects.filter(promotion__isnull=False)
        products = [product for product in products if product.promotion.is_active()]
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)