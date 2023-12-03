import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountChoice from './accountChoice';

const Profile = (props) => {
    return( 
            <Container>
                {
                    !props.user && <Navigate to="/" />
                }
                <Section>                  
                </Section>
                <Layout>
                    <AccountChoice />
                </Layout>
                <SubmitButton type="submit" onClick={() => window.location.href = '/home'}>Back</SubmitButton>
            </Container>
    )
}

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
`

const Section = styled.section`
    padding: 16px 0;
     p {
         font-size: 14px;
         color: #434649;
         font-weight: 600;
     }
`;

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px 0;
         
`;


const SubmitButton = styled.button`
  background-color: #0a66c2;
  color: white;
  border: none;
  margin-right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
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
    };
};

export default connect(mapStateToProps)(Profile);