import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Logout from './components/pages/Logout/Logout';
import AdAdd from './components/pages/AdAdd/AdAdd';
import Ad from './components/pages/Ad/Ad';
import AdRemove from './components/pages/AdDelete/AdDelete';
import AdEdit from './components/pages/AdEdit/AdEdit';
import AdConfirmation from './components/common/AdConfirmation/AdConfirmation';
import NotFound from './components/pages/NotFound/NotFound';
import Search from './components/pages/Search/Search';
import { useDispatch } from 'react-redux';
import { loadAdsRequest } from "./redux/adsRedux";
import { checkUser } from './redux/users.Redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
    dispatch(checkUser());

    const interval = setInterval(() => {
      dispatch(loadAdsRequest());
    }, 120000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/ads/add' element={<AdAdd />} />
        <Route path='/ads/confirmation/:type' element={<AdConfirmation/>} />
        <Route path='/ads/:id' element={<Ad />} />
        <Route path="/ads/:id/delete" element={<AdRemove />} />
        <Route path="/ads/:id/edit" element={<AdEdit />} />
        <Route path="/ads/search/:phrase" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
