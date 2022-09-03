import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/login/Login';

function App() {
  return (
   <div>
      <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
   </div>
  );
}

export default App;
