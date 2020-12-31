import React from 'react'
import { HomeMoviePreview } from './HomeMoviePreview'


export function HomeMovieList({ movies }) {
    
    return (
    <div className="home-movie-list">
    
                { 
                movies.map((movie,idx) => 
                <div key={ movie._id } className={`home-movie-container top-movie-${idx+1}`}>
                    <HomeMoviePreview className="home-movie-preview" movie={ movie }/>
                <div className={`top-num`}>{idx+1}</div>
                </div>)
                }
        
        
    </div>

)
}
