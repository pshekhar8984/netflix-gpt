import { useState ,useRef} from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

    const toggleSignInForm = () => {
     setIsSignInForm(!isSignInForm)
    }
    
    const handleButtonClick = () => {
        //validate the Data

     const message = checkValidData(email.current.value, password.current.value)
     setErrorMessage(message)
     if(message) return;

     if(!isSignInForm){
      //Sign Up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/61722269?v=4"
    }).then(() => {
      const {uid,email,displayName , photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
      // Profile updated!
      navigate("/browse")
    }).catch((error) => {
      setErrorMessage(errorMessage)
    });
     })
  .catch((error) => {
    const errorMessage = error.message;
    setErrorMessage(errorMessage)
  });

     }else{
      //Sign In logic
      signInWithEmailAndPassword(auth, email.current.value , password.current.value)
      .then((userCredential) => {
       const user = userCredential.user;
       navigate("/browse")
       console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorMessage)
  });
  }
    }

    return (
    <div>
        <Header/>
      <div className="absolute">
         <img  src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg"
          alt="logo" />
      </div>
        <form 
         onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto 
        right-0 left-0 text-white rounded-lg bg-opacity-85">
        <h1 className="font-bold text-3xl py-4 ">
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && ( <input type="text" ref={name} placeholder="Full Name"
         className="p-2 my-4 w-full bg-gray-700" />) }
        <input ref={email} type="text" placeholder="Email Address"
         className="p-2 my-4 w-full bg-gray-700" />
        <input ref={password} type="password" placeholder="Password"
         className="p-2 my-4 w-full bg-gray-700" />
         <p className="text-red-500">{errorMessage}</p>
        <button className="p-4  cursor-pointer my-6 bg-red-700 w-full rounded-lg"
         onClick={handleButtonClick} >
            {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4" onClick={toggleSignInForm}> 
        {isSignInForm ? "New to Netflix? Sign up now" : "Already a user, Sign In now"}</p>
        </form>
    </div>)
}
export default Login