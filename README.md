# MyBoard - 게시판 프로젝트

Django REST Framework + React로 구현한 게시판 웹 애플리케이션입니다.

## 🚀 주요 기능

- **게시글 관리**: 글 작성, 조회, 수정, 삭제
- **파일 첨부**: 이미지 및 파일 업로드/다운로드
- **댓글 시스템**: 게시글별 댓글 작성 및 조회
- **검색 및 정렬**: 제목/내용 검색, 최신순/오래된순 정렬
- **페이지네이션**: 게시글 목록 페이지네이션

## 🛠 기술 스택

### Backend
- **Django 5.x**: 웹 프레임워크
- **Django REST Framework**: API 개발
- **SQLite**: 데이터베이스 (개발 환경)
- **PostgreSQL**: 데이터베이스 (배포 환경)

### Frontend
- **React 18**: 사용자 인터페이스
- **React Router**: 클라이언트 사이드 라우팅
- **React Bootstrap**: UI 컴포넌트
- **Fetch API**: HTTP 통신

### DevOps
- **Docker**: 컨테이너화
- **Docker Compose**: 다중 컨테이너 관리

## 📁 프로젝트 구조

```
toy_project_1/
├── backend/                 # Django 백엔드
│   ├── board/              # 게시판 앱
│   │   ├── models.py       # 데이터 모델
│   │   ├── serializers.py  # API 직렬화
│   │   ├── views.py        # API 뷰
│   │   └── migrations/     # 데이터베이스 마이그레이션
│   ├── project/            # Django 프로젝트 설정
│   ├── media/              # 업로드된 파일 저장소
│   └── requirements.txt    # Python 의존성
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── api.js          # API 통신 함수
│   │   └── App.js          # 메인 앱 컴포넌트
│   └── package.json        # Node.js 의존성
├── docker-compose.yaml     # Docker Compose 설정
└── start.ps1              # 개발 환경 실행 스크립트
```

## 🚀 빠른 시작

### 1. 개발 환경 실행

```powershell
# PowerShell에서 실행
./start.ps1
```

이 스크립트는 다음을 자동으로 실행합니다:
- 백엔드: Django 서버 (http://localhost:8000)
- 프론트엔드: React 개발 서버 (http://localhost:3000)

### 2. Docker 환경 실행

```bash
# 전체 서비스 실행
docker-compose up -d

# 프론트엔드만 재빌드
docker-compose build frontend
docker-compose up -d frontend
```

## 📖 API 문서

### 게시글 API
- `GET /api/posts/` - 게시글 목록 조회
- `POST /api/posts/` - 게시글 작성
- `GET /api/posts/{id}/` - 게시글 상세 조회
- `PATCH /api/posts/{id}/` - 게시글 수정
- `DELETE /api/posts/{id}/` - 게시글 삭제

### 댓글 API
- `GET /api/comments/?post={id}` - 댓글 목록 조회
- `POST /api/comments/` - 댓글 작성

## 🔧 개발 가이드

### 백엔드 개발

```bash
cd backend
python manage.py makemigrations  # 모델 변경 시
python manage.py migrate         # 마이그레이션 적용
python manage.py runserver       # 개발 서버 실행
```

### 프론트엔드 개발

```bash
cd frontend
npm install                     # 의존성 설치
npm start                       # 개발 서버 실행
npm run build                   # 프로덕션 빌드
```

## 📝 파일 업로드/다운로드 흐름

### 업로드(Upload) 흐름

#### 1. 프론트엔드 (React)
```javascript
// WritePage.js 또는 EditPage.js
const fd = new FormData();
fd.append('title', title);
fd.append('content', content);
fd.append('attachment', file);  // 파일 첨부

await createPost(fd);  // 또는 updatePost(id, fd)
```

#### 2. API 호출 (api.js)
```javascript
export async function createPost(formData) {
  const res = await fetch(`${API_BASE}/posts/`, {
    method: 'POST',
    body: formData,  // FormData 인스턴스 (파일 포함)
  });
  return res.json();
}
```

#### 3. 백엔드 수신 (Django)
```python
# urls.py - 라우팅
router.register(r'posts', PostViewSet)

# views.py - 요청 처리
class PostViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]  # 파일 업로드 지원
```

#### 4. 시리얼라이저 처리
```python
# serializers.py
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'attachment', 'created']
```

#### 5. 모델 저장
```python
# models.py
class Post(models.Model):
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)
```

**FileField의 `upload_to='attachments/'` 옵션**으로 업로드된 파일이 `MEDIA_ROOT/attachments/` 폴더에 자동 저장됩니다.

#### 6. 응답
- Django가 파일을 저장하고, DB의 `attachment` 필드에는 파일 경로(예: `attachments/abc123.jpg`)가 저장됩니다.
- API 응답으로는 파일의 URL(예: `http://localhost:8000/media/attachments/abc123.jpg`)이 반환됩니다.

### 다운로드(Download) 흐름

#### 1. 프론트엔드에서 파일 URL 접근
```javascript
// DetailPage.js
{post.attachment && (
  <a href={post.attachment} download>파일 다운로드</a>
)}
```

#### 2. 백엔드에서 파일 서빙
- Django는 `MEDIA_URL` 설정을 통해 정적 파일을 서빙합니다.
- 개발 환경: Django가 직접 `/media/attachments/abc123.jpg`를 서빙
- 배포 환경: Nginx/Apache가 정적 파일로 서빙

#### 3. 브라우저에서 파일 처리
- 이미지 파일: 새 창에서 미리보기 또는 다운로드
- 기타 파일: 브라우저 기본 다운로드 동작

### 핵심 포인트

1. **FormData 사용**: 파일과 텍스트 데이터를 함께 전송
2. **MultiPartParser**: Django에서 multipart/form-data 파싱
3. **FileField**: Django ORM의 자동 파일 저장 기능
4. **MEDIA_URL**: 정적 파일 서빙을 위한 URL 설정
5. **자동화**: Django가 파일 저장, 경로 관리, URL 생성까지 자동 처리

### Django vs Spring 비교

| 기능 | Django | Spring |
|------|--------|--------|
| 파일 파싱 | `parser_classes`로 자동 | `MultipartFile`로 직접 처리 |
| 파일 저장 | `FileField`가 자동 | 직접 경로/이름 지정, 저장 |
| DB 저장 | `FileField`가 경로 자동 저장 | 직접 쿼리/ORM 코드 작성 |
| 다운로드 | 정적 파일 서빙 자동 | 직접 파일 읽어 응답 |
| 코드량 | 매우 적음 | 많고 복잡 |

이러한 자동화 덕분에 Django는 파일 업로드/다운로드 구현이 Spring에 비해 훨씬 간단하고 빠릅니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요. 