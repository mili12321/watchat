const initialState = {
    movies: [],
}

export function movieReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.movies
            }
        case 'ADD_MOVIE':
            const movies = [...state.movies, action.savedMovie]
            return {...state, movies} 
        case 'UPDATE_MOVIE':
            console.log("UPDATE_MOVIE: ", action.savedMovie);
            return {
                ...state,
                movies: state.movies.map(movie => movie._id === action.savedMovie._id?action.savedMovie:movie )
            }
        default:
            return state
    }
}