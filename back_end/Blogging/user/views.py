from django.shortcuts import render
from rest_framework.views import APIView,Response
from .serializers import SignupSerializer,LoginSerializer,UserSerializer
from rest_framework import status
from home.models import Users
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import jwt
class Signup(APIView):

    def post(self,request):
        serializer=SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Your account is succefully created","status":status.HTTP_201_CREATED})
        return Response({"message":"some fields are missing","status":status.HTTP_400_BAD_REQUEST})
    def get(self,request):
        pass

class Login(APIView):

    def post(self,request):
        print(request.data)
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['username']
            try:
                refresh = RefreshToken.for_user(Users.objects.get(username=user))
                user=Users.objects.get(username=user)
                if user is not None:
                    return Response({"message":"Your logged in  succefully ","jwt_token": str(refresh.access_token),"status":status.HTTP_200_OK})
            except:
                return Response({"message":"incorrect details","status":status.HTTP_400_BAD_REQUEST})
        return Response({"message":"incorrect details","status":status.HTTP_400_BAD_REQUEST})


# class ProfileUpdate(APIView):
#     def put(self,request):
#         permission_classes = [IsAuthenticated,]
#         token = request.headers.get('Authorization').split(' ')[1]  # Extracting the token part after 'Bearer '

#         if token is None:
#             return Response({"message":"Invalid User","status":status.HTTP_400_BAD_REQUEST})
#         decoded_token = jwt.decode(token, options={"verify_signature": False})
#         user_id = decoded_token.get('user_id')
#         user=Users.objects.get(pk=user_id)
        
class ProfileUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        print("in profile update")
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



