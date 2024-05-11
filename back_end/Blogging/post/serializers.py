from rest_framework import serializers
from home.models import Posts,Users,Bookmarks,Comments

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        fields='__all__'
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields='__all__'


class GetPostsSerializer(serializers.ModelSerializer):
    user_id=userSerializer()
    class Meta:
        model=Posts
        fields='__all__'
        

class SavePostSerializer(serializers.ModelSerializer):
    user_id=userSerializer()
    post_id=GetPostsSerializer()
    class Meta:
        model=Bookmarks
        fields=['user_id','post_id']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['comment']

class CommentsDataSerializer(serializers.ModelSerializer):
    user_id=userSerializer()
    post_id=GetPostsSerializer()
    class Meta:
        model=Comments
        fields='__all__'

# ['username','email','password','first_name','last_name']

        