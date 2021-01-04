import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
import { MovieList } from '../cmps/MovieList'
import { FilteredMovie } from '../cmps/FilteredMovie'
import { MovieFilter } from '../cmps/MovieFilter'
import { logout } from '../store/actions/userActions'

class _Movie extends Component {
    state = {
        filterBy: {
          search: '',
          minYear: -Infinity,
          maxYear: Infinity,
          type: 'All',
        },
        currView: 'MovieList',
        currGenre: 'All',
        currSearch: '',
        appCondition: false,
    }

    DynamicCmp(props) {
        switch (props.currView) {
            case 'MovieList':
                return <MovieList { ...props } />
            case 'FilteredMovie':
                return <FilteredMovie { ...props } />
            default:
                return <h1>Something went wrong</h1>
        }
    }
    
    cmpMap = {
        MovieList: MovieList,
        FilteredMovie: FilteredMovie
    }

    toggleView = newView => {
        this.setState({ currView: newView })
    }
    
    componentDidMount(){
        const currCategory = this.props.match.params.category
        console.log("currCategory", currCategory)
        this.currGenre(currCategory)
        if(currCategory){
            this.toggleView('FilteredMovie')
        }
        window.scrollTo(0, 0);
    }

    currGenre=(name)=>{
        this.setState({ currGenre: name })
    }

    currSearch=(val)=>{
        this.setState({ currSearch: val })
    }
    

    render() {
        const { movies } = this.props
        const { currView } = this.state
        const DynamicCmp = this.cmpMap[currView]
        const currCategory = this.props.match.params.category
        if (!movies) return <div>Loading....</div>
        return (
              <div className="movies-page">
                <MovieFilter toggleView={this.toggleView} currGenre={this.currGenre} currSearch={this.currSearch} currCategory={currCategory}/>
                <div className="main-section">
                    <DynamicCmp currView={ currView } movies={movies} currGenre={this.state.currGenre} currSearch={this.state.currSearch} appCondition={this.state.appCondition}/>
                </div>
              </div>
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
  export const Movie = connect(mapStateToProps, mapDispatchToProps)(_Movie)