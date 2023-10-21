import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route>
            <Route path="/home" element={
            <>
            
            <Header />
            <Home />

            </>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
