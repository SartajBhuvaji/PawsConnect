import {auth, provider, storage} from '../firebase';

export function signInAPI(){
    console.log("signInAPI");
    return (dispatch) =>{
        auth
        .signInWithPopup(provider)
        .then((payload) =>{
        console.log(payload);
        })
        .catch((error) => alert(error.message));
    };
}
