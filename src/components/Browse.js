import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainCotainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

const Browse = () => {
    
    useNowPlayingMovies()
   
    return(
        <div>
            <Header/>
            <MainCotainer/>
            <SecondaryContainer/>
            </div>
    )
}
export default Browse