import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
    getAuth 
} from "firebase/auth";
import app from "../../../firebase/config";
import { authSlice } from "./authReducer";

const auth = getAuth(app);

export const authSignUpUser = ( {email, password, nickname} ) => async (
    dispatch,
    getState
) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: nickname })
            .then(() => {
                console.log('Updated!');
            });
        const user = auth.currentUser;
        console.log(user);
        if (user) {
            dispatch(authSlice.actions.updateUserProfile({
                id: user.uid,
                nickname: user.displayName
            }));
        }
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     console.log(user);
        // });
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
 };

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
        await signOut(auth).then(() => {
            dispatch(authSlice.actions.updateUserProfile({
                userId: null,
                nickname: null
            }));
            dispatch(authSlice.actions.authStateChange({stateChange: false}))
        })
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
 };

export const authStateChangeUser = () => async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(authSlice.actions.updateUserProfile({
                userId: user.uid,
                nickname: user.displayName
            }));
            dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        }
    });
};
