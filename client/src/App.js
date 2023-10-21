import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
