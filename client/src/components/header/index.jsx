import styled from 'styled-components';
import React from "react"
import { connect } from "react-redux";
import { signOutAPI } from "../../actions";
import { NavLink } from "react-router-dom";

const Header =(props) =>{
    return(
       <Container>
           <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/linkedin.svg" alt="home-logo" height={90} width={90} />
                    </a>
                </Logo>
                <Description>
                PawsConnect: A LinkedIn for Dogs
                </Description>
                
                <Nav>
                    <NavListWrap>
                    <NavList>
                        <NavLink to="/home" exact activeClassName="active" className="button-link">
                            <img src="/images/nav-home.svg" alt="nav-home" />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to="/profile" exact activeClassName="active" className="button-link">
                            <img src="/images/profile-icon.svg" alt="nav-home" width={25} height={25}/>
                            <span>Profile</span>
                        </NavLink>
                        <NavLink to="/jobs" exact activeClassName="active" className="button-link">
                            <img src="/images/nav-jobs.svg" alt="nav-jobs" />
                            <span>Jobs</span>
                        </NavLink>
                    </NavList>
                        <User>
                        <a>
                            {
                                props.user && props.user.photoURL ? (
                                    <img src={props.user.photoURL} alt="user" />
                                ):(
                                    <img src="/images/user.svg" alt="user" />
                                )
                            }
                                <span>
                                <img src="/images/down-icon.svg" alt="down-icon" />
                                </span>
                            </a>
                            <SignOut onClick={()=> props.signOut()}>
                            <img src="/images/signout-icon.svg" alt="sign-out" width="28" height="28"/>    
                            </SignOut>
                        </User>
                    </NavListWrap>
                </Nav>
                
            </Content>
       </Container>
    );
};

const Container  = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    left: 0;
    padding: 0 24px;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;
`;


const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;
`;

const Logo = styled.span`
    margin-right: 8px;
    font-size: 0px;
`;



const Nav = styled.nav`
    margin-left: auto;
    display: block;
    @media(max-width: 768px){
        position: fixed;
        left: 0;
        bottom: 0;
        background: white;
        width: 100%;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;
    .active{
        span:after{
            content: "";
            transform: scaleX(1);
            border-bottom: 2px solid var(--white, #fff);
            bottom: 0;
            left: 0;
            position: absolute;
            transition: transform 0.2s ease-in-out;
            width: 100%;
            border-color: rgba(0,0,0,0.9);
        }
    }
`;

const NavList = styled.li`
    display: flex;
    align-items: center;
    a{
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 52px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
        span{
            color: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
        }
        @media(max-width: 768px){
            min-width: 70px;
        }
    }
    &:hover, &:active{
        a{
            span{
                color: rgba(0,0,0,0.9);
            }
        }
    }
`;

const SignOut = styled.div`
    position: absolute;
    top: 45px;
    background: white;
    border-radius: 0 0 5px 5px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    transition-duration: 167ms;
    text-align: center;
    display: none;
`;

const User = styled(NavList)`
    a > svg{
        width: 24px;
        border-radius: 50%;
    }
    a > img{
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    span{
        display: flex;
        align-items: center;
    }
    &:hover{
        ${SignOut}{
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`;
const Description = styled.div`
    font-size: 22px;
    color: rgba(0,0,0,0.6);
    margin: 0 24px;
    line-height: 1.5;
    overflow: hidden;
    text-align: center;
`;

const Work = styled(User)`
    border-left: 1px solid rgba(0,0,0,0.08);
`;

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOutAPI()),    
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);