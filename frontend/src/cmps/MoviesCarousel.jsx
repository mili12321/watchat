import React, { Component } from 'react'
import Slider from "react-slick";
import { MoviePreview } from './MoviePreview'

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


export class MoviesCarousel extends Component{
    render() {
      const {movies, genre, appCondition, name } = this.props
      const settings = {
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        speed: 500,
        slidesToShow: 13,
        slidesToScroll: 10,
        initialSlide: 0,
        variableWidth: true,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 9,
              slidesToScroll: 9,
            }
          },
          {
            breakpoint: 1288,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8,
            }
          },
            {
                breakpoint: 1160,
                settings: {
                  slidesToShow: 8,
                  slidesToScroll: 8,
                }
            },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7,
            }
          },
          {
            breakpoint: 990,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
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
              slidesToScroll: 2,
              swipeToSlide: true,
            }
          }
        ]
      };
  
      return (
        <React.Fragment>
      {name==='popular'&&<Slider {...settings}>
          { 
            movies.map(movie => 
              <div key={ movie._id } className="movie-container">
                <MoviePreview className="movie-preview" movie={ movie } appCondition={appCondition}/>
              </div>
          )}
        </Slider>}

        {name==='genre'&&<Slider {...settings}>
           { 
            movies.filter((movie) => movie.genres.includes(genre)).map(movie => 
              <div key={ movie._id } className="movie-container">
                <MoviePreview className="movie-preview" movie={ movie } />
              </div>
          )}
        </Slider>}
        </React.Fragment>
      );
    }
  }