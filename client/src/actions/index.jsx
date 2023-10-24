import {auth, provider, storage} from '../firebase';
import db from '../firebase';
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType';
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

export function signInAPI(){
    console.log("signInAPI");
    return (dispatch) =>{
        auth
        .signInWithPopup(provider)
        .then((payload) =>{
        //console.log(payload); // payload.user
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

// import { getStorage, ref, uploadBytes } from "firebase/storage";

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


//Need to make changes here
export function postJobsAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image !== '') {
            const storageRef = ref(storage, 'user-jobs/' + payload.image.name); // Get a reference to the storage path

            uploadBytes(storageRef, payload.image).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);

                db.collection('jobs').add({
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
            db.collection('jobs').add({
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

//Need to make changes here
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