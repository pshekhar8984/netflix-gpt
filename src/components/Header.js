import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch) 

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
   
  const handleGptSearchClick = () => {
     dispatch(toggleGptSearchView());
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

   const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
   }

    return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
     <img className="w-44" 
     src = {LOGO}
   alt="logo" />
   {user && 
   (<div className="flex p-2">
     {showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang) => 
      ( <option key={lang.identifier} 
        value={lang.identifier}>
          {lang.name}</option>)
     )}
     </select>}
    <div>
      <button className="py-4 px-4 text-white bg-red-800 rounded-lg m-2" 
      onClick = {handleGptSearchClick}>
      {showGptSearch? "Homepage" : "GPT Search"} 
      </button>
    </div>
      <img className="w-16 h-16 p-2" alt="userIcon" 
      src={user?.photoURL}/>
      <button className="font-bold border-separate text-white m-2" 
      onClick={handleSignOut}>
        (Sign Out)
        </button>
    </div>) }
    </div>
    )
}
export default Header