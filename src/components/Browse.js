import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainCotainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import usePopularMovies from "../hooks/usePopularMovies"
import { useSelector } from "react-redux"
import GptSearch from "./GptSearch"

const Browse = () => {

   const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
    
    useNowPlayingMovies()
    usePopularMovies()
   
    return(
        <div>
            <Header/>
            {showGptSearch ? (
                <GptSearch />
            ) : (
            <>
             <MainCotainer />
             <SecondaryContainer />
            </> 
        )}
             </div>
    )
}
export default Browse