import React, { useState } from 'react';
import { Form, Button }    from 'react-bootstrap';
import { useNavigate }      from 'react-router-dom';
import { createPost }       from '../api';

export default function WritePage() {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const [file, setFile]       = useState(null);
  const nav                    = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    if (file) fd.append('attachment', file);
    const newPost = await createPost(fd);
    nav(`/posts/${newPost.id}`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="postTitle">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
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
          placeholder="내용을 입력하세요"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="postFile">
        <Form.Label>첨부 파일</Form.Label>
        <Form.Control
          type="file"
          onChange={e => setFile(e.target.files[0] || null)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        저장
      </Button>
    </Form>
  );
}
