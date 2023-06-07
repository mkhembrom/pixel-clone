import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage';
import Layout from './pages/layout';
import SearchResultPage from './pages/searchResultPage';
import Me from './pages/me';
import LoginPage from './pages/loginPage';

const App = () => {

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/detail' element={<SearchResultPage />} />
          <Route path='/me' element={<Me />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
