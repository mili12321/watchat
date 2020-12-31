import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom'

export class Carousel extends Component{


    onSlideChange(e) {
      console.log('Item`s position during a change: ', e.item);
      console.log('Slide`s position during a change: ', e.slide);
    }
  
    onSlideChanged(e) {
      console.log('Item`s position after changes: ', e.item);
      console.log('Slide`s position after changes: ', e.slide);
    }
  
    render() {
      const {movies} = this.props
      const responsive = {
        0: {
          items: 1
        },
        350: {
          items: 2
        },
        720: {
          items: 3
        },
        1000: {
          items: 4
        },
        1290: {
          items: 5
        }
      };
  
      return (
        <React.Fragment>
        <AliceCarousel
        duration={400}
        autoPlay={true}
        startIndex = {1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        playButtonEnabled={true}
        responsive={responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlayActionDisabled={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
        className="alice-carousel"
        id="top-carousel"
      >
        {movies.slice(10,20).map((movie, idx) => (
          <Link to={`/movie/${movie._id}`} >
                  <div key={movie._id} className={`carousel-card`}>
                    {/* <Link to={`/movie/${movie._id}`} > */}
                    <div className="movie-img-container">
                      <div className='movie-img'
                        style={{
                          backgroundImage: `url(${
                            movie.coverUrl ? movie.coverUrl : ''
                          })`,
                        }}>
                          
                      </div>
                    </div>
                        <div className={`top-number ${idx===9?"last-child":""}`}>{idx + 1}</div>
                      
                  </div>
          </Link>
                ))}
        </AliceCarousel>
        </React.Fragment>
      );
    }
  }