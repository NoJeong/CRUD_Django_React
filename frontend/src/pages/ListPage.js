// frontend/src/pages/ListPage.js
import { useEffect, useState } from 'react';
import { fetchPosts }           from '../api';
import { Link }                 from 'react-router-dom';
import { Form, Button, ListGroup, Row, Col, InputGroup, Pagination } from 'react-bootstrap';

export default function ListPage() {
  const [posts, setPosts]       = useState([]);
  const [count, setCount]       = useState(0);
  const [page, setPage]         = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch]         = useState('');
  const [ordering, setOrdering]     = useState('-created');

  useEffect(() => {
    fetchPosts({ page, search, ordering }).then(data => {
      setPosts(data.results);
      setCount(data.count);
    });
  }, [page, search, ordering]);

  const totalPages = Math.ceil(count / 5);
  const handleSearch = () => { setPage(1); setSearch(searchTerm); };

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>검색</Button>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={ordering}
            onChange={e => { setOrdering(e.target.value); setPage(1); }}
          >
            <option value="-created">최신순</option>
            <option value="created">오래된순</option>
            <option value="title">제목순 A→Z</option>
            <option value="-title">제목순 Z→A</option>
          </Form.Select>
        </Col>
      </Row>

      <ListGroup>
        {posts.map(p => (
          <ListGroup.Item key={p.id}>
            <Link to={`/posts/${p.id}`} className="fw-bold text-decoration-none">{p.title}
              {p.attachment && (
                <span title="첨부파일 있음" style={{ marginLeft: 6 }}>
                  {/\.(jpe?g|png|gif|bmp)$/i.test(p.attachment) ? "🖼️" : "📎"}
                </span>
              )}
              {p.comments_count > 0 && (
                <span title="댓글 수" style={{ marginLeft: 6, color: '#007bff' }}>
                  💬 {p.comments_count}
                </span>
              )}
            </Link>
            <small className="text-muted float-end">
              {new Date(p.created).toLocaleString()}
            </small>
            <div className="mt-1 text-truncate">{p.content}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => setPage(prev => prev - 1)}
          disabled={page <= 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i+1}
            active={page === i+1}
            onClick={() => setPage(i+1)}
          >{i+1}</Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setPage(prev => prev + 1)}
          disabled={page >= totalPages}
        />
      </Pagination>
    </>
  );
}
