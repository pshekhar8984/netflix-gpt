import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
   const movies = useSelector(store => store.movies)

    return (
        movies.nowPlayingMovies && (
             <div className="bg-black">
            <div className="-mt-52 relative z-20">
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Popular"} movies={movies.popularMovies}/>
            <MovieList title={"New Streaming"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Si-Fi Movies"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Action"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Comedies"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"My List"} movies={movies.nowPlayingMovies}/>
            </div>
            </div>)
    )
}
export default SecondaryContainer;