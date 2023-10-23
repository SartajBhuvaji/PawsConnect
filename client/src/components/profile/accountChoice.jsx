import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const AccountChoice = (props) => {
  
  const navigate = useNavigate();
  const handleChoice = (choice) => {
        //console.log('choice', choice);
    if (choice === 'Pet Parent') navigate('/profile/pet_parent');
    if (choice === 'Pet Professional')  navigate('/profile/pet_professional');
  };

  return (
    <Container>
        <TitleBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <Title>Welcome {props.user ? props.user.displayName : ''}, tell us about yourself.</Title>
        </div>
      </TitleBox>

      <CommonCard>
        <div>
          <p>Are you a Pet Parent or a Pet Professional?</p>
          <Button onClick={() => handleChoice('Pet Parent')}><p>Pet Parent</p>
          <img src="/images/dog-petparent-icon.svg" alt="" width="40" height="40" />
          </Button>
          <Button onClick={() => handleChoice('Pet Professional')}><p>Pet Professional</p>
          <img src="/images/dog-petprofessional-icon.svg" alt="" width="40" height="40" />
          </Button>
        </div>
      </CommonCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const CommonCard = styled.div`
  text-align: left;
  padding: 20px;
  margin: 20px 0;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TitleBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 20px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 20px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }`;

const Button = styled.button`
  background-color: #70b5f9;
  text-align: center;
  font-size: 14px;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  transition: background-color 0.3s ease; 
  margin-right: 40px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountChoice);
