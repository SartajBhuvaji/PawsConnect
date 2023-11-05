import {auth, provider, storage} from '../firebase';
import db from '../firebase';
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES, SET_PROFILE } from './actionType';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const setUser = (payload) =>({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) =>({
    type: SET_LOADING_STATUS,
    status: status,
});

export const getArticles = (payload) =>({
    type: GET_ARTICLES,
    payload: payload,
});

export const setProfile = (data) => ({
  type: SET_PROFILE,
  data,
});

export function signInAPI(){
    console.log("signInAPI");
    return (dispatch) =>{
        auth
        .signInWithPopup(provider)
        .then((payload) =>{
        dispatch(setUser(payload));        

        })
        .catch((error) => alert("Sign in Failed!"));
    };
}
export function getUserAuth(){
    return (dispatch) =>{
        auth.onAuthStateChanged(async (user) =>{
            if(user){
                dispatch(setUser(user));
            }
        });
    };
}
export function signOutAPI(){
    return (dispatch) =>{
        auth
        .signOut()
        .then(() =>{
            dispatch(setUser(null));
        })
        .catch((error) => alert(error.message));
    };
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image !== '') {
            const storageRef = ref(storage, 'user-posts/' + payload.image.name); // Get a reference to the storage path

            uploadBytes(storageRef, payload.image).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);

                db.collection('articles').add({
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL,
                    },
                    video: {
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                    },
                });
                dispatch(setLoading(false));
            }).catch(error => console.log(error.code));
        }
        else if (payload.video) {
            
            db.collection('articles').add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: {
                    video: payload.video,
                    sharedImg: '',
                    comments: 0,
                    description: payload.description,
                },
            });
            dispatch(setLoading(false));
        }
        else { //just text
            db.collection('articles').add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: {
                    video: '',
                    sharedImg: '',
                    comments: 0,
                    description: payload.description,
                },
            });
            dispatch(setLoading(false));
        }
    };
}

export function postProfileAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if(payload.account_type == 'pet_parent'){
            db.collection('profile').add({
                actor: {
                    description: payload.user_email,
                    title: payload.user_name,
                    photo: payload.user_photo,
                    date: payload.date,
                },
                profile: {
                    account_type: 'pet_parent',
                    pet_name: payload.pets_name,
                    pet_breed: payload.pets_breed,
                    pet_age: payload.pets_age,
                },
            });
            dispatch(setLoading(false));
        }
        else if(payload.account_type == 'pet_professional'){
            db.collection('profile').add({
                actor: {
                    description: payload.user_email,
                    title: payload.user_name,
                    photo: payload.user_photo,
                    date: payload.date,
                },
                profile: {
                    account_type: 'pet_professional',
                    business_name: payload.business_name,
                    business_type: payload.business_type,
                    rating: payload.rating,
                },
            });
            dispatch(setLoading(false));
        }
    }
}

export function postJobsAPI(payload) {
    console.log("In postJobsAPI");
    return (dispatch) => {
        dispatch(setLoading(true));
            db.collection('jobs').add({
            actor: {
                description: payload.user_email,
                user_name: payload.user_name,
                date: payload.date,
                image: payload.user_photo,
            },
            job_post: {
                company_name: payload.company_name,
                job_title: payload.job_title,
                job_description: payload.job_description,
                job_pay: payload.job_pay,
                    },
                });
            dispatch(setLoading(false));    
    };
}


export function getArticlesAPI() {
    return (dispatch) => {
        let payload;

        db.collection('articles').orderBy('actor.date', 'desc').onSnapshot((snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            console.log(payload);
            dispatch(getArticles(payload));
        });
    };
}

export function getJobsAPI() {
    return (dispatch) => {
        let payload;

        db.collection('jobs').orderBy('actor.date', 'desc').onSnapshot((snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            console.log(payload);
            dispatch(getArticles(payload));
        });
    };
}


//Need to make changes here
export function getProfileAPI(user_email) {
    console.log("In getProfileAPI",user_email);
    return (dispatch) => {
      try {
        db.collection('profile')
          .where('actor.description', '==', "")
          .onSnapshot((snapshot) => {
            const payload = snapshot.docs.map((doc) => doc.data());

            console.log(payload);
            dispatch(getArticles(payload));
          });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Handle error or dispatch an error action if needed
      }
    };
  }
