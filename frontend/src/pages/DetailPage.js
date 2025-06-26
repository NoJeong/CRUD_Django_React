import { useEffect, useState } from 'react';
import { fetchPost, deletePost } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function DetailPage(){
  const {id} = useParams();
  const [post,setPost] = useState(null);
  const nav = useNavigate();
  useEffect(()=>{ fetchPost(id).then(setPost); },[id]);
  if(!post) return <div>로딩중…</div>;
   // 삭제 핸들러
  const onDelete = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    if (!ok) return;
    await deletePost(id);
    nav('/');  // 목록 페이지로 이동
  };

  return <div>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
    <small>{new Date(post.created).toLocaleString()}</small>
    <button onClick={onDelete} style={{marginTop: '1rem'}}>
    삭제
    </button>
  </div>;
}
