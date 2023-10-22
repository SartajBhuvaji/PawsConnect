import styled from "styled-components";

const Rightside = (props) => {
  return (
    <Container>
      
      <FollowCard>
        <Container>
        <Title>
        Latest Jobs
        </Title>
        </Container>

        <FeedList>
       1
       2
       3
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

const Title = styled.div`
  background-color: #f3f2ef;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-size: 28px;
  border-padding: 8px 16px 0px 16px;
  margin-left: 16px;
  width: 95%;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 8px;
  
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

export default Rightside;
