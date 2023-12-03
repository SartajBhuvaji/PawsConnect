import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { postProfileAPI } from '../../actions';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';

const PetProfessioalProfile = (props) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_email: props?.user?.email || '',
    user_name: props?.user?.displayName || '',
    user_photo: props?.user?.photoURL || '',
    date: firebase.firestore.Timestamp.now(),
    business_name: '',
    business_type: '',
    account_type: 'pet_professional',
    rating: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.postProfileAPI(formData);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000); 
    } catch (error) {
      console.error('Error:', error);
    }
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
          <Title>
            Pet Professional {props.user ? props.user.displayName : ''}, let's complete your account.
          </Title>
        </div>
      </TitleBox>

      <CommonCard>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Business Name</label>
            <Input
              type="text"
              name="business_name"
              placeholder="Enter the name of your business"
              value={formData.business_name}
              onChange={(e) => {
                setFormData({ ...formData, business_name: e.target.value });
              }}
              required
            />
          </div>
          <div style={{ paddingTop: '20px' }}>
            <label>Business Type</label>
            <Input
              type="text"
              name="business_type"
              placeholder="Photographer, Groomer, Trainer, etc."
              value={formData.business_type}
              onChange={(e) => {
                setFormData({ ...formData, business_type: e.target.value });
              }}
              required
            />
          </div>
          <SubmitButton type="submit">Update Profile</SubmitButton>
          <SubmitButton type="button" onClick={() => navigate('/profile')}>
            Back
          </SubmitButton>
          {submitted && <p>Profile Updated</p>}
        </form>
      </CommonCard>
    </Container>
  );
};


const Container = styled.div`
  grid-area: main;
  text-align: left;
  margin-left: 20%;
  margin-top: 20px;
  width: 60%;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const CommonCard = styled.div`
  text-align: left;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 80px;
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
  margin-top: 125px;
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
  background-color: #0a66c2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 20px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;

  &:hover {
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
  postProfileAPI: (formData) => dispatch(postProfileAPI(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetProfessioalProfile);
