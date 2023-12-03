import styled from "styled-components";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getJobsAPI } from "../../actions";

const Rightside = (props) => {
  useEffect(() => {
    props.getJobs();
  }, [props] );

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
        {props.jobs?.slice(0, 3).map((job, index) => (
            <li key={index}>
              <WidgetTabs>
                {job.job_post?.company_name}
                <br></br>
                {job.job_post?.job_title}
              </WidgetTabs>
            </li>
          ))}
        </FeedList>
      </FollowCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
  padding-right: 100px;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #f7f7f7;
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

const WidgetTabs = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  // padding-top: 12px;
  padding-bottom: 12px;
  background-color: #f7f7f7;
  align-items: left;
`;

const FeedList = styled.ul`
  margin-top: 5px;
  text-align: left;
  margin-left: -20px;
  background-color: #f7f7f7;

  li {
    display: flex;
    align-items: center;
    margin: 5px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
    jobs: state.articleState.jobs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getJobs: () => dispatch(getJobsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rightside);
