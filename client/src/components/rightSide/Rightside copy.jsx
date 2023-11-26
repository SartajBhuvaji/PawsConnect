import styled from "styled-components";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getJobsAPI } from "../../actions";

const Rightside = (props) => {

  useEffect(() => {
    props.getArticles();
    // console.log("jere");
    // console.log("stuff",props);
  }, []);

  return (
    <Container>
      <FollowCard>
        <Widget>
          <a>
            <div>
              <span>Latest Jobs</span>
            </div>
          </a>
        </Widget>
        <FeedList>
       <li>1st job from array</li>
       <li>2nd job from array</li>
       <li>3rd job from array</li>
        </FeedList>
      </FollowCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
  padding-right: 12px;

`;



const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
 
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #0a66c2;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 24px;
        font-weight: bold;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const FeedList = styled.ul`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  svg {
    color: rgba(0, 0, 0, 1);
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
  getArticles: () => dispatch(getJobsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rightside);
