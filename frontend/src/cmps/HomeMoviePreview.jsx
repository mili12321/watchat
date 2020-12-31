import React from 'react'

export function HomeMoviePreview({ movie }) {
  return (
    <React.Fragment>
      <div className='home-movie-img-container' style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} >
      </div>
    </React.Fragment>
  )
}
