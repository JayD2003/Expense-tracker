import {auth, provider} from '../../config/firebase-config';
import {signInWithPopup} from "firebase/auth";
import {useNavigate, Navigate} from  'react-router-dom';
import './styles.css';
import {useGetUserInfo} from './../../hooks/useGetUserInfo';

export const Auth = () =>{
    //used for navigating the website
    const navigate = useNavigate();

    //retreiving isAuth from local storage if user is already logged in
    const {isAuth} = useGetUserInfo();

    //to sign in using google
    const SignInWithGoogle = async () => {
        
        //initializing popup sign form using google 
        //used await to wait until form is submitted
        const results = await signInWithPopup(auth, provider);
        console.log(results);

        //collecting the information
        const authInfo = {
            userID: results.user.uid,
            name : results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }

        //storing the info in local storage for future purposes
        localStorage.setItem("auth" , JSON.stringify(authInfo));

        //navigating tp the expense tracker page
        navigate("/expenseTracker");
    }

    //used for checking whether the user already logged in or not
    if (isAuth){
       return <Navigate to="/expenseTracker" />
    }
    
    //auth page for sigining into the account
    return <div className="login-page">
        <p>Sign in with Google to Continue</p>
        <button className="login-with-google-btn" onClick={SignInWithGoogle}>Sign in with Google</button>
    </div>
}