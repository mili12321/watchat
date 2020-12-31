import React from 'react'

export function MovieSlider({ movies }) {
    
    return (
        <React.Fragment>
        <div className="home-movie-slide-container">
            { 
            movies.map((movie,idx) => 
            <div key={ movie._id }  className={`home-movie-slide slide-${idx+1}`} style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}}>
            </div>)
            }


        </div>
            <div className="content">
                <div className="background">
                  <div className="left">left</div>
                  <div className="right">right</div>
                </div>
                <div className="content-container">content here...</div>
        </div>


        </React.Fragment>
)
}

