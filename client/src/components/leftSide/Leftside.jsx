import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileAPI } from "../../actions";

const Leftside = (props) => {
  // Use state to manage the profile data
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await props.getProfile(props.user?.email);
        console.log("Data that I received", data);

        // Update the component state with the received data
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [props.user?.email]);

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo />
            <Link>Welcome, {props.user ? props.user.displayName : ''}</Link>

            {profileData && (
              <div>
              {/* <p>Username: {profileData[0].actor.title}</p> */}
              {profileData && (
                <AccountType>
                  A wonderful {profileData[0].profile.account_type === "pet_professional" ? "Pet Professional" : "Pet Parent"}
                </AccountType>
              )}
              {/* <AccountType>A wonderful {profileData[0].profile.account_type}</AccountType> */}
            </div>
            )}
          </a>
        </UserInfo>

        {profileData && (
        <div>
          {/* A wonderful {profileData[0].profile.account_type} */}
          {profileData[0].profile.account_type === "pet_parent" && (
            <>
              <Widget>
                <a>
                  <div>
                    {/* {To be replaced by account details} */}
                    <span>Pet's Name</span>
                    <span>Moon Moon</span>
                  </div>
                  {/* <img src="/images/widget-icon.svg" alt="" /> */}
                  <img src="/images/dog-widget-icon.svg" alt="" width="28" height="28" />
                </a>
              </Widget>
              <Widget>
                <a>
                  <div>
                    <span>Pet's Breed</span>
                    <span>Siberian Husky</span>
                  </div>
                  <img src="/images/dog-widget-icon2.svg" alt="" width="40" height="40" />
                </a>
              </Widget>
            </>
          )}
        </div>
      )}

      {profileData && profileData[0].profile.account_type === "pet_professional" && (
        <div>
          <Widget>
            <a>
              <div>
                <span>Business Name</span>
                <span>{profileData[0].profile.business_name}</span>
              </div>
              <img src="/images/dog-widget-icon.svg" alt="" width="28" height="28" />
            </a>
          </Widget>
          <Widget>
            <a>
              <div>
                <span>Business Type</span>
                <span>{profileData[0].profile.business_type}</span>
              </div>
              <img src="/images/dog-widget-icon2.svg" alt="" width="40" height="40" />
            </a>
          </Widget>
        </div>
      )}
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            Premium Activated
          </span>
        </Item>
      </ArtCard>
    </Container>
  );
};

// ... rest of your styled components
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: (email) => dispatch(getProfileAPI(email)),
});


const Container = styled.div`
  grid-area: leftside;
  padding-left: 12px;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  background-image: url("/images/photo.svg");
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AccountType = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
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

const Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Leftside);
