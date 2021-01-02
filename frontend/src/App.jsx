import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { Navbar } from './cmps/Navbar'
import { FilteredMovie } from './cmps/FilteredMovie'
import { FavoriteList } from './cmps/FavoriteList'
import { MobileNavbar } from './cmps/MobileNavbar'
import { connect } from 'react-redux'
import { toggleFavUserList } from './store/actions/userActions'
import  ScrollToTop  from './cmps/ScrollToTop'

class _App extends React.Component{
  state = {
    currView: 'main',
    currCmp: 'navFilter',
    appCondition: true,
    isClose:true,
    active: ''
  }
  removeFromFavList=(ev,movie)=>{
    ev.stopPropagation()
    if(this.props.loggedInUser){
      this.props.toggleFavUserList(this.props.loggedInUser,movie)
    }
  }

  toggleView = newView => {
    this.setState({ currView: newView })
  }

  changeAppActiveName = (name) => {
    this.setState({ active: name })
  }

  onToggleList = ()=>{
    this.setState({isClose:!this.state.isClose})
  }

  render() {
    const { currView, appCondition } = this.state
    const { movies, loggedInUser } = this.props
    return (
      <div className='App'>
        <header>
          <Navbar toggleView={this.toggleView} changeAppActiveName={this.changeAppActiveName}/>
        </header>
       { currView==="FilteredMovie"&&
          <FilteredMovie movies={movies} currCmp={this.state.currCmp} toggleView={this.toggleView} appCondition={appCondition}/>
       }
        {currView==="main"&&<main>
        <React.Fragment>
          <ScrollToTop />
          <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          ))}
          </Switch>
        </React.Fragment>
        </main>}
        <FavoriteList removeFromFavList={this.removeFromFavList} loggedInUser={loggedInUser} onToggleList={this.onToggleList} isClose={this.state.isClose}/>
        <MobileNavbar  toggleView={this.toggleView} active={this.state.active} changeAppActiveName={this.changeAppActiveName}/>

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
  toggleFavUserList
}
export const App = connect(mapStateToProps,mapDispatchToProps)(_App)