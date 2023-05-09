import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home></Home>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
