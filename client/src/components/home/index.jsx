import React from 'react';
import styled from 'styled-components';
import Leftside from "../leftSide/Leftside";
import Main from "./Main";
import Rightside from "../rightSide/Rightside";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';


const Home = (props) => {
    
    return( 
            <Container>
                {
                    !props.user && <Navigate to="/" />
                }
                <Section>                   
                                    
                </Section>
                

                <Layout>
                    <Leftside />
                    <Main />
                    <Rightside />
                </Layout>
            </Container>
    )
}

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
    background-color: #f3f2ef;
`

const Section = styled.section`
    padding: 16px 0;

     p {
         font-size: 14px;
         color: #434649;
         font-weight: 600;
     }
`
const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px 0;
         
`
const mapStateToProps = (state) => {
    return {
        user: state.userState.user || null,
    };
};

export default connect(mapStateToProps)(Home);