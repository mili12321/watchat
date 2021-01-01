import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
    
export class _EditorsMovies extends Component{
    componentDidMount(){
        this.props.loadMovies()
    }
    getMovies(value){
        
        switch(value) {
            case 'editors-adventure':
                return this.props.movies.filter(
                    (movie) =>
                      movie.title === 'X-Men: Dark Phoenix' ||
                      movie.title === 'Iorn-Man' ||
                      movie.title === 'Wrath of the Titans' ||
                      movie.title === 'Back to the Future' ||
                      movie.title === 'Hellboy' ||
                      movie.title === 'Avatar'
                  )
            //   return movies;
            case 'all-adventure':
                return this.props.movies.filter(
                    movie => movie.genres.includes('Adventure')
                  )
            //   return movies;
            case 'editors-action':
                return this.props.movies.filter(
                    (movie) =>
                      movie.title === 'Avengers: Endgame' ||
                      movie.title === 'Spider-Man: Far from Home' ||
                      movie.title === 'The Suicide Squad' ||
                      movie.title === 'The Batman' ||
                      movie.title === 'Iorn-Man' ||
                      movie.title === 'X-Men: Dark Phoenix' 

                  )
            //   return movies;
            case 'all-action':
                return this.props.movies.filter(
                    movie => movie.genres.includes('Action')
                  )
            //   return movies;
            case 'editors-horror':
                return this.props.movies.filter(
                    (movie) =>
                      movie.title === 'IT' ||
                      movie.title === 'Texas Chainsaw' ||
                      movie.title === 'A Nightmare on Elm Street 3: Dream Warriors' ||
                      movie.title === 'GRETEL & HANSEL' ||
                      movie.title === 'Zombieland: Double Tap' ||
                      movie.title === 'Crawl'
                  )
            //   return movies;
            case 'all-horror':
                return this.props.movies.filter(
                    movie => movie.genres.includes('Horror')
                  )
            //   return movies;
            default:
              return '';
        } 
    }
    render() {

        const movies = this.getMovies(this.props.match.params.category)
        if (!movies) return <div>Loading....</div>
        return (
            <div className="editors-movies-page" id='top'>
                <div>
                    {movies.map((movie,idx)=>
                    <div  className={`movie-card ${'direction-'+(idx%2 ? 'r':'l')}`}>
                        <div className={`container `}>
                            <div className="img-container">
                                <img src={`${movie.wideCoverUrl}`} alt=""/>
                                <div className="before-img"></div>
                            </div>
                            <div className="movie-details">
                                <div className="title">{movie.title}</div>
                                 <div className="description">{movie.description}</div>
                                 <div className="genres">{movie.genres.map(genre=>
                                    <span>{genre} </span>
                                )}</div>
                                
                                <div className="year">{movie.year} | 
                                <span > {movie.duration}</span>
                                </div> 
                                <Link to={`/movie/${movie._id}`}><div className="trailer-btn">More Info</div></Link>
                            </div>
                        </div>  
                    </div>
                    )}
                </div>
            </div>     
        )
    }
}
const mapStateToProps = (state) => {
    return {
      movies: state.movie.movies
    }
  }
  const mapDispatchToProps = {
    loadMovies
  }
  export const EditorsMovies = connect(mapStateToProps, mapDispatchToProps)(_EditorsMovies)
  
