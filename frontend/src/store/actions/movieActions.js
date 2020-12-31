import { movieService } from '../../services/movieService'
import { loading, doneLoading } from './systemActions';

export function loadMovies(filterBy) {
  
    return async dispatch => {
        try{
            dispatch(loading());
            const movies = await movieService.query(filterBy);
            dispatch({ type: 'SET_MOVIES', movies })
        }catch(err){
            console.log('MovieActions: err in loadMovies', err);
        }finally{
            dispatch(doneLoading());
        }
    }
}

export function addMovie(movie) {
    return async dispatch => {
        try{
            await movieService.save(movie)
            dispatch({ type: 'ADD_MOVIE', movie})
        }catch(err){
            console.log('MovieActions: err in addMovie', err); 
        }
    }
}

export function updateMovie(movie) {
    return async dispatch => {
        try{
            await movieService.save(movie)
            dispatch({ type: 'UPDATE_MOVIE', movie})
        }catch(err){
            console.log('MovieActions: err in updateMovie', err); 
        }
    }
}

