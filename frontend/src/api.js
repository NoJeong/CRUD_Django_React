export const API_BASE = 'http://localhost:8000/api';


export async function fetchPosts({ page = 1, search = '', ordering = '-created' } = {}) {
  // URLSearchParams를 쓰면 자동으로 인코딩도 해 줌
  const params = new URLSearchParams();
  params.append('page', page);
  if (search) params.append('search', search);
  if (ordering) params.append('ordering', ordering);

  const res = await fetch(`${API_BASE}/posts/?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`게시글 목록 조회 실패: ${res.status}`);
  }
  return res.json();
}

export async function fetchPost(id) {
  const r = await fetch(`${API_BASE}/posts/${id}/`);
  return r.json();
}

export async function createPost(data) {
  const r = await fetch(`${API_BASE}/posts/`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function deletePost(id) {
// /posts/ 경로를 꼭 포함해야 Django ViewSet이 잡아줍니다
const res = await fetch(`${API_BASE}/posts/${id}/`, {
    method: 'DELETE',
});
if (!res.ok) {
    throw new Error(`삭제 실패: ${res.status}`);
}
}

export async function updatePost(id, data) {
  const res = await fetch(`${API_BASE}/posts/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`업데이트 실패: ${res.status}`);
  return res.json();
}