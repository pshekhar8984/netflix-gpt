import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainCotainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import usePopularMovies from "../hooks/usePopularMovies"

const Browse = () => {
    
    useNowPlayingMovies()
    usePopularMovies()
   
    return(
        <div>
            <Header/>
            <MainCotainer/>
            <SecondaryContainer/>
            </div>
    )
}
export default Browse