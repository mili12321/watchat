import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
import { logout } from '../store/actions/userActions'
import { CinemaCard } from '../cmps/CinemaCard'
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles
import { FaRegEye } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { BsArrowUp } from 'react-icons/bs'
import { toggleFavUserList } from '../store/actions/userActions'
import { HeroCarousel } from "../cmps/HeroCarousel";
import { Carousel } from "../cmps/Carousel";
import { LoginModal } from '../cmps/LoginModal';
import { NewMoviesCarousel } from '../cmps/NewMoviesCarousel';

import { HashLink as Link } from 'react-router-hash-link'

class _Home extends Component {
  state = {
    filterBy: {
      search: '',
      minYear: -Infinity,
      maxYear: Infinity,
      type: 'All',
    },
    showComponent: false,
    innerWidth:null,
    desktopExample: null
  }
  componentDidMount() {
    this.props.loadMovies(this.state.filterBy)
    AOS.init({
      // initialise with other settings
      // duration : 2000
    })
    window.scrollTo(0, 0);
    window.addEventListener('resize', this.handleResize)
    if(window.innerWidth>414){
      this.setState({desktopExample:true})
    }else{
      this.setState({desktopExample:false})
    }
  }

  componentWillUnmount() {
    const filterBy = {
      search: '',
      minYear: -Infinity,
      maxYear: Infinity,
      type: 'All',
    }
    this.setState({ filterBy })
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize=()=>{
    this.setState({innerWidth: window.innerWidth})
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

  isFavoriteMovie=(movie)=>{
    if(this.props.loggedInUser&&this.props.loggedInUser.favMovies.find(_movie=> _movie._id === movie._id  )){
      return "favoriteBtnStyle"
    }else{
      return ""
    }
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
      this.props.toggleFavUserList(this.props.loggedInUser,movie)
    }else{
      this.onOpenModal()
    }
  }



  isFavoriteMovie=(movie)=>{
    if(this.props.loggedInUser&&this.props.loggedInUser.favMovies.find(_movie=> _movie._id === movie._id  )){
      return "favoriteBtnStyle"
    }else{
      return ""
    }
  }

  getHeroMoviesForDisplay(){
    return this.props.movies.filter(
      (movie) =>
      movie.title === 'Wrath of the Titans' ||
      movie.title === 'Guardians of the Galaxy' ||
      movie.title === 'Avengers: Endgame' ||
      movie.title === 'IT'
    );
  }

  onOpenModal=()=>{
    this.setState({
        showComponent: !this.state.showComponent
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.innerWidth !== this.state.innerWidth) {
      this.setState({innerWidth:window.innerWidth})
      if(window.innerWidth>414){
        this.setState({desktopExample:true})
      }else{
        this.setState({desktopExample:false})
      }
    }
  }



  render() {
    const { movies } = this.props
    const HeroMovies = this.getHeroMoviesForDisplay()
    if (!movies) return <div>Loading....</div>
    const watchRoomMovies = movies.filter(
      (movie) =>
        movie.title === 'X-Men: Dark Phoenix' ||
        movie.title === '21 Bridges' ||
        movie.title === 'Hellboy' ||
        movie.title === 'Avatar'
    )
    
    return (
      <React.Fragment>
        <div>
        </div>
        <div className='movie-app' id='top'>
          <div className='main-header-container'>
            {/* start of hero */}
            <div className='hero-slider'>
              <HeroCarousel 
              movies={HeroMovies} 
              toggleFavoriteList={this.toggleFavoriteList} 
              isFavoriteMovie={this.isFavoriteMovie}
              onOpenModal={this.onOpenModal}
              avgReview={this.avgReview}
              />
            </div>
            {/* end of hero */}
          </div>
          {/* end of main header container */}
          <div className='main-movies-section'>
            <div className='Streaming-section1' >
              <div>So How Does It Work...</div>
              <div className='explantion-btn' data-aos='fade-right'>
                <Link to='/#example'>
                  <button>Click Here</button>
                </Link>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className='live-cinema-section'>
         {this.state.desktopExample&&<div className='live-movie-example'>
                <div className='img-example'>
                  <img
                    className='laptop-blank'
                    src='assets/img/laptop-blank.png'
                    alt=''
                  />
                  <video className='home-video' loop autoPlay muted>
                    <source src='assets/img/video.mp4' type='video/mp4' />
                  </video>
                  <img
                    className='chat-img2'
                    src='assets/img/chat-img2.png'
                    alt=''
                  />
                </div>
                <div className='movie-example'>
                  <div className='main-title'>
                    <div>WATCH WHATEVER, TOGETHER</div>
                  </div>
                  <div className='main-title2'>
                    Connect with others who are as obsessed with your favorite
                    movies as you are. Come together for watch parties, chat
                    about your favorite shows and movies, and discover your next
                    binge.
                  </div>
                  <div className='title'>
                    <i> Streaming Live Now</i>
                  </div>
                </div>
              </div>}
               {!this.state.desktopExample&&<div className='live-section-title'>
                    <i> Streaming Live Now</i>
              </div>}
              <div className='live-rooms-container'>
                <div className='watch-container'>
                  {watchRoomMovies.map((movie,idx) => (
                    <div  key={idx}>
                      <div className='live-tag'>
                        <i>Live</i>
                      </div>
                      <CinemaCard className='watch-movie' movie={movie} />
                      <div className='watch-movie-details'>
                        <div
                          className={`title ${
                            movie.title.length > 11 ? 'ellipsis' : ''
                          }`}>
                          <div>{movie.title}</div>
                        </div>
                        <div className='details'>
                          {
                            <span 
                            className='details-genre'>
                              <i>{movie.genres[2]}</i>
                            </span>
                          }
                        </div>
                        <div>
                          <Link to={`/movie/${movie._id}`}>
                            <i className='fas fa-info-circle'></i>
                          </Link>
                        </div>
                        <div className='watching-details'>
                          <div>
                            <FaRegEye className='faRegEye icon-style' />
                            {movie.viewersNumber
                              ? movie.viewersNumber
                              : Math.floor(Math.random() * (2000 - 500) + 500)}
                          </div>
                          <div>
                            <AiFillStar className='icon-style'  />
                            {this.avgReview(movie)}/10
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* end of live cinema section */}

            <div className='new-movies'>
              <div className='movies-title'>
                New Movies in WatChat
              </div>
              {/* <div className='home-new-movies-container'>
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
                        <span className='movie-btn' onClick={()=>{this.toggleFavoriteList(movie)}}>
                        {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
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
                        ⭐ {this.avgReview(movie)}/10
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}

              {/* new movies carousel */}
              <NewMoviesCarousel 
              movies={movies}
              toggleFavoriteList={this.toggleFavoriteList} 
              isFavoriteMovie={this.isFavoriteMovie} 
              avgReview={this.avgReview}
              />

            </div>{/* end of new-movies */}
            <div className='top-movies'>
              <div className='movies-title'>TOP 10</div>
              <div className='home-top-movies-container'>
                <Carousel movies={movies} />
              </div>
            </div>

            <div className='editors-movies module-border-wrap'>
              <div className='editors-title'>EDITOR'S CHOICE</div>

              <div className='home-choices-container'>
                <div className='side-img-container2'>
                  <div></div>
                  <img className='img-hr10' src='assets/img/hr10.png' alt='' />
                  <div className='info-container'>
                    <Link to={`/editor-movies/editors-adventure/#top`} >
                    <div>
                      SEE ALL <span className='number-style'>6</span>
                    </div>
                    </Link>
                    <Link to={`/movies/Adventure`} >
                    <div>Adventure</div> 
                    </Link>
                  </div>
                </div>
                {movies.slice(8, 12).map((movie) => (
                  <div key={movie._id} className={`home-choice-container`}>
                     <Link to={`/movie/${movie._id}`} className='img-container'
                      style={{
                        backgroundImage: `url(${
                          movie.coverUrl ? movie.coverUrl : ''
                        })`,
                      }}>
                     </Link>
                    <div className='title-btns-container'>
                      <div
                        className={`title ${
                          movie.title.length > 11 ? 'ellipsis' : ''
                        }`}>
                        {movie.title}
                      </div>
                      <div className='btns-container'>
                        <Link to={`/movie/${movie._id}`}>
                          <span className='movie-btn movie-btn-details'>
                            <i className='fas fa-info-circle'></i>
                          </span>
                        </Link>
                        <Link to={`/room/${movie._id}`}>
                          <span className='movie-btn'>
                            <i className='far fa-play-circle'></i>
                          </span>
                        </Link>
                        <Link>
                          <span className='movie-btn' onClick={()=>{this.toggleFavoriteList(movie)}}>
                          {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                            <i className="fas fa-plus"></i>:
                            <i className="fas fa-check"></i>
                          }
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* {end of editors part 1} */}
            <div className='editors-movies2 module-border-wrap'>
              <div className='home-choices-container3'>
                <div className='side-img-container3'>
                  <div></div>
                  <img className='img-hr10' src='assets/img/hr12.png' alt='' />
                  <div className='info-container'>
                  <Link to={`/editor-movies/editors-action/#top`} >
                  <div>
                      SEE ALL <span className='number-style'>6</span>
                    </div>
                  </Link>
                  <Link to={`/movies/Action`} >
                  <div>Action</div>
                  </Link>
                    
                 
                  </div>
                </div>
                {movies.slice(12, 16).map((movie) => (
                  <div key={movie._id} className={`home-choice-container`}>
                       <Link to={`/movie/${movie._id}`} className='img-container'
                      style={{
                        backgroundImage: `url(${
                          movie.coverUrl ? movie.coverUrl : ''
                        })`,
                      }}></Link>

                    <div className='title-btns-container'>
                      <div
                        className={`title ${
                          movie.title.length > 11 ? 'ellipsis' : ''
                        }`}>
                        {movie.title}
                      </div>
                      <div className='btns-container'>
                        <Link to={`/movie/${movie._id}`}>
                          <span className='movie-btn movie-btn-details'>
                            <i className='fas fa-info-circle'></i>
                          </span>
                        </Link>
                        <Link to={`/room/${movie._id}`}>
                          <span className='movie-btn'>
                            <i className='far fa-play-circle'></i>
                          </span>
                        </Link>
                        <Link>
                          <span className='movie-btn' onClick={()=>{this.toggleFavoriteList(movie)}}>
                          {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                            <i className="fas fa-plus"></i>:
                            <i className="fas fa-check"></i>
                          }
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* end of rditors part 2 */}
            <div className='editors-movies2 module-border-wrap'>

              <div className='home-choices-container2'>
                <div className='side-img-container2'>
                  <div></div>
                  <img className='img-hr10' src='assets/img/hr13.png' alt='' />
                  <div className='info-container'>
                  <Link to={`/editor-movies/editors-horror/#top`} >
                  <div>
                      SEE ALL <span className='number-style'>6</span>
                    </div>
                  </Link>

                  <Link to={`/movies/Horror`} >
                  <div>Horror</div>
                  </Link>
                  </div>
                </div>
                {movies.slice(16, 20).map((movie) => (
                  <div key={movie._id} className={`home-choice-container`}>

                       <Link to={`/movie/${movie._id}`} className='img-container'
                      style={{
                        backgroundImage: `url(${
                          movie.coverUrl ? movie.coverUrl : ''
                        })`,
                      }}></Link>
                    <div className='title-btns-container'>
                      <div
                        className={`title ${
                          movie.title.length > 11 ? 'ellipsis' : ''
                        }`}>
                        {movie.title}
                      </div>
                      <div className='btns-container'>
                        <Link to={`/movie/${movie._id}`}>
                          {' '}
                          <span className='movie-btn movie-btn-details'>
                            <i className='fas fa-info-circle'></i>
                          </span>
                        </Link>
                        <Link to={`/room/${movie._id}`}>
                          <span className='movie-btn'>
                            <i className='far fa-play-circle'></i>
                          </span>
                        </Link>
                        <Link>
                          <span className='movie-btn' onClick={()=>{this.toggleFavoriteList(movie)}}>
                          {this.isFavoriteMovie(movie)!=="favoriteBtnStyle"?
                            <i className="fas fa-plus"></i>:
                            <i className="fas fa-check"></i>
                          }
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* end of editors part 3 */}






           { !this.state.desktopExample&&<div className='live-movie-example'>
                <div className='img-example'>
                  <img
                    className='laptop-blank'
                    src='assets/img/laptop-blank.png'
                    alt=''
                  />
                  <video className='home-video' loop autoPlay muted>
                    <source src='assets/img/video.mp4' type='video/mp4' />
                  </video>
                  <img
                    className='chat-img2'
                    src='assets/img/chat-img2.png'
                    alt=''
                  />
                </div>
                <div className='movie-example'>
                  <div className='main-title'>
                    <div>WATCH WHATEVER, TOGETHER</div>
                  </div>
                  <div className='main-title2'>
                    Connect with others who are as obsessed with your favorite
                    movies as you are. Come together for watch parties, chat
                    about your favorite shows and movies, and discover your next
                    binge.
                  </div>
                </div>
              </div>}








            <div>
              <div className='example-imgs' id='example'>
                <div className='example-img1'>
                  <div className='example-img' style={{
                        backgroundImage: `url(assets/img/example/choose-movie.jpg)`,
                      }}></div>
                  <div>choose a movie to stream</div>
                </div>
                <div className='example-img2'>
                <div className='example-img' style={{
                        backgroundImage: `url(assets/img/example/send-link.jpg)`,
                      }}></div>
        
                  <div>Send a link to your friends</div>
                </div>
                <div className='example-img3'>
                <div className='example-img' style={{
                        backgroundImage: `url(assets/img/example/watch-together.jpg)`,
                      }}></div>

                  <div>Watch and chat together</div>
                </div>
              </div>
            </div>
            <div className='got-to-top-button'>
              <Link to='/#top'>
                <button>
                  <BsArrowUp className='bsArrowUp' />
                </button>
              </Link>
              <span></span>
              <span></span>
            </div>
          </div>
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
    favoriteList: state.movie.favoriteList
  }
}
const mapDispatchToProps = {
  loadMovies,
  logout,
  toggleFavUserList
}
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
