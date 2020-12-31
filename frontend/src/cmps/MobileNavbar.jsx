import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import {Search} from './Search'

class _MobileNavbar extends Component {
    state ={
        showComponent: false,
        color: '',
        active: ""
    }
    
    componentDidMount() {
        this.setState({ active: 'home' })
    }
    componentWillUnmount(){
        this.setState({ active: '' })
    }

 
    changeToActiveBtn(name) {
        this.setState({ active: name })
        this.props.toggleView('main')
    }
    hideNavbar=()=>{
        if(this.props.history.location.pathname.includes('/room')){
            return "hide-mobile-navbar"
        }else{
            return "" 
        }
    }
   
    render() {
    return (
        <React.Fragment>
            <div className={`mobile-navbar ${this.hideNavbar()}`}>

          <div className="navbar-btns">
          <div className={`home nav-column ${this.state.active === 'home' ? 'active-navLink' : ''}` }><NavLink className={`navlink-btn  `}  to="/" onClick={()=>{this.changeToActiveBtn('home') }}><i className="fas fa-home"></i>Home</NavLink></div>
            <div className={`about nav-column ${this.state.active === 'about' ? 'active-navLink' : ''}`}><NavLink className="navlink-btn" to="/about" onClick={()=>{this.changeToActiveBtn('about') }}><i className="fas fa-info-circle"></i>About</NavLink></div>
            <div className={`movies nav-column ${this.state.active === 'movie' ? 'active-navLink' : ''}`}><NavLink className="navlink-btn" to="/movies" onClick={()=>{this.changeToActiveBtn('movie') }}><i className="fas fa-film"></i>Movies</NavLink></div>
          </div>

          <Search className="navlink-search nav-column" toggleView={this.props.toggleView} searchingValue={"movie"}/>



            </div>
        </React.Fragment>
    )
}
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser, 
        users: state.user.users,
    }
}
const mapDispatchToProps = {
    logout
}
export const MobileNavbar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MobileNavbar))