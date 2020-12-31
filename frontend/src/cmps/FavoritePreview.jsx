import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

export function _FavoritePreview({ movie, removeFromFavList }) {
    return (
        // <NavLink to={`/movie/${movie._id}`} className="favorite-preview-link">
            <div className="favorite-preview">
                <img src={`${movie.coverUrl}`} alt=""/>
                <div className="movie-details">
                    <div className="title">{movie.title}</div>
                    <div className="genres">{movie.genres.map(genre=>
                        <span>{genre} </span>
                    )}</div>
                    <div className="duration">{movie.duration}</div>
                </div>
                <div className="remove-from-list-btn" onClick={(ev)=>{removeFromFavList(ev,movie)}}> <i className="fas fa-trash-alt"></i></div>
            </div>     
        // </NavLink>  
    )
}
export const FavoritePreview = withRouter(_FavoritePreview)
