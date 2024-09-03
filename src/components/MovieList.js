import MovieCards from "./MovieCards";

const MovieList = ({title,movies}) => {
    return(
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
     <div className="flex overflow-x-scroll">
     <div className="flex">
        {movies?.map(movie =>  <MovieCards key={movie.id} posterPath={movie.poster_path}/>)}
      </div>
     </div>
    </div>)

}
export default MovieList;