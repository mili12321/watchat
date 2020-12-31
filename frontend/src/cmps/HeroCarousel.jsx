import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom'


export class HeroCarousel extends Component{

    changeRateToStars=(movie)=>{
      let content = [];
      const avgRate = this.props.avgReview(movie)/2
      for (let i = 1; i < Math.ceil(avgRate); i++) {
        content.push(<i className='fas fa-star star-color'></i>)
        
      }
      if(Math.ceil(avgRate)===avgRate){
        return <i className='fas fa-star star-color'></i>
      }else if(Math.ceil(avgRate)>avgRate){
        content.push(<i className='fas fa-star-half-alt star-color'></i>)
      }
      if(Math.ceil(avgRate)<5){
        for (let i = avgRate+1; i < 5; i++) {
          content.push(<i className='far fa-star star-color'></i>)
          
        }
      }
      return content
    }

    render() {
      const {movies, toggleFavoriteList, isFavoriteMovie} = this.props
      return (
        <React.Fragment>
        <AliceCarousel
        infinite
        mouseTracking
        duration={400}
        autoPlay={true}
        startIndex = {1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        playButtonEnabled={true}
        autoPlayInterval={2000}
        autoPlayDirection="ltr"
        autoPlayActionDisabled={true}
      >
         {movies.map((movie, idx) => (
            <div className="hero-carousel">
                 <div className={`slide${idx + 1} slide`}  style={{
                    backgroundImage: `url(${
                      movie.heroCoverUrl ? movie.heroCoverUrl : ''
                    })`,
                  }}>
                 {/* movie details */}
       <div className='text-inside-slide'>
         <div className='slide-upper-text-container'>
          <div className='slide-title'>{movie.title}</div>
         <div className={`slide-genres`}>
             {movie.genres.map((genre, idx) => (
              <div key={movie._id} className={`genre${idx + 1}`}>
                {genre}
              </div>
            ))}
          </div>
          <div className='slide-btns'>
            <Link  to={`/room/${movie._id}`} >
              <div className='slide-btn1 slide-btn'>
                watch movie
              </div>
            </Link>
            <Link to={`/movie/${movie._id}`} className="slide-btn-style slide-btn"  >
              <div className={`slide-btn2 `}>
                view info
              </div>
            </Link>
           
           
            <div className={`slide-btn3 slide-btn`} onClick={()=>{toggleFavoriteList(movie)}}>
              {isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                <Link ><i className="fas fa-plus"></i></Link>:
                <Link ><i className="fas fa-check"></i></Link>
              }
              add to favorite
            </div>
          </div>
        </div>
        <div className='slide-rate'>
         { this.changeRateToStars(movie)}
        </div>
      </div>
      {/* and of movie details */}
     
      {/* atart of information about the app - text */}
      <div className='text-inside-slide2'>
        <div className='info-in-slide'>
          {/* <div>
            Watch movies with your friends with interactive chat and live reactions
          </div> */}
        </div>
      </div>
      {/* end of information about the app */}
               </div>
               </div>
                ))}
        </AliceCarousel>
        </React.Fragment>
      );
    }
  }


    // <div className={`slide${idx + 1}`}>
    //   {/* movie details */}
    //   <div className='text-inside-slide'>
    //     <div className='slide-upper-text-container'>
    //       <div className='slide-title'>{movie.title}</div>
    //       <div className={`slide-genres`}>
    //         {movie.genres.map((genre, idx) => (
    //           <div key={movie._id} className={`genre${idx + 1}`}>
    //             {genre}
    //           </div>
    //         ))}
    //         {/* <div className="duration">Duration: 1h 52m</div> */}
    //       </div>
    //       <div className='slide-btns'>
    //         <div className='slide-btn1 slide-btn'>
    //           <Link  to={`/room/${movie._id}`}>watch movie</Link>
    //         </div>
    //         <div className={`slide-btn2 slide-btn`}>
    //           <Link to={`/movie/${movie._id}`} >view info</Link>
    //         </div>
           
    //         <div className={`slide-btn3 slide-btn`} onClick={()=>{this.toggleFavoriteList(movie)}}>
    //           {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
    //             <Link><i className="fas fa-plus"></i></Link>:
    //             <Link><i className="fas fa-check"></i></Link>
    //           }
    //           add to favorite
    //         </div>
    //       </div>
    //     </div>
    //     <div className='slide-rate'>
    //       <i className='fas fa-star star-color'></i>
    //       <i className='fas fa-star star-color'></i>
    //       <i className='fas fa-star star-color'></i>
    //       <i className='fas fa-star-half-alt star-color'></i>
    //       <i className='far fa-star star-color'></i>
    //     </div>
    //   </div>
    //   {/* and of movie details */}
     
    //   {/* atart of information about the app - text */}
    //   <div className='text-inside-slide2'>
    //     <div className='info-in-slide'>
    //       {/* <div>
    //         Watch movies with your friends with interactive chat and live reactions
    //       </div> */}
    //     </div>
    //   </div>
    //   {/* end of information about the app */}
    // </div>

