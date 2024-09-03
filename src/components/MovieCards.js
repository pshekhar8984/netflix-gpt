import { IMG_CDN_URL } from "../utils/constant";

const MovieCards = ({posterPath}) => {
  return(
  <div className="w-48 px-2">
    <img alt="Movie Cards" 
         src={IMG_CDN_URL + posterPath}
    />
  </div>)
}
export default MovieCards;