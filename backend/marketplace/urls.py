from django.contrib import admin
from rest_framework.authtoken import views as drf_views
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_auth/', include('rest_framework.urls')),
    path('api_token_auth/', drf_views.obtain_auth_token),
    path('api/', include('apps.users.urls')),
]
