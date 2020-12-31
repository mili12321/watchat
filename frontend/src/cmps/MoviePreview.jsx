import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleFavUserList } from '../store/actions/userActions'
import { LoginModal } from './LoginModal';

class _MoviePreview extends Component {
  state = {
    showComponent: false,
  }

  avgReview = (movie) => {
    let sumReviews = 0
    let avg = 0
    let ratingCount = 0
    if(movie.reviews){
      movie.reviews.forEach((review) => {
        if (review.rating) {
          sumReviews += parseInt(review.rating)
          ratingCount++
        }
      })
      avg = sumReviews / ratingCount
      return avg.toFixed(1)
    }else{
      return 0
    }
  }


  toggleFavoriteList=(movie)=>{
    if(this.props.loggedInUser){
      console.log("loggedInUser.favMovies:", this.props.loggedInUser.favMovies)
      this.props.toggleFavUserList(this.props.loggedInUser,movie)
      console.log('favoriteList:',this.props.favoriteList)
    }else{
      this.onOpenModal()
    }
  }
  onOpenModal=()=>{
    this.setState({
        showComponent: !this.state.showComponent
      });
  }

  isFavoriteMovie=(movie)=>{
    if(this.props.loggedInUser&&this.props.loggedInUser.favMovies.find(_movie=> _movie._id === movie._id  )){
      return "favoriteBtnStyle"
    }else{
      return ""
    }
  }

  componentDidMount(){
    console.log('this.props.appCondition',this.props.appCondition)
  }
  render() {
    const { movie, toggleView, appCondition } = this.props
    return (
      <React.Fragment>
            <div className='genres-movie-img-container' style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} ></div>
  
            <div className="info-continer-movie-card">
                <div className={`title ${movie.title.length>11?"ellipsis":""}`}>{movie.title}</div>
  
                <div className="genres-container">
                  {movie.genres.map(genre=>
                    <div className='genre'>{genre}</div>
                  )}
                </div>
{/* //1 */}
                {appCondition&&<div className="btns-container">
                  <span className="movie-btn movie-btn-details" onClick={()=>{toggleView('main')}}><Link to={`/movie/${movie._id}`} ><i className="fas fa-info-circle"></i></Link></span>
          
                  <span className="movie-btn" onClick={()=>{toggleView('main')}}><Link  to={`/room/${movie._id}`}><i className="far fa-play-circle"></i></Link></ span>

                  <span className="movie-btn" onClick={()=>{this.toggleFavoriteList(movie)}}>
                  {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                    <Link><i className="fas fa-plus"></i></Link>:
                    <Link><i className="fas fa-check"></i></Link>
                  }
                    </ span>
                </div>}
{/* //2 */}         
                {!appCondition&&<div className="btns-container">
                <span className="movie-btn movie-btn-details" ><Link to={`/movie/${movie._id}`} ><i className="fas fa-info-circle"></i></Link></span>
        
                <span className="movie-btn" ><Link  to={`/room/${movie._id}`}><i className="far fa-play-circle"></i></Link></ span>

                <span className="movie-btn" onClick={()=>{this.toggleFavoriteList(movie)}}>
                  {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                  <Link><i className="fas fa-plus"></i>
                  </Link>:
                  <Link><i className="fas fa-check"></i></Link>
                }
                </ span>
              </div>}
  
                <div className="rate-container">
                  <div><i className="far fa-eye"></i>{movie.viewersNumber?movie.viewersNumber: Math.floor(Math.random() * (200 - 50) + 50)}</div>
                  ⭐ {this.avgReview(movie)}/10
                </div>
        </div>

        {this.state.showComponent ? <LoginModal onOpenModal={this.onOpenModal}/> : null}

      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.movie.favoriteList,
    loggedInUser: state.user.loggedInUser,
  }
}
const mapDispatchToProps = {
  toggleFavUserList
}
export const MoviePreview = connect(mapStateToProps, mapDispatchToProps)(_MoviePreview)