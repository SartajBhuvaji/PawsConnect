import {auth, provider, storage} from '../firebase';
import { SET_USER } from './actionType';

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

export function postArticleAPI(payload){
    return (dispatch) =>{
        if (payload.image!= ''){
            const upload = storage.ref('images/${payload.image.name}').put(payload.image);
            upload.on('state_changed', (snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;    
            });
            console.log('Progress: ${progress}%');
        }
    };
}