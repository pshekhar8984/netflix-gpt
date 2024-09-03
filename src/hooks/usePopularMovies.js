import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant"
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
   //Fetch Data from TMDB api and update the store
   const dispatch = useDispatch();

    const getPopularMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1",
            API_OPTIONS
        );
        const json = await data.json()
        dispatch(addPopularMovies(json.results))
    }

    useEffect(() => {
        getPopularMovies()
    },[])
     
}

export default usePopularMovies;