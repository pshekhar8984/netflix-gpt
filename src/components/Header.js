import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import { LOGO } from "../utils/constant";


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is Sign up/in
          const {uid,email,displayName , photoURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
          navigate("/browse")
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/")
        }
      });
      //Unsubscribe when component is Unmount
      return () => unsubscribe();
},[])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
    
  }
    return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
     <img className="w-44" 
     src = {LOGO}
   alt="logo" />
   {user && 
   (<div className="flex p-2">
      <img className="w-16 h-16 p-2" alt="userIcon" 
      src={user?.photoURL}/>
      <button className="font-bold border-separate text-white" onClick={handleSignOut}>(Sign Out)</button>
    </div>) }
   
    </div>
    )
}
export default Header