from rest_framework import serializers
from home.models import Users

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=['username','first_name','last_name','email','password','user_image']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password=serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['user_image']

    
