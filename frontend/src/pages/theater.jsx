import React, { Component } from 'react'
import { movieService } from '../services/movieService.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class _MovieDetails extends Component {
  state = {
    movie: null,
    showComponent: false,
  }

  onOpenModal = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    })
  }

  componentDidMount() {
    this.loadMovie()
  }

  async loadMovie() {
    const movieId = this.props.match.params.id
    const movie = await movieService.getById(movieId)
    this.setState({ movie })
  }

  renderTitleColor(title) {
    switch(title) {
      case "The Equalizer":
        return 'dark-title-on-background';
      default:
        return 'light-title-on-background';
    }
  }

  renderInfoColor(title) {
    switch(title) {
      case "The Equalizer":
        return 'dark-info-on-background';
      case "Kill Switch":
        return 'dark-info-on-background';
      case "Hellboy":
        return 'dark-info-on-background';
      default:
        return 'light-info-on-background';
    }
  }





  render() {
    const { movie } = this.state
    if (!movie) return <div>Loading....</div>
    return (
      <React.Fragment>

        <div className={`movie-details`}>

        <div className="details-hero-container" style={{backgroundImage: `url(${movie.wideCoverUrl? movie.wideCoverUrl:""})`}} >
            <div className="details-hero-info-container">
              <div className={`details-hero-title ${this.renderTitleColor(movie.title)}`}>{movie.title}</div>
              <div className="details-hero-info-btns-container">
                <div className={`details-hero-info ${this.renderInfoColor(movie.title)}`}>
                    <div className="details year">{movie.year}</div>
                    <div className="details duration">{movie.duration}</div>
                </div>
                <div className="details-hero-btns">
                  <div className={`details-hero-btn play-btn ${movie.title==="Hellboy"? 'case-red-background' : ''}`}><Link to={`/room/${movie._id}`}><i className="fas fa-play"></i><span>Play</span></Link></div>
                  <div className="details-hero-btn my-list-btn"><i className="fas fa-plus"></i><span>My List</span></div>
                </div>
              </div>
            </div>
            
            <div className="scenes-container">
              { movie.scenesUrl.map(scene => 
                <div className="scene-img-container" style={{backgroundImage: `url(${scene})`}}></div>
              )}
            </div>
          </div>


          <section className="details-more-info-section">
            <div className="description-container">
              <div className="overview-title">Overview</div>
              <div className="genres-title">Genres</div>
              <div className="overview-txt">${movie.description}</div>
              <div className="genres-txt">
                  { movie.genres.map(genre => 
                    <div>{genre}</div>
                  )}
              </div>
            </div>
            

            <div className="cast-continer">
              <div className="cast-title">Cast</div>
              { movie.cast.map((actor,idx) => 
                <div className={`actor-container actor-${idx+1}`}>
                  <img className="actor-img" src={`${actor.img}`} alt=""/>
                  <div className="actor-info-container">
                    <div className="actor-name">{actor.name}</div>
                    <div className="actor-character">{actor.character}</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="reviews-container">
            <div className="reviews-title">Reviews</div>
          </section>








































{/* some buttons */}

          {/* <div className='movie-details-btn-continer'>
>>>>>>> caad2a5e23757f8266b63762576b016af76a0bea
            <div 
              className='details-btn-watch'>
              <Link to={`/room/${movie._id}`}>Watch Now</Link>
            </div>
            <div
              className='add-fav-btn'
              onClick={() => this.props.history.goBack()}>
              Add movie <br/> to favorite
            </div>
            <div
              className='details-back-btn'
              onClick={() => this.props.history.goBack()}>
              Back
            </div>
          </div> */}

        </div>

      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loggedInUser: state.user.loggedInUser,
    reviews: state.review.reviews,
  }
}

export const MovieDetails = connect(mapStateToProps)(_MovieDetails)
