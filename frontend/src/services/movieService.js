import httpService from './httpService'

const KEY = 'favorite'
let gFavoriteMovies =[];

export const movieService = {
    query,
    getById,
    save,
    getFavoriteList,
    toggleFavList
}


function query(filterBy) {
    const queryStr = `?search=${filterBy.search}&minYear=${filterBy.minYear}&maxYear=${filterBy.maxYear}&type=${filterBy.type}`;
    return httpService.get(`movie${queryStr}`);
}

function getById(movieId) {
    return httpService.get(`movie/${movieId}`)
}

function save(movie) {
    return httpService.put(`movie/${movie._id}`, movie)
}

function getFavoriteList(){
    gFavoriteMovies = loadFromStorage(KEY)
    if(!gFavoriteMovies){
        return "no favorite movies"
    }else{
        console.log("fav list in Storage:",gFavoriteMovies)
        return Promise.resolve(gFavoriteMovies)
    }
}

function toggleFavList(movie){
    console.log("the movie that added to fav list in Storage:",movie)
    gFavoriteMovies = [movie, ...gFavoriteMovies]
    saveToStorage(KEY, gFavoriteMovies)
}


function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}