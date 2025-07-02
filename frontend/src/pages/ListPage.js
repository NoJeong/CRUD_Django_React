import { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

export default function ListPage() {
  const [posts, setPosts]       = useState([]);
  const [count, setCount]       = useState(0);
  const [page, setPage]         = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // 입력용
  const [search, setSearch]         = useState(''); // 실제 요청용
  const [ordering, setOrdering]     = useState('-created');

  useEffect(() => {
    console.log('fetchPosts 호출', { page, search, ordering });
    fetchPosts({ page, search, ordering })
      .then(data => {
        setPosts(data.results);
        setCount(data.count);
      });
  }, [page, search, ordering]);  // ← page가 반드시 들어가 있어야 함

  const totalPages = Math.ceil(count / 5);

  const handleSearch = () => {
    setPage(1);            // 검색할 때 1페이지로 돌아가기
    setSearch(searchTerm); // 실제 요청용 search 상태 업데이트
  };

  return (
    <div>
      <h2>게시판 목록</h2>

      {/* 검색창 + 검색 버튼 */}
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="제목 또는 내용 검색"
        style={{ marginRight: '0.5rem' }}
      />
      <button onClick={handleSearch}>검색</button>

      {/* 정렬 선택 */}
      <select
        value={ordering}
        onChange={e => {
          setOrdering(e.target.value);
          setPage(1);
        }}
        style={{ margin: '0 0.5rem' }}
      >
        <option value="-created">최신순</option>
        <option value="created">오래된순</option>
        <option value="title">제목순 A→Z</option>
        <option value="-title">제목순 Z→A</option>
      </select>

      {/* 목록 */}
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      {/* 페이지 네비게이션 */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page <= 1}
        >
          이전
        </button>
        <span style={{ margin: '0 0.5rem' }}>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}