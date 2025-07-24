import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner }     from 'react-bootstrap';
import { useParams, useNavigate }     from 'react-router-dom';
import { fetchPost, updatePost }      from '../api';

export default function EditPage() {
  const { id } = useParams();
  const nav    = useNavigate();

  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const [file, setFile]       = useState(null);
  const [attachment, setAttachment] = useState(null); // 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPost(id)
      .then(post => {
        setTitle(post.title);
        setContent(post.content);
        setAttachment(post.attachment); // 추가
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    if (file) {
      fd.append('attachment', file);
    } else if (attachment === null) {
      // 첨부파일 삭제 요청
      fd.append('attachment', '');
    }
    await updatePost(id, fd);
    nav(`/posts/${id}`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="postTitle">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="postContent">
        <Form.Label>내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="postFile">
        <Form.Label>첨부 파일 변경</Form.Label>
        <Form.Control
          type="file"
          onChange={e => setFile(e.target.files[0] || null)}
        />
        {/* 기존 첨부파일 표시 */}
        {attachment && (
          <div className="mt-2">
            <span>기존 첨부파일: </span>
            {/\.(jpe?g|png|gif|bmp)$/i.test(attachment) ? (
              <img src={attachment} alt="첨부파일 미리보기" style={{maxWidth: 120, maxHeight: 80}} />
            ) : (
              <a href={`/download/${id}`} download>파일 다운로드</a>
            )}
            <div className="mt-1">
              <a href={`http://localhost:8000/download/${id}`}  className="btn btn-outline-primary btn-sm me-2">다운로드</a>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => setAttachment(null)}
              >
                첨부파일 삭제
              </button>
            </div>
          </div>
        )}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? '저장 중…' : '저장'}
      </Button>
    </Form>
  );
}
