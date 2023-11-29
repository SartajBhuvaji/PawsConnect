import React from 'react';
import styled from 'styled-components';

import Jobs from "./Main";
import { connect } from 'react-redux';
import Leftside from "../leftSide/Leftside";


const Home = () => {
    return( 
            <Container>
                <Section>                                                    
                </Section>
                <Layout>
                    <Leftside />
                    <Jobs />
                </Layout>
            </Container>
    )
}

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
`

const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
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
        user: state.userState.user,
    };
};

export default connect(mapStateToProps)(Home);