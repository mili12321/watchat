import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
import { MovieList } from '../cmps/MovieList'
import { MovieFilter } from '../cmps/MovieFilter'
import { logout } from '../store/actions/userActions'
import { Link } from "react-router-dom"


class _Movies extends Component {
  state = {
    filterBy: {
      search: '',
      minYear: -Infinity,
      maxYear: Infinity,
      type: 'All',
    },
  }

  componentDidMount(){
    this.loadMovies()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.loadMovies()
    }
  }
  loadMovies = () => {
    const queryString = new URLSearchParams(this.props.location.search).get('genre') || 'All'
    console.log('location', this.props.location);
    this.setState(prevState => ({ filterBy: { ...prevState.filterBy, type: queryString } }), () => {
      console.log(this.state.filterBy);
      this.props.loadMovies(this.state.filterBy)

    })
  }
  handleInputs = (ev) => {
    const field = ev.target.name
    const value = ev.target.value
    this.setState(
      { ...this.state, filterBy: { ...this.state.filterBy, [field]: value } },
      () => {

        this.props.loadMovies(this.state.filterBy)
      }
    )
  }

  render() {
    const { movies } = this.props
    console.log('MOVIES IN MOVIELIST: ', movies)
    if (!movies) return <div>Loading....</div>
    return (
      <React.Fragment>
        <div className='movie-app'>
          <div className='main-header-container'>
            <div className='hero-slider'>
              <div className='slide1'>
                <div className='text-inside-slide'>
                  <div className='slide-upper-text-container'>
                    <div className='slide-title'>Wrath of Titans</div>
                    <div className='slide-genres'>
                      <div className='genre1'>Action</div>
                      <div className='genre2'>Adventure</div>
                      <div className='genre3'>Fantasy</div>
                    </div>
                    <div className='slide-btns'>
                      <div className='slide-btn1 slide-btn'>watch movie</div>
                      <div className='slide-btn2 slide-btn'>view info</div>
                      <div className='slide-btn3 slide-btn'>
                        + add to favorite
                      </div>
                    </div>
                  </div>
                  <div className='slide-rate'>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star-half-alt star-color'></i>
                    <i className='far fa-star star-color'></i>
                  </div>
                </div>
              </div>
              <div className='slide2'>
                <div className='text-inside-slide'>
                  <div className='slide-upper-text-container'>
                    <div className='slide-title'>Guardians of the Galaxy</div>
                    <div className='slide-genres'>
                      <div className='genre1'>Action</div>
                      <div className='genre2'>Adventure</div>
                      <div className='genre3'>Comedy</div>
                    </div>
                    <div className='slide-btns'>
                      <div className='slide-btn1 slide-btn'>watch movie</div>
                      <div className='slide-btn2 slide-btn'>view info</div>
                      <div className='slide-btn3 slide-btn'>
                        + add to favorite
                      </div>
                    </div>
                  </div>
                  <div className='slide-rate'>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star-half-alt star-color'></i>
                    <i className='far fa-star star-color'></i>
                  </div>
                </div>
              </div>
              <div className='slide3'>
                <div className='text-inside-slide'>
                  <div className='slide-upper-text-container'>
                    <div className='slide-title slide-dark-text'>
                      Pirates of the Caribbean
                    </div>
                    <div className='slide-genres'>
                      <div className='genre1 slide-dark-text'>Action</div>
                      <div className='genre2 slide-dark-text'>Adventure</div>
                      <div className='genre3 slide-dark-text'>Fantasy</div>
                    </div>
                    <div className='slide-btns'>
                      <div className='slide-btn1 slide-btn'>watch movie</div>
                      <div className='slide-btn2 slide-btn slide-dark-text'>
                        view info
                      </div>
                      <div className='slide-btn3 slide-btn slide-dark-text'>
                        + add to favorite
                      </div>
                    </div>
                  </div>
                  <div className='slide-rate'>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star-half-alt star-color'></i>
                    <i className='far fa-star star-color'></i>
                  </div>
                </div>
              </div>
              <div className='slide4'>
                <div className='text-inside-slide'>
                  <div className='slide-upper-text-container'>
                    <div className='slide-title'>IT</div>
                    <div className='slide-genres'>
                      <div className='genre1'>Horror</div>
                    </div>
                    <div className='slide-btns'>
                      <div className='slide-btn1 slide-btn'>watch movie</div>
                      <div className='slide-btn2 slide-btn'>view info</div>
                      <div className='slide-btn3 slide-btn'>
                        + add to favorite
                      </div>
                    </div>
                  </div>
                  <div className='slide-rate'>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star star-color'></i>
                    <i className='fas fa-star-half-alt star-color'></i>
                    <i className='far fa-star star-color'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MovieFilter filterBy={this.state.filterBy} handleInputs={this.handleInputs} />

          <div className="movies-main-section">

            <div className="movies-side-nav">
              <div className={`movies-sidenav`}>
                <div className="side-nav-main">
                  <input type="text" />
                </div>
                <Link className="side-navlink-btn" to="?genre=action">Action</Link>
                
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Comedy'
                  }
                }}>Comedy</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Crime'
                  }
                }}>Crime</Link>

                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Drama'
                  }
                }}>Drama</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Fantasy'
                  }
                }}>Fantasy</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Adventure'
                  }
                }}>Adventure</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Horror'
                  }
                }}>Horror</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Horror'
                  }
                }}>Romance</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Romance'
                  }
                }}>Horror</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Sci-Fi'
                  }
                }}>Sci-Fi</Link>
                <Link className="side-navlink-btn" to={{
                  pathname: "/genre",
                  genre: {
                    name: 'Thriller'
                  }
                }}>Thriller</Link>
                <Link className="side-navlink-btn" to="">Fairy Tale</Link>

              </div>

            </div>{/* end of movies-side-nav */}
            <MovieList movies={movies} />
          </div>{/* end of movies-main-section */}

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loggedInUser: state.user.loggedInUser,
  }
}
const mapDispatchToProps = {
  loadMovies,
  logout,
}
export const Movies = connect(mapStateToProps, mapDispatchToProps)(_Movies)

