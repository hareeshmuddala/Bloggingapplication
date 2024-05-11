import jwt
from django.conf import settings
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CreatePostSerializer,GetPostsSerializer
from .serializers import userSerializer,SavePostSerializer,CommentSerializer,CommentsDataSerializer
from rest_framework.response import Response
from rest_framework import status
from home.models import Posts,Users,Bookmarks,Comments
from rest_framework.permissions import IsAuthenticated

class CreatePost(APIView):
    def post(self,request):
        permission_classes = [IsAuthenticated,]
        token = request.headers.get('Authorization').split(' ')[1]  # Extracting the token part after 'Bearer '

        if token is None:
            return Response({"message":"Invalid User","status":status.HTTP_400_BAD_REQUEST})
       
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return Response({"message":"Invalid User ","status":status.HTTP_400_BAD_REQUEST})
        user=Users.objects.get(pk=user_id)
        print(request.data)
        serializer=CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user)
            return Response({"message":"Post is  sucefully created","status":status.HTTP_200_OK})
        else:
            return Response({"message":"some fields are missing ","status":status.HTTP_400_BAD_REQUEST})
    
    def put(self,request):
        permission_classes = [IsAuthenticated,]
        post_id=request.post_id
        post=Posts.objects.get(post_id=post_id)
        serializer=CreatePostSerializer(post,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Post is  sucefully updated","status":status.HTTP_200_OK})
        else:
            return Response({"message":"some fields are missing ","status":status.HTTP_400_BAD_REQUEST})
        
class MyPosts(APIView):
    def get(self,request,userId=None):
        permission_classes = [IsAuthenticated,]
        print("user id is ",request.user.id)
        if userId is not None:
            try: 
                posts = Posts.objects.filter(user_id=userId)
                if posts is None:
                    return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})

                serializer=GetPostsSerializer(posts,many=True)
                user = Users.objects.get(id=userId)
                userserializer=userSerializer(user)
                return Response({"posts":serializer.data,"user":userserializer.data,"status":status.HTTP_200_OK})
            except:
                return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})

        try:
            user = Users.objects.get(username=request.user)
            posts = Posts.objects.filter(user_id=user)
            serializer=GetPostsSerializer(posts,many=True)
            userserializer=userSerializer(user)
            return Response({"posts":serializer.data,"user":userserializer.data,"status":status.HTTP_200_OK})
        except:
             return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})
        

class GetPost(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self,request,postId):
        try:
            posts = Posts.objects.filter(post_id=postId)
            if posts is not None:
                serializer=GetPostsSerializer(posts,many=True)
                return Response({"posts":serializer.data,"status":status.HTTP_200_OK})
            return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})
        except:
             return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})
        
class LikePost(APIView):
    permission_classes = [IsAuthenticated,]
    def post(self,request,postId):
        post=Posts.objects.get(post_id=postId)
        if post:
            post.increase_like()
            return Response({"status":status.HTTP_200_OK})
        else:
            return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})
        

class SavePost(APIView):
    permission_classes = [IsAuthenticated,]
    def post(self,request,postId):
        try:
            user = Users.objects.get(username=request.user)
            post = Posts.objects.get(post_id=postId)
            try:
                is_there = Bookmarks.objects.get(user_id=user, post_id=post)
                if is_there:
                    Bookmarks.objects.get(user_id=user, post_id=post).delete()
                    return Response({"message":"removed from favourites","status":status.HTTP_200_OK})
            except:
                bookmark = Bookmarks.objects.create(user_id=user, post_id=post)
                bookmark.save()
                return Response({"message":"added to favourites","status":status.HTTP_200_OK})
        except:
            return Response({"message":"Something went wrong","status":status.HTTP_400_BAD_REQUEST})
  
    def get(self,request):
        user = Users.objects.get(username=request.user)
        userserializer=userSerializer(user)
        saved_posts=Bookmarks.objects.filter(user_id=user)
        serializer=SavePostSerializer(saved_posts,many=True)
        return Response({"posts":serializer.data,"user":userserializer.data,"status":status.HTTP_200_OK})
    
    def delete(self,request,postId):
        try:
            user = Users.objects.get(username=request.user)
            
            bookmark = Posts.objects.get(user_id=user, post_id=postId)
            if bookmark:
                Posts.objects.get(user_id=user, post_id=postId).delete()
                return Response({"message":"deleted succesfully","status":status.HTTP_200_OK})
        except:
            return Response({"message":"Permission denied","status":status.HTTP_400_BAD_REQUEST})

class FilterPosts(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self,request,filter):
        print("inside filter")
        filtered_posts = Posts.objects.filter(title__icontains=filter)
        serializer=GetPostsSerializer(filtered_posts,many=True)
        return Response({"posts":serializer.data,"status":status.HTTP_200_OK})
    


class FeedPosts(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request, pagenumber):
        try:
            page_number = int(pagenumber)
            page_size = 6
            start_index = (page_number-1) * page_size
            end_index = start_index + page_size

            posts = Posts.objects.all()[start_index:end_index]
            serializer = GetPostsSerializer(posts, many=True)
            return Response({"posts": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CommentsAPI(APIView):
    permission_classes = [IsAuthenticated,]
    def post(self,request):
        token = request.headers.get('Authorization').split(' ')[1]  # Extracting the token part after 'Bearer '

        if token is None:
            return Response({"message":"Invalid User","status":status.HTTP_400_BAD_REQUEST})
       
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return Response({"message":"Invalid User ","status":status.HTTP_400_BAD_REQUEST})
        user=Users.objects.get(pk=user_id)
        post=Posts.objects.get(pk=request.data.get('postid'))
        print(request.data)
        serializer=CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user,post_id=post)
            return Response({"message":"comment is  sucefully posted","status":status.HTTP_200_OK})
        else:
            return Response({"message":"some fields are missing ","status":status.HTTP_400_BAD_REQUEST})

    def get(self,request,postid):
        post=Posts.objects.get(post_id=postid)
        comments=Comments.objects.filter(post_id=post)
        serializer = CommentsDataSerializer(comments, many=True)
        return Response({"comments": serializer.data}, status=status.HTTP_200_OK)





        
