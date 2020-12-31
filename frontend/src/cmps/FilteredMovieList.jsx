import React from 'react'
import { MoviePreview } from './MoviePreview'


export function FilteredMovieList({ movies, toggleView, appCondition }) {
  return (
    <div className="filtered-movie-list">
        <div className="movie-category">
            <div className="category-movies">
                { 
                movies.map(movie => 
                <div key={ movie._id } className="movie-container">
                    <MoviePreview className="movie-preview" movie={ movie } toggleView={toggleView} appCondition={appCondition} />
                </div>)
                }
            </div>
        </div>
    </div>
    )
}
