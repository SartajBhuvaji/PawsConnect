import styled from "styled-components";
import {useState} from 'react';
import { connect } from "react-redux";
import firebase from 'firebase/compat/app';
import { postJobsAPI } from "../../actions";

const PostJobs = (props) => {
    const [jobTitle, setjobTitle] = useState("");
    const [jobDescription, setjobDescription] = useState("");
    const [jobPay, setjobPay] = useState("");

    // const [formData, setFormData] = useState({
    //     job_title: '',
    //     job_description: '',
    //     job_pay: '',

    //     user_email : props.user.email,
    //     user_name: props.user.displayName,
    //     user_photo: props.user.photoURL,
    //     date: firebase.firestore.Timestamp.now(),
    //   });

    // const switchAssetArea = (area) => {
    //     setjobTitle("");
    //     setjobDescription("");
    //     setjobPay("");
    // };


    const postJob = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        const payload = {
            job_title: jobTitle,
            job_description: jobDescription,
            job_pay: jobPay,

            user_email : props.user.email,
            user_name: props.user.displayName,
            user_photo: props.user.photoURL,
            date: firebase.firestore.Timestamp.now(),
            };
        props.postJobsAPI(payload);
        reset(e);
};

const reset = (e) => {
    setjobTitle("");
    setjobDescription("");
    setjobPay("");

    props.handleClick(e);
}

return (
    <>
    { props.showModal === "open" &&(
          <Container>
          <Content>
              <Header>
                  <h2> Create a post</h2>
                  <button onClick={(event)=> reset(event)}>
                  <img src="/images/close-icon.svg" alt="share-video" width="28" height="28"/>    
                  </button>
              </Header>
              <SharedContent>
                    <UserInfo>
                        {props.user.photoURL ? (
                        <img src={props.user.photoURL} alt="user" />
                        ) : (<img src="/images/user.svg" alt="user" />)    
                        }
                        <span>{props.user.displayName ? props.user.displayName : "Name"}</span>
                    </UserInfo>
                    <Editor>
                    <textarea value ={jobTitle} 
                    placeholder="Job Title" 
                    autoFocus={true} 
                    onChange={(e)=>setjobTitle(e.target.value)}
                    required
                    
                    >    
                    </textarea>                 
                </Editor>
                <Editor>
                    <textarea value ={jobDescription} 
                    placeholder="Job Description" 
                    autoFocus={true} 
                    onChange={(e)=>setjobDescription(e.target.value)}
                    required>    
                    </textarea>                 
                </Editor>
                <Editor>
                    <textarea value ={jobPay} 
                    placeholder="Pay" 
                    onChange={(e)=>setjobPay(e.target.value)}autoFocus={true} 
                    required
                    >    
                    </textarea>                 
                </Editor>
                <PostButton disabled= {!editorText ? true: false} onClick={(event)=>postJob(event)}>Post</PostButton>
                </SharedContent>
                </Content>
                </Container>

    )}
     </>
    );

                    };


// const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           await props.postJobsAPI(formData);
//           //window.location.href = '/home';
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       };


// const postJob = (e) => {
//         console.log("postJob");
//         e.preventDefault();
//         if (e.target !== e.currentTarget) {
//             return;
//         }
//         const payload = {
//             job_title: props.job_title,
//             job_description: props.job_description,
//             job_pay: props.job_pay,

//             user_email : props.user.email,
//             user_name: props.user.displayName,
//             user_photo: props.user.photoURL,
//             timestamp: firebase.firestore.Timestamp.now(),
//         };
//         props.postJobsAPI(formData);
//         reset(e);
//     };
    
    // const reset  = (e) => {
    //     //  setJobTitle("");
    //     //  setJobDescription("");
    //     //  setJobPay("");

    // })
    //     props.handleClick(e);

    // }

//     return (
//         <>
//         { props.showModal === "open" &&(
//         <Container>
//             <Content>
//                 <Header>
//                     <h2> Post a job</h2>
//                 </Header>
//                 <SharedContent>
//                     <UserInfo>
//                         {props.user.photoURL ? (
//                         <img src={props.user.photoURL} alt="user" />
//                         ) : (<img src="/images/user.svg" alt="user" />)    
//                         }
//                         <span>{props.user.displayName ? props.user.displayName : "Name"}</span>
//                     </UserInfo>
//                 <Editor>
//                     <textarea value ={editorText} 
//                     placeholder="Job Title" 
//                     autoFocus={true} 
//                     onChange={(e) => {setFormData({...formData,job_title: e.target.value});}}
//                     required
                    
//                     >    
//                     </textarea>                 
//                 </Editor>
//                 <Editor>
//                     <textarea value ={editorText} 
//                     placeholder="Job Description" 
//                     autoFocus={true} 
//                     onChange={(e) => {setFormData({...formData,job_description: e.target.value});}}
//                     required>    
//                     </textarea>                 
//                 </Editor>
//                 <Editor>
//                     <textarea value ={editorText} 
//                     placeholder="Pay" 
//                     autoFocus={true} 
//                     onChange={(e) => {setFormData({...formData,job_pay: e.target.value});}}
//                     required
//                     >    
//                     </textarea>                 
//                 </Editor>


//                 </SharedContent>
//                 <ShradedCreation>

//                 <PostButton disabled= {!editorText ? true: false} onClick={(event)=>handleSubmit(event)}>Post</PostButton>
//                 </ShradedCreation>
//             </Content>
//         </Container>
//         )}
//         </>
//         );
// };

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 9999;
    color: black;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
    padding-right: 25px;
`;

const Header = styled.div`
    display: block;
    padding: 0px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        svg, img {
            pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShradedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
    }
`;

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton} {
        svg {
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 25px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(69,179,231,0.8)" : "#0a66c2")};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
    &:hover {
        background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        border-radius: 15px;
        padding-left: 15px;
        padding-top: 15px;
        padding-right: 15px;
    }
    input {
        width: 100%;
        font-size: 16px;
    }
`;  

const editorText = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;
    }
`;  



const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}

const mapDispatchToProps = (dispatch) => ({
    postJobsAPI: (payload) => dispatch(postJobsAPI(payload)),
   // signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostJobs);