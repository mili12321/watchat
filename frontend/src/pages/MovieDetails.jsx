import React, { Component } from 'react'
import { movieService } from '../services/movieService.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateMovie} from '../store/actions/movieActions.js'
import {updateUser} from '../store/actions/userActions.js'
import {ReviewModal} from '../cmps/ReviewModal'
import { toggleFavUserList } from '../store/actions/userActions'
import { LoginModal } from '../cmps/LoginModal';

class _MovieDetails extends Component {
  state = {
    movie: null,
    showComponent: false,
    showReviewComponent: false,
    favoriteBtn:false,
    reviewToEdit: {
      txt: '',
      byUser: '',
      rating : '',
    },
    isRate:false,
    activeRateCount:0,
    prevActiveRateCount:0,
    fullDescription:false,
    innerHeight:null,
    innerWidth:null
  }

  componentDidMount() {
    this.loadMovie()
    window.scrollTo(0, 0);
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  };

  async loadMovie() {
    const movieId = this.props.match.params.id
    const movie = await movieService.getById(movieId)
    this.setState({ movie })
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    if(this.props.loggedInUser){
      this.setState(prevState => ({
        reviewToEdit: {
          ...prevState.reviewToEdit,[name]: value, byUser: this.props.loggedInUser.username
        }
      }));
    }else{
      this.setState(prevState => ({
        reviewToEdit: {
          ...prevState.reviewToEdit,[name]: value, byUser: 'GUEST'
        }
      }));
    }
  };

  updateMovie = ev => {
    ev.preventDefault();
    if(!this.state.reviewToEdit.rating){
      console.log(" rating required")
      this.setState({isRate:true})
      return 
    }else{
      this.state.movie.reviews.push(this.state.reviewToEdit)
      this.props.updateMovie(this.state.movie);
      this.setState({ reviewToEdit: { txt: '' } });
      this.onOpenReviewModal()
    }
  };

  renderTitleColor(title) {
    switch(title) {
      case "The Equalizer":
        return 'dark-title-on-background';
      case "The last stand":
        return 'dark-title-on-background';
      default:
        return 'light-title-on-background';
    }
  }

  renderInfoColor(title) {
    switch(title) {
      case "The Equalizer":
        return 'dark-info-on-background';
      case "The last stand":
        return 'dark-info-on-background';
      case "X-Men: Apocalypse":
        return 'dark-info-on-background';
      case "Hellboy":
        return 'dark-info-on-background';
      default:
        return 'light-info-on-background';
    }
  }

  avgReview=()=>{
    let sumReviews =0
    let avg= 0
    let ratingCount = 0
    if(this.state.movie.reviews){
      this.state.movie.reviews.forEach(review=>
        {  
          if(review.rating){
            sumReviews += parseInt(review.rating)
            ratingCount ++}
          }
         
        )
        avg = sumReviews/ratingCount
        return avg.toFixed(1)
    }else{
      return 0
    }
  }

  isFavoriteMovie=(movie)=>{
    if(this.props.loggedInUser&&this.props.loggedInUser.favMovies.find(_movie=> _movie._id === movie._id  )){
      return "favoriteBtnStyle"
    }else{
      return ""
    }
  }

  
  toggleFavoriteList=(movie)=>{
    if(this.props.loggedInUser){
      this.props.toggleFavUserList(this.props.loggedInUser,movie)
    }else{
      this.onOpenModal()
    }
  }
  onOpenModal=()=>{
    this.setState({
        showComponent: !this.state.showComponent
      });
  }
  
  onOpenReviewModal=()=>{
    this.setState({
      showReviewComponent: !this.state.showReviewComponent
      });
    this.setState({activeRateCount:0})
  }

  selectRate=(rate)=>{
    this.setState({prevActiveRateCount:this.state.activeRateCount},()=>{
    })
    this.setState({reviewToEdit:{...this.state.reviewToEdit, rating:rate}})
    this.setState({activeRateCount:rate},()=>{
      console.log("activeRateCount:",this.state.activeRateCount)
    })
    this.setState({isRate:false})
  }


  getRatingActiveStars=()=>{
    let content = [];
    for (let i = 1; i <= this.state.activeRateCount; i++) {
      content.push(
        <i key={i} 
        className={`fa fa-star rating-star star${i} rating-active`} 
        onClick={()=>{this.selectRate(i)}}  
        ></i>
      )
    }
    for (let i = this.state.activeRateCount+1; i < 11; i++) {
      content.push(
        <i key={i}
         className={`fa fa-star rating-star star${i} `} 
         onClick={()=>{this.selectRate(i)}}  
        ></i>
      )
    }
    return content;
  }


  backgroundImagePosition=(movie)=>{
    if(movie.title.includes("Ice Age 3")){
      return 'ice-age-img-position'
    }if(movie.title.includes("21 Bridges")){
      return 'bridges-img-position'
    }else{
      return
    }
  }
  
  onGetReviewTxt=(word)=>{
    if(word.length > 22){
      return 'word-break'
    }
  }
 
  longDescription=(desc)=>{
    if((desc.length>225&&this.state.innerWidth<415)||(desc.length>378&&this.state.innerHeight<415)){
      if(!this.state.fullDescription){
        return 'ellipsis-description'
      }else{
        return 'long-description'
      }
    }
  }

  overviewRef = React.createRef()

  toggleDescription=()=>{
    this.setState({fullDescription:!this.state.fullDescription},()=>{
      if(!this.state.fullDescription){
        this.overviewRef.current.scrollIntoView() 
      }
    })
  }



  render() {
    const { movie } = this.state

    if (!movie) return <div>Loading....</div>
    return (
      <React.Fragment>
        <div className='movie-details'>
          <div
            className={`details-hero-container  ${this.backgroundImagePosition(movie)}`}
            style={{
              backgroundImage: `url(${
                movie.wideCoverUrl ? movie.wideCoverUrl : ''
              })`,
            }}>
            <div className={`details-hero-info-container ${movie.title.length>27?'long-title':''}`}>
            <div className={`details-hero-title ${this.renderTitleColor(movie.title)} ${movie.title.length>27?'long-title':''}`}>{movie.title}</div>
            <div className={`details-hero-info ${this.renderInfoColor(movie.title)}`}>
                <div className='details year'>{movie.year}</div>
                <div className='details duration'>{movie.duration}</div>
              </div>
              <div className='details-hero-btns'>
                <Link to={`/room/${movie._id}`}>
                  <div className='details-hero-btn play-btn'>
                    Play
                  </div>
                </Link>
                <div className={`details-hero-btn my-list-btn ${this.isFavoriteMovie(movie)}`} onClick={()=>{this.toggleFavoriteList(movie)}}>
                  {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?<span className="list-btn-symble">+</span>:
                  <span className="list-btn-symble"><i className="fas fa-check"></i></span>}
                  <span> My List</span>
                </div>
              </div>
            </div>

            <div className='scenes-container'>
              {movie.scenesUrl.map((scene) => (
                <div
                  className='scene-img-container'
                  style={{ backgroundImage: `url(${scene})` }}></div>
              ))}
            </div>
          </div>
          <section className='details-more-info-section'>
            <div className='description-container'>
              <div className='overview-title' ref={this.overviewRef}>Overview</div>
              <div className='genres-title'>Genres</div>
              <div className={`overview-txt ${this.longDescription(movie.description)}`}>
                <p className={`overview-description ${this.state.fullDescription?'open':''}`}>{movie.description}</p>
              </div>
              <div className='genres-txt'>
                {movie.genres.map((genre) => (
                  <div>{genre}</div>
                ))}
              </div>
            </div>

          {
         ((this.state.innerWidth<414&&movie.description.length>225)||(movie.description.length>378&&this.state.innerHeight<415))&&
          <div className="toggle-long-description" onClick={(this.toggleDescription)}>{!this.state.fullDescription?'Read More':'Read Less'}
          </div>}

            <div className='cast-continer'>
              <div className='cast-title'>Cast</div>
              <div className="actors">
              {movie.cast.map((actor, idx) => (
                <div className={`actor-container actor-${idx + 1}`}>
                  <img className='actor-img' src={`${actor.img}`} alt='' />
                  <div className='actor-info-container'>
                    <div className='actor-name'>
                      <span>{actor.name.split(" ")[0]}</span>
                      <span> {actor.name.split(" ")[1]}</span>
                    </div>
                    <div className='actor-character'>{actor.character}</div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>
          <section className='reviews-container'>
              <div className='reviews-title'>
             
             <div>
             <div>Reviews</div>
                <div className='reviews-count' >({movie.reviews ? movie.reviews.length : 0} Reviews)</div>
             </div>
                <div className="number-style avg-number">
                ⭐
                {this.avgReview()}/10
                </div>
               
              <button className="colorful-button dark add-review-btn" onClick={this.onOpenReviewModal}>
                  <div className="wrapper">
                      <span>Add Review</span>
                      <div className="circle circle-12"></div>
                      <div className="circle circle-11"></div>
                      <div className="circle circle-10"></div>
                      <div className="circle circle-9"></div>
                      <div className="circle circle-8"></div>
                      <div className="circle circle-7"></div>
                      <div className="circle circle-6"></div>
                      <div className="circle circle-5"></div>
                      <div className="circle circle-4"></div>
                      <div className="circle circle-3"></div>
                      <div className="circle circle-2"></div>
                      <div className="circle circle-1"></div>
                  </div>
              </button>

              </div>

            <div className='reviews-section'>


            {this.state.showReviewComponent?
            <ReviewModal onOpenModal={this.onOpenReviewModal} updateMovie={this.updateMovie}>
             <div className="form-container">
             <div className="form-title">Your Rating</div>

                <div className="rating-star-section">
                {this.getRatingActiveStars()}
                </div>

                {this.state.isRate&&<div className="rate-msg"><i className="fas fa-exclamation"></i> Please select rate</div>}
                <div  className="form-title">Your Review</div>
              <textarea  className="review-textarea" placeholder="Give us some detail about what you liked and disliked about the movie" cols="30" rows="5"
                name="txt"
                onChange={this.handleChange}
                value={this.state.reviewToEdit.txt}
              ></textarea>
             </div>
            </ReviewModal>
           :null}

                {movie.reviews&&movie.reviews.map(review => (
                <table className="reviews-table">
                  <tr className="reviews-tr">
                    <th className="reviews-th th-letter" >{review.byUser?review.byUser.substring(0, 1):"Guest".substring(0, 1)}</th>
                     <th className="reviews-th th-name">
                       <div>
                          <span className='reviews-th-name'>{review.byUser?review.byUser: "Guest"}</span>
                          <span>
                            ⭐
                            {review.rating}/10
                          </span>

                       </div>
                    </th>
                  </tr>
                  <tr className="reviews-tr">
                    <td className="reviews-td"></td>
                    <td className="reviews-td">
                      <div className={`td-txt`}>
                        {/* {review.txt} */}
                        {review.txt.split(' ').map(word=>
                          <span className={this.onGetReviewTxt(word)}>
                            {word}
                            <span> </span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                </table>
                ))}

            </div>

          </section>
       
        </div>

        {this.state.showComponent ? <LoginModal onOpenModal={this.onOpenModal}/> : null}
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loggedInUser: state.user.loggedInUser,
    favoriteList: state.movie.favoriteList,
    reviews: state.review.reviews,
  }
}

const mapDispatchToProps = {
  toggleFavUserList,
  updateMovie,
  updateUser
};


export const MovieDetails = connect(mapStateToProps,mapDispatchToProps)(_MovieDetails)

