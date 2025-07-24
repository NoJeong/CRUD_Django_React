from rest_framework import serializers
from .models import Post
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'content', 'created']

class PostSerializer(serializers.ModelSerializer):
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)
    class Meta:
        model  = Post
        fields = ['id','title','content','attachment','created','comments_count']