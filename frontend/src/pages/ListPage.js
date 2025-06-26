import { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

export default function ListPage(){
  const [posts,setPosts] = useState([]);
  useEffect(()=>{ fetchPosts().then(setPosts); },[]);
  return <ul>
    {posts.map(p=><li key={p.id}>
      <Link to={`/posts/${p.id}`}>{p.title}</Link>
    </li>)}
  </ul>;
}
