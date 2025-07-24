import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import WritePage from './pages/WritePage';
import EditPage   from './pages/EditPage';


function App(){
  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">ToyProject</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">목록</Nav.Link>
            <Nav.Link as={Link} to="/write">글쓰기</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/"      element={<ListPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/posts/:id"       element={<DetailPage />} />
          <Route path="/posts/:id/edit"  element={<EditPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
export default App;
