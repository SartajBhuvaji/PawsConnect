import styled from "styled-components";
import { connect } from "react-redux";
import PostJobs from "../postJobs/PostJobs";
import {useState} from "react";
import { useEffect } from "react";
import { getJobsAPI } from "../../actions";

const Jobs = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

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
    {props.jobs.length === 0 ? (
  <p>There are no jobs</p>
) : (
<Container>
      <Sharebox>
      <div>
      {
      props.user && props.user.photoURL ? (  
        <img src={props.user.photoURL} alt="" border-radius="50%"/>
        ) : (
          <img src="/images/user.svg" alt="" style={{borderRadius: "20%"}} />
    )
    }
    <button onClick={handleClick} disabled={props.loading? true: false}>Post a job</button>
    </div>

    </Sharebox>
    <Content>
    {props.loading && <img src="/images/spin-loader.svg" alt="" />}
    {props.jobs?.length > 0 &&
      props.jobs?.map((job, key) => (
        <Article key={key}>
          <SharedActor>
            <a>
              <img src={job.actor?.image} alt="" style={{ borderRadius: "50%" }} />
              <div>
                <span>{props.user?.displayName}</span>
                <span>{props.user?.email}</span>
                <span>{job.actor?.date.toDate().toLocaleDateString()}</span>
              </div>
            </a>
          </SharedActor>
          <Description>
            <a>
              {/* {console.log("dasdaydhasildu ", job)} */}
              <CompanyName>
                <span>{job.job_post?.company_name}</span>
              </CompanyName>
              <JobTitle>
                <span>{job.job_post?.job_title}</span>
              </JobTitle>
              <JobDescription>
                <span>{job.job_post?.job_description}</span>
              </JobDescription>
              <JobPay>
                <span>{job.job_post?.job_pay}</span>
              </JobPay>
              <JobApplyButton onClick={() => window.location.href = `mailto:${props.user?.email}`}>
                <span>Apply</span>
              </JobApplyButton>

            </a>
          </Description>
        </Article>
      ))}
  </Content>
      <PostJobs showModal={showModal} handleClick= {handleClick}/>   
    </Container>
    )}
    </>
    )
};

const JobApplyButton = styled.button`
  margin-top: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 14px;
  font-weight: 200;
  text-align: left;
  background-color: #0a66c2;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  span {
    color: white;
  }
`;


const CompanyName = styled.div`
  margin: 0 16px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 14px;
  font-weight: 700;
  text-align: left;
`;


const JobTitle = styled.div`
  margin: 0 16px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 20px;
  font-weight: 700;
  text-align: left;
`;

const JobDescription = styled.div`
  margin: 0 16px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 14px;
  text-align: left;
`;


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
  background: white;
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

const JobPay = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  //border-bottom: 1px solid #e9e5df;
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
    jobs: state.articleState.jobs, // Map jobs from state
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getJobsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
