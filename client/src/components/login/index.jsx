import styled from "styled-components";
import {connect} from "react-redux";
// import { signInAPI } from "../../actions";
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";

import firebase from 'firebase/compat/app';
const Login = (props) => {

  useEffect(() => {
    props.checkUser();
  }, []);
  
  return (
    <Container>
      { 
      props.user &&
      <Navigate to='/home' /> }
      <Nav>
        <a href="/">
          <img src="/images/linkedin.svg" alt=""  height={100} width={100}/>
        </a>
      </Nav>
      <Section>
        <Hero>
          <h1>PawsConnect</h1>
          <h2>Welcome to a social media for dogs!</h2>
          <img src="/images/home-background.jpg" alt="" />
        </Hero>
        <Form>
          <Google onClick={()=> props.signIn()}>  
            <img src="/images/google.svg" alt="" />
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
  overflow: hidden;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;



const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  margin-left: -75px;
  h1,h2 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
      }
  }

  img {
    /* z-index: -1; */
    width: 700px;
    height: 900px;
    position: absolute;
    bottom: 100px;
    right: -250px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);

  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const mapStateToProps = (state) => {
  return {
     user: state.userState.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  signIn: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      dispatch({ type: 'LOGIN', user: result.user });
    });
  },
  checkUser: () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'LOGIN', user });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
