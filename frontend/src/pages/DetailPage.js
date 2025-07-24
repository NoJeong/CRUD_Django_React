// frontend/src/pages/DetailPage.js
import React, { useEffect, useState }  from 'react';
import { fetchPost, deletePost }       from '../api';
import { fetchComments, createComment } from '../api';
import { useParams, useNavigate }      from 'react-router-dom';
import { Card, Button, Image }         from 'react-bootstrap';

export default function DetailPage() {
  const { id } = useParams();
  const nav    = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPost(id);
      setPost(data);
      // 댓글 목록도 불러오기
      const commentData = await fetchComments(id);
      setComments(commentData.results || commentData);
    };
    load();
  }, [id]);

  // ❗ 로딩 상태 체크는 반드시 여기서!
  if (!post) return <div>로딩중…</div>;

  const onDelete = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deletePost(id);
    nav('/');
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async e => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setCommentLoading(true);
    await createComment(id, commentInput);
    setCommentInput("");
    // 등록 후 목록 새로고침
    const commentData = await fetchComments(id);
    setComments(commentData.results || commentData);
    setCommentLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Card.Text>
          {post.attachment && typeof post.attachment === "string" && post.attachment.trim() !== "" && (
            /\.(jpe?g|png|gif|bmp)$/i.test(post.attachment) ? (
              <Image src={post.attachment} fluid className="my-3"/>
            ) : (
              <a href={post.attachment} download className="my-3 d-block">
                파일 다운로드
              </a>
            )
          )}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => nav(`/posts/${id}/edit`)}>
              수정
            </Button>
            <Button variant="danger" className="ms-2" onClick={onDelete}>
              삭제
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* 댓글 목록 및 입력창 */}
      <div className="mt-4">
        <h5>댓글</h5>
        <form onSubmit={handleCommentSubmit} className="mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            disabled={commentLoading}
            maxLength={500}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={commentLoading || !commentInput.trim()}>
            {commentLoading ? "등록 중..." : "등록"}
          </button>
        </form>
        <ul className="list-group">
          {comments.length === 0 && <li className="list-group-item text-muted">아직 댓글이 없습니다.</li>}
          {comments.map(c => (
            <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{c.content}</span>
              <span className="text-muted small">{new Date(c.created).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
