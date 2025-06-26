import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';

export default function WritePage(){
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const nav                   = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
   // 1) 새로 생성된 포스트 객체를 리턴받고
   const newPost = await createPost({ title, content });
   // 2) 그 id를 사용해 상세 페이지로 이동
   nav(`/posts/${newPost.id}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>새 글 쓰기</h2>
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
    </form>
  );
}
