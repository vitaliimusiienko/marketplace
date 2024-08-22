from django.urls import path
from apps.users.views import register_user, login_user, logout_user, update_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('update/', update_user, name='user-update'),
    path('logout/', logout_user, name='logout'),
]