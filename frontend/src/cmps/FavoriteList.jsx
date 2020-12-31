import React from 'react'
import { FavoritePreview } from './FavoritePreview'
import { Link } from "react-router-dom"

export function FavoriteList({ loggedInUser, removeFromFavList, onToggleList, isClose }) {
        return (
            <div className="favorite-movies-section">

                <div className={`fav-list-btn ${isClose? "":"fav-btn-open"}`} onClick={onToggleList} >
                    <div>
                    My List
                    </div>
                </div>

                <div className={`favorite-movies-list ${isClose? "closeNav":"openNav open-nav-style"}`} onClick={onToggleList}>
                    <div className={`close-list-msg  ${isClose? "hide-closing-msg":""}`}>
                    <i className="fas fa-long-arrow-alt-left"></i> Click to Close
                    </div>
                    <div className="container">
                        { loggedInUser&&loggedInUser.favMovies.length>0?loggedInUser.favMovies.map(favMovie=>
                        <FavoritePreview movie={favMovie} removeFromFavList={removeFromFavList}/>
                        ):
                        <div className="empty-msg"><i>The List is Empty</i></div>}
                    </div>
                </div>

            </div>
    )
}
