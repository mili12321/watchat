import React, { Component } from 'react'
import { FilteredMovieList } from '../cmps/FilteredMovieList'

export class FilteredMovie extends Component {
    getMoviesForDisplay() {
        const moviesByGenres = this.props.movies.filter(movie => movie.genres.includes(this.props.currGenre))
        let movies;
        if(this.props.currGenre==="All"){
            movies = this.props.movies.filter(movie => movie.title.toLowerCase().includes(this.props.currSearch.toLowerCase()))
        }
        else{
            movies = moviesByGenres.filter(movie => movie.title.toLowerCase().includes(this.props.currSearch.toLowerCase()))
        }
        return movies;
    }

    render() {
        const { currGenre, currSearch, currCmp , toggleView, appCondition} = this.props
        let movies;
        if(currCmp==="navFilter"){
            movies = this.props.movies;
        }else{
            movies = this.getMoviesForDisplay();
        }
        return (
           <div>
               <div className={`filtered-movies-section ${currCmp==="navFilter"? 'nav-filter-style': ''}`}>
                   {
                        movies.length===0?
                        <div className="no-movies-container">
                            <div className="no-movies-msg">
                            <h2>Sorry</h2>
                            No movies Found 
                            {currSearch&&currSearch!==""?
                            <span> for "{currSearch}"</span>
                            : null}
                            {currGenre&&currGenre!=='All'?
                            <span> inside "{currGenre}" Genre</span>
                            :null}
                            </div>
                            <img className="no-movies-img" src="../assets/img/no-movies-img.png" alt=""/>
                        </div>
                        : <FilteredMovieList movies={movies} toggleView={toggleView} appCondition={appCondition}/>
                   }
               </div>
           </div> 
        )}
}
