import {auth, provider, storage} from '../firebase';
import db from '../firebase';
import { SET_USER, SET_LOADING_STATUS } from './actionType';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const setUser = (payload) =>({
    type: SET_USER,
    user: payload,
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
        }
    };
}