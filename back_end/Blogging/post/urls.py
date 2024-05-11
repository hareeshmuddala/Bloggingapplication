from django.contrib import admin
from django.urls import path,include
from post import urls
from  . views import *

urlpatterns = [
   
    path('create',CreatePost.as_view(),name="createpost" ),
    path('myposts/', MyPosts.as_view(), name="getmyposts"),
     path('feedposts/<int:pagenumber>/',FeedPosts.as_view(),name='getFeedPosts'),
     path('myposts/<int:userId>/', MyPosts.as_view(), name="getmyposts"),
     path('getpost/<int:postId>/', GetPost.as_view(), name='getpost'),
     path('likepost/<int:postId>/',LikePost.as_view(),name='Postlike'),
     path('savepost/<int:postId>/',SavePost.as_view(),name='SavePost'),
     path('deletepost/<int:postId>/',SavePost.as_view(),name='Deletepost'),
     path('filter/<str:filter>/',FilterPosts.as_view(),name='filterPosts'),
     path('getsavedposts/',SavePost.as_view(),name='getSavedPosts'),
      path('postcomment/',CommentsAPI.as_view(),name='postcomment'),
       path('getcomments/<int:postid>/',CommentsAPI.as_view(),name='getcoments'),

]

