import React from 'react'
import { FavoritePreview } from './FavoritePreview'
import { Link } from "react-router-dom"

export function FavoriteList({ loggedInUser, removeFromFavList, favListRef, clickedOutside, handleClickInside }) {
        return (
            <div className="favorite-movies-section"
            ref={favListRef} 
            onClick={handleClickInside}
            >
                <div className={`fav-list-btn ${clickedOutside? "":"fav-btn-open"}`} 
                >
                    <div>
                    My List
                    </div>
                </div>

                <div className={`favorite-movies-list ${clickedOutside? "closeNav":"openNav open-nav-style"}`}
                >
                    <div className={`close-list-msg  ${clickedOutside? "hide-closing-msg":""}`}>
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
