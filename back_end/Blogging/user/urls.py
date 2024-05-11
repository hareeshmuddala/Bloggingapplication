from django.contrib import admin
from django.urls import path,include
from post import urls
from  . views import *

urlpatterns = [
    path('signup',Signup.as_view(),name="signup" ),
    path('signin',Login.as_view(),name="signin" ),
    path('profile/update', ProfileUpdate.as_view()),

]

