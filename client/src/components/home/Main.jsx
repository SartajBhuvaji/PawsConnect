import styled from "styled-components";
import { connect } from "react-redux";
import PostModal from "../postmodal/PostModal";
import {useState} from "react";
import { useEffect } from "react";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) {
      localStorage.setItem("hasVisited", true);
      window.location.reload();
    } else {
      props.getArticles();
    }
  }, [props]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;    
    }
  };
  return (
    <>
    { 
    props.articles.length === 0 ? 
    <p>There are no articles</p>
    :
    (<Container>

    <Sharebox>
    <div>
      {
      props.user && props.user.photoURL ? (  
        <img src={props.user.photoURL} alt="" />
        ) : (
          <img src="/images/user.svg" alt="" />
        )
      }
    <button onClick={handleClick} disabled={props.loading? true: false}>Start a post</button>
    </div>
    </Sharebox>

    <Content>
      {props.loading && <img src="/images/spin-loader.svg" alt="" />}
      {props.articles?.length > 0 &&
      props.articles.map((article, key) => (  
     
      <Article key = {key}>
        <SharedActor>
          <a>
            <img src={article.actor.image} alt="" />
            <div>
              <span>{article.actor.title}</span>
              <span>{article.actor?.description}</span>
              <span>{article.actor?.date.toDate().toLocaleDateString()}</span>
            </div>
          </a>
          <button>
            <img src="/images/ellipsis.svg" alt="" />
          </button>
        </SharedActor>
        <Description>{article.video?.description}</Description>
 
        {
          (article.video?.sharedImg || article.video?.video) && ( 
            <SharedImg>
              <a>
                { 
                  !article.video?.sharedImg && article.video?.video ? 
                  <ReactPlayer width={'100%'} url={article.video?.video} /> 
                  : article.video?.sharedImg && <img src={article.video?.sharedImg} alt="" />
                }
              </a>
            </SharedImg>
          )
        }

        <SocialCounts>
        </SocialCounts>
        
      </Article> ))}
      </Content>

    <PostModal showModal={showModal} handleClick= {handleClick}/>   
    </Container>
    )}
    </>
    )
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden ;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Sharebox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: #f7f7f7;
   div {
     button {
       outline: none;
       color: rgba(0,0,0,0.6);
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
          border: 1px solid rgba(0,0,0,0.15);
          background-color: white;
          text-align: left;
        }
  }
  &:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 4px;
    button {
      img {
        margin: 0 4px 0 -2px;
      }
      span {
        color: #70b5f9;
      }
    }

`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  padding-bottom: 8px;
  margin-bottom: 10px; /* Adjust the margin as needed */
  border-bottom: #e9e5df solid 1px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0,0,0,1);
        }
        &:nth-child(n+1) {
          font-size: 12px;
          color: rgba(0,0,0,0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  margin-left: 16px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  
  img {
    object-fit: contain;
    width: 98%;
    height: 100%;
    
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
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
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
