import { useState ,useRef} from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constant";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState();
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
      displayName: name.current.value, photoURL: USER_AVATAR
    }).then(() => {
      const {uid,email,displayName , photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
      // Profile updated!
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
         <img  src={NETFLIX_LOGO}
          alt="logo" />
      </div>
        <form 
         onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute
         p-12 bg-black my-36 mx-auto 
        right-0 left-0 text-white 
        rounded-lg bg-opacity-85">
        <h1 className="font-bold text-3xl py-4 ">
            {isSignInForm ?
             "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm &&
             ( <input type="text" ref={name} 
              placeholder="Full Name"
         className="p-2 my-4 w-full bg-gray-700" />) }

        <input ref={email} type="text" placeholder="Email Address"
         className="p-2 my-4 w-full bg-gray-700" />

        <input ref={password} type="password" placeholder="Password"
         className="p-2 my-4 w-full bg-gray-700" />

         <p className="text-red-500">{errorMessage}</p>

        <button className="p-4  cursor-pointer my-6
         bg-red-700 w-full rounded-lg"
         onClick={handleButtonClick} >
            {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4" onClick={toggleSignInForm}> 

        {isSignInForm ? "New to Netflix? Sign up now" : "Already a user, Sign In now"}</p>
        </form>
    </div>)
}
export default Login