import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
import { logout } from '../store/actions/userActions'
import { Link } from "react-router-dom"


class _CategoryPage extends Component {
  state = {
        currGenre:this.props.location.genre.name,
    
  }

  componentDidMount(){
    this.props.loadMovies(this.state.filterBy)
  }



changeCategory=()=>{
    this.setState({currGenre:this.props.location.genre.name})
}




  render() {
    const { movies } = this.props;
    let genre = movies.filter(movie => movie.genres.includes(`${this.state.currGenre}`));
    if (!movies) return <div>Loading....</div>
    return (
      <React.Fragment>
        {console.log(movies)}
        <div className='movie-app'>
          <div className='main-header-container'>
          <div className="hero-slider">
            <div className="slide1">
            <div className="text-inside-slide">
                  <div className="slide-upper-text-container">
                       <div className='slide-title'>Wrath of Titans</div>
                       <div className="slide-genres">
                         <div className="genre1">Action</div>
                         <div className="genre2">Adventure</div>
                         <div className="genre3">Fantasy</div>
                       </div>
                       <div className="slide-btns">
                          <div className='slide-btn1 slide-btn'>watch movie</div>
                          <div className='slide-btn2 slide-btn'>view info</div>
                          <div className='slide-btn3 slide-btn'>+ add to favorite</div>
                       </div>
                  </div>
                  <div className="slide-rate">
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star-half-alt star-color"></i>
                    <i className="far fa-star star-color"></i>
                  </div>
              </div>
            </div>
            <div className="slide2">
            <div className="text-inside-slide">
                  <div className="slide-upper-text-container">
                       <div className='slide-title'>Guardians of the Galaxy</div>
                       <div className="slide-genres">
                         <div className="genre1">Action</div>
                         <div className="genre2">Adventure</div>
                         <div className="genre3">Comedy</div>
                       </div>
                       <div className="slide-btns">
                          <div className='slide-btn1 slide-btn'>watch movie</div>
                          <div className='slide-btn2 slide-btn'>view info</div>
                          <div className='slide-btn3 slide-btn'>+ add to favorite</div>
                       </div>
                  </div>
                  <div className="slide-rate">
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star-half-alt star-color"></i>
                    <i className="far fa-star star-color"></i>
                  </div>
              </div>
            </div>
            <div className="slide3">
            <div className="text-inside-slide">
                  <div className="slide-upper-text-container">
                       <div className='slide-title slide-dark-text'>Pirates of the Caribbean</div>
                       <div className="slide-genres">
                         <div className="genre1 slide-dark-text">Action</div>
                         <div className="genre2 slide-dark-text">Adventure</div>
                         <div className="genre3 slide-dark-text">Fantasy</div>
                       </div>
                       <div className="slide-btns">
                          <div className='slide-btn1 slide-btn'>watch movie</div>
                          <div className='slide-btn2 slide-btn slide-dark-text'>view info</div>
                          <div className='slide-btn3 slide-btn slide-dark-text'>+ add to favorite</div>
                       </div>
                  </div>
                  <div className="slide-rate">
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star-half-alt star-color"></i>
                    <i className="far fa-star star-color"></i>
                  </div>
              </div>
            </div>
            <div className="slide4">
            <div className="text-inside-slide">
                  <div className="slide-upper-text-container">
                       <div className='slide-title'>IT</div>
                       <div className="slide-genres">
                         <div className="genre1">Horror</div>
                       </div>
                       <div className="slide-btns">
                          <div className='slide-btn1 slide-btn'>watch movie</div>
                          <div className='slide-btn2 slide-btn'>view info</div>
                          <div className='slide-btn3 slide-btn'>+ add to favorite</div>
                       </div>
                  </div>
                  <div className="slide-rate">
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star star-color"></i>
                    <i className="fas fa-star-half-alt star-color"></i>
                    <i className="far fa-star star-color"></i>
                  </div>
              </div>
            </div>
          </div>
          </div>


{console.log('this.props.location.genre.name',this.props.location.genre.name)}

          <div className="movie-list">
        <div className="movie-category">
            <div className="category-title">
                <h4 className="category-name">{this.state.genre}</h4>
                <h4 className="all-btn">See All {genre.length}</h4>
            </div>
            <div className="category-movies">
                { 
                genre.map(movie => 
                <div key={ movie._id } className="movie-container">
                    <div className="movie-preview">
                      <div className='movie-img-container' style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} ></div>
                    </div>
                     <div className="btns-container">
                        <span className="movie-btn movie-btn-details"><Link to={`/movie/${movie._id}`} >Details</Link></span>
                    </div>
                </div>)
                }
            </div>
        </div>
        </div>
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
export const CategoryPage = connect(mapStateToProps, mapDispatchToProps)(_CategoryPage)
