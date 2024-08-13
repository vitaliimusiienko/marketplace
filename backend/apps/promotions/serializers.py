from rest_framework import serializers
from .models import Promotion

class PromotionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Promotion
    fields = '__all__'