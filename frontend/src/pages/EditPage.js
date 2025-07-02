import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from '../api';

export default function EditPage() {
  const { id } = useParams();
  const nav    = useNavigate();

  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 1) 기존 데이터 불러오기
  useEffect(() => {
    fetchPost(id)
      .then(post => {
        setTitle(post.title);
        setContent(post.content);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async e => {
    e.preventDefault();
    await updatePost(id, { title, content });
    nav(`/posts/${id}`);
  };

  if (loading) return <div>로딩 중…</div>;

  return (
    <form onSubmit={onSubmit}>
      <h2>글 수정</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="제목"
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="내용"
        required
      />
      <button type="submit">저장</button>
      <button type="button" onClick={() => nav(-1)} style={{ marginLeft: '0.5rem' }}>
        취소
      </button>
    </form>
  );
}