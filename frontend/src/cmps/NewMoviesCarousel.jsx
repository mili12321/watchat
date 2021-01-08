import React, { Component } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom'

function NextArrow(props) {
    const { className, style, onClick} = props;
    return (
      <div
        className={`${className} slick-next-btn-style`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
}
  
function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-prev-btn-style`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
}


export class NewMoviesCarousel extends Component{
    render() {
      const {movies, isFavoriteMovie, toggleFavoriteList, avgReview } = this.props
      const settings = {
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1160,
                settings: {
                  slidesToShow: 8,
                  slidesToScroll: 8,
                  infinite: true,
                }
            },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7,
              infinite: true,
            }
          },
          {
            breakpoint: 990,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              infinite: true,
            }
          },
          {
            breakpoint: 870,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              initialSlide: 0
            }
          },
          {
            breakpoint: 730,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 0
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0
            }
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          }
        ]
      };
  
      return (
        <React.Fragment>
       <Slider {...settings}>
            {movies.slice(0,11).map((movie) => (
                  <div key={movie._id} className={`home-new-movie-container`}>

                    <Link to={`/movie/${movie._id}`} className='new-movie-img-container'
                      style={{
                        backgroundImage: `url(${
                          movie.coverUrl ? movie.coverUrl : ''
                        })`,
                      }}></Link>

                    <div className='info-continer-movie-card'>
                      <div
                        className={`title ${
                          movie.title.length > 11 ? 'ellipsis' : ''
                        }`}>
                        {movie.title}
                      </div>

                      <div className='genres-container'>
                        {movie.genres.map((genre,idx) => (
                          <div  key={idx} className='genre'>{genre}</div>
                        ))}
                      </div>
                      <div className='btns-container'>
                        <span className='movie-btn movie-btn-details'>
                          <Link to={`/movie/${movie._id}`}>
                            <i className='fas fa-info-circle'></i>
                          </Link>
                        </span>
                        <span className='movie-btn'>
                          <Link to={`/room/${movie._id}`}>
                            <i className='far fa-play-circle'></i>
                          </Link>
                        </span>
                        <span className='movie-btn' onClick={()=>{toggleFavoriteList(movie)}}>
                        {isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                          <Link><i className="fas fa-plus"></i></Link>:
                          <Link><i className="fas fa-check"></i></Link>
                        }
                        </span>
                      </div>

                      <div className='rate-container'>
                        <div>
                          <i className='far fa-eye'></i>
                          {movie.viewersNumber
                            ? movie.viewersNumber
                            : Math.floor(Math.random() * (200 - 50) + 50)}
                        </div>
                        ⭐ {avgReview(movie)}/10
                      </div>
                    </div>
                  </div>
            ))}
        </Slider>
        </React.Fragment>
      );
    }
  }