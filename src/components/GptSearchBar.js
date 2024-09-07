import { useSelector } from 'react-redux'
import lang from '../utils/languageConstant'

const GptSearchBar = () => {
     
    const langkey = useSelector((store) => store.config.lang)
     
    const handleSearch = () => {

    }
    return(
    <div className="pt-[10%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12">
        <input type="text" placeholder={lang[langkey].gptSearchPlaceholder}
         className="p-4 m-4 col-span-9"/>
        <button className="p-4 m-4 bg-red-800 rounded-lg col-span-3 text-white"
        onClick={handleSearch}>
         {lang[langkey].search}
        </button>
        </form>
    </div>)
}
export default GptSearchBar;