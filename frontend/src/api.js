export const API_BASE = 'http://localhost:8000/api';

export async function fetchPosts() {
  const r = await fetch(`${API_BASE}/posts/`);
  return r.json();
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