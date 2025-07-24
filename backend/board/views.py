from rest_framework import viewsets
from rest_framework import filters
from .models import Post
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse, Http404
import os
from .models import Comment
from .serializers import CommentSerializer

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



def download_attachment(request, post_id):
    # post_id로 해당 Post 가져오기
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        raise Http404("해당 게시물이 존재하지 않음")

    if not post.attachment:
        raise Http404("첨부파일이 없음")

    file_path = post.attachment.path  # 모델 필드가 FileField라면 path 속성 사용
    file_name = os.path.basename(file_path)
    print(file_name)

    response = FileResponse(open(file_path, 'rb'))
    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created')
    serializer_class = CommentSerializer
