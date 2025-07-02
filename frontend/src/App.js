import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import WritePage from './pages/WritePage';
import EditPage   from './pages/EditPage';


function App(){
  return <BrowserRouter>
    <nav>
      <Link to="/">목록</Link> ｜ <Link to="/write">글쓰기</Link>
    </nav>
    <Routes>
      <Route path="/" element={<ListPage/>}/>
      <Route path="/posts/:id" element={<DetailPage/>}/>
      <Route path="/write" element={<WritePage/>}/>
      <Route path="/posts/:id/edit" element={<EditPage />} />
    </Routes>
  </BrowserRouter>;
}
export default App;
