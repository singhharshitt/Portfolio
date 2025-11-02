import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Preloader from './components/Preloader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/pre' element={<Preloader/>}/>
      </Routes>
    </Router>
  );
}

export default App;
