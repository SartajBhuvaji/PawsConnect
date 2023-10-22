import logo from './logo.svg';
import './App.css';

import Header from './components/header';
import Home from './components/home';
import Login from "./components/login";
import Profile from "./components/profile";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    props.getUSerAuth();
  },[]);

  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<Login />}>
          </Route>

          <Route path="/home" element={
          <><Header />
            <Home />
            </>}>
          </Route>

          <Route path="/profile" element={
            <><Header />
            <Profile />
            </>}>"      
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUSerAuth: () => dispatch(getUserAuth()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

