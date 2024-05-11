from django.contrib import admin
from django.urls import path,include
from post import urls
from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    path('post/', include('post.urls')),
    path('user/', include('user.urls')),

]

