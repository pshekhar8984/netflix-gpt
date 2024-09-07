import GptMoviesSuggestion from "./GptMoviesSuggestion";
import GptSearchBar from "./GptSearchBar";
import { NETFLIX_LOGO } from "../utils/constant";

const GptSearch = () => {
    return(<div>
        <div className="absolute -z-10">
         <img  src={NETFLIX_LOGO}
          alt="logo" />
      </div>
         <GptSearchBar/>
         <GptMoviesSuggestion/>
    </div>)
}
export default GptSearch;