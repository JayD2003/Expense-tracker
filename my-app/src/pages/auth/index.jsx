import {auth, provider} from '../../config/firebase-config';
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from  'react-router-dom';

export const Auth = () =>{
    const navigate = useNavigate();

    const SignInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        console.log(results);
        const authInfo = {
            userID: results.user.uid,
            name : results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth" , JSON.stringify(authInfo));
        navigate("/expenseTracker");
    }

    return <div className="login-page">
        <p>Sign in with Google to Continue</p>
        <button className="login-with-google" onClick={SignInWithGoogle}>Sign in with Google</button>
    </div>
}