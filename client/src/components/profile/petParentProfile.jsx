import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const PetParentProfile = (props) => {
  const [formData, setFormData] = useState({
    pets_name: '',
    pets_breed: '',
    pets_age: '',
    account_type: 'pet_parent',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('formData', formData);
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
          <Title>Pet Parent {props.user ? props.user.displayName : ''}, lets complete your account.</Title>
        </div>
      </TitleBox>

      <CommonCard>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pet's Name</label>
            <Input
              type="text"
              name="pets_name"
              placeholder="Enter your Pet's Name"
              value={formData.pets_name}
              onChange={(e) => {setFormData({...formData,pets_name: e.target.value});}}
              required
            />
          </div>
          <div>
            <label>Pet's Breed</label>
            <Input
              type="text"
              name="pets_breed"
              placeholder="Enter your Pet's Breed"
              value={formData.pets_breed}
              onChange={(e) => {setFormData({...formData,pets_breed: e.target.value});}}
              required
            />
          </div>
          <div>
            <label>Pet's Age</label>
            <Input
              type="text"
              name="pets_age"
              placeholder="Enter your Pet's age"
              value={formData.pets_age}
              onChange={(e) => {setFormData({...formData,pets_age: e.target.value});}}
              required
            />
          </div>
          <SubmitButton type="submit" onSubmit={handleSubmit}>Create Account!</SubmitButton>
        </form>
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
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
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


const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 5px;

  :focus {
    outline: none;
    border: 1px solid #70b5f9;
  }
`;


const SubmitButton = styled.button`
  background-color: #70b5f9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;

  :hover {
    background-color: #5a9ee6;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetParentProfile);
