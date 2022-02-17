import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
function App() {

  return (
    <BrowserRouter > 
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/auth" exact element={<Auth/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
