import React from 'react'
import { MoviePreview } from './MoviePreview'


export function MovieList({ movies, appCondition }) {
  const genres = [
   'Action','Comedy','Crime','Drama','Fantasy',
   'Adventure','Horror','Sci-Fi','Thriller',
]
  const popular = movies.slice(12, 22)



 
  return (

    <div className="movie-list">
       
        <div className="movie-category">
            <div className="category-title">
                <h4 className="category-name">Popular in WatChat</h4>
            </div>
            <div className="category-movies">
                { 
                popular.map(movie => 
                <div key={ movie._id } className="movie-container">
                    <MoviePreview className="movie-preview" movie={ movie } appCondition={appCondition}/>
                </div>)
                }
            </div>
        </div>

        {genres.map(genre=>

            <div className="movie-category">
                <div className="category-title">
                <h4 className="category-name">{genre}</h4>
            </div>
            <div className="category-movies">
                { 
                 movies.filter((movie) => movie.genres.includes(genre)).map(movie => 
                    <div key={ movie._id } className="movie-container">
                      <MoviePreview className="movie-preview" movie={ movie }/>
                   
                 
                    </div>
                )}
            </div>
            </div>

        )}
      
        </div>

  )
}
