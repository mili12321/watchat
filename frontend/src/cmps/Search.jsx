import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'

class _Search extends Component {

    state = {
        filterBy: {
            search: '',
            minYear: -Infinity,
            maxYear: Infinity,
            type: 'All'
        },
    }

    componentDidMount() {
        this.props.loadMovies(this.state.filterBy)
    }



    handleInputs = (ev) => {
        const field = ev.target.name
        let value = ev.target.value
        if(value){
            this.props.toggleView('FilteredMovie')
        }else{
            this.props.toggleView('main') 
        }

        this.setState({ ...this.state, filterBy: { ...this.state.filterBy, [field]: value } }, () => {
                this.props.loadMovies(this.state.filterBy)
        })
    }

    onClearSearch=()=>{
        this.inputField.value = ""
        this.props.toggleView('main')
    }

    render() {
        return (
            <React.Fragment> 
               {this.props.searchingValue==="movie"&&<form className="navlink-search">
                    <div className="search-input-container">
                        <input placeholder="Search Movie" name="search" autoComplete="off" onChange={ this.handleInputs} type="search"  
                        ref={input => this.inputField = input}
                        onFocus = {() =>  this.inputField.value = ""}
                        />
                        <div className="search" onClick={()=>{this.onClearSearch()} } ></div>
                    </div>
                </form>}

                {this.props.searchingValue==="user"&&
                    <form className="navlink-search" >
                        <div className="search-input-container">
                            <input onChange={this.props.handleInput} type="search"  name="name" autocomplete="off" placeholder="Search user" ref={input => this.inputField = input}
                            onFocus = {() =>  this.inputField.value = ""}
                            />
                        <div className="search" onClick={()=>{this.props.onClearInput('')}}></div>
                        </div>
                    </form>}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        movies: state.movie.movies,
        loggedInUser: state.user.loggedInUser,
    }
}
const mapDispatchToProps = {
    loadMovies,
}
export const Search = connect(mapStateToProps,mapDispatchToProps)(_Search)