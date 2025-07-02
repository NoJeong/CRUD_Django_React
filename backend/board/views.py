from rest_framework import viewsets
from rest_framework import filters
from .models import Post
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class PostViewSet(viewsets.ModelViewSet):
    queryset         = Post.objects.order_by('-created')
    serializer_class = PostSerializer

    # 업로드(parsing) 설정
    parser_classes   = [MultiPartParser, FormParser]

    # 검색: search=키워드
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields   = ['title', 'content']

    # 정렬: ordering=created or ordering=-created
    ordering_fields = ['created', 'title']