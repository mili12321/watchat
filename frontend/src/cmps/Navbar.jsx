import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { Link } from "react-router-dom"
import { LoginModal } from './LoginModal';
import {Search} from './Search'
import { socketService } from '../services/socketService'
import { movieService } from '../services/movieService'
import { UserModal } from '../cmps/UserModal'

class _Navbar extends Component {
    state ={
        showComponent: false,
        showUserModal: false,
        color: '',
        active: "",
        movieId:''
    }
    listenScrollEvent = e => {
        if (window.scrollY > 400) {
          this.setState({color: 'rgba(0, 0, 0, 0.666)'})
        } else {
          this.setState({color: ''})
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
        this.setState({ active: 'home' })
        this.loadMovie()
    }
    componentWillUnmount(){
        this.setState({ active: '' })
    }


    async loadMovie() {
        const movieId = this.props.history.location.pathname.split("/")[2]
        this.setState({movieId})
        const movie = await movieService.getById(movieId)
        console.log("movie:",movie)
    }


    onOpenModal=()=>{
        this.setState({
            showComponent: !this.state.showComponent
          });
    }
    onOpenUserModal=()=>{
        this.setState({
            showUserModal: !this.state.showUserModal
          });
    }
    changeToActiveBtn(name) {
        this.setState({ active: name })
        this.props.toggleView('main')
    }
    logout=()=>{
        if(this.props.history.location.pathname==='/user'){
            this.props.history.push('/')
            this.props.logout()
        }else if(this.props.history.location.pathname.includes('/room')){
            console.log("movie id",this.props.history.location.pathname.split("/")[2])
            this.props.logout()
            socketService.emit('chat room', {
                roomId: this.props.history.location.pathname.split("/")[2],
                user: null,
            })
        }else{
            this.props.logout()
        }
    }

    hideNavbar=()=>{
        if(this.props.history.location.pathname.includes('/room')){
            return "hide-navbar"
        }else{
            return "" 
        }
    }


   onActiveBtnAndToggleView=()=>{
        this.props.toggleView('main') 
        this.changeToActiveBtn('home')
        this.props.changeAppActiveName('home')
        window.scrollTo(0, 0);
   }



    render() {
    const { loggedInUser} = this.props
    return (
        <React.Fragment>
        <nav className={`main-nav after-canvas ${this.hideNavbar()}`}  style={{backgroundColor: this.state.color}}>
           <div className="nav-container">
           <div className="links-container">
                <div className={`home nav-column ${this.state.active === 'home' ? 'active-navLink' : ''}` }>
                <NavLink className={`navlink-btn  `}  to="/" onClick={()=>{this.changeToActiveBtn('home') }}>Home
                </NavLink>
                </div>
                <div className={`about nav-column ${this.state.active === 'about' ? 'active-navLink' : ''}`}>
                <NavLink className="navlink-btn" to="/about" onClick={()=>{this.changeToActiveBtn('about') }}>About</NavLink>
                </div>
                <div className={`movies nav-column ${this.state.active === 'movie' ? 'active-navLink' : ''}`}>
                <NavLink className="navlink-btn" to="/movies" onClick={()=>{this.changeToActiveBtn('movie') }}>Movies</NavLink>
                </div>
           </div>

            <span className="main-title nav-column">
                <Link className="logo" to={`/`} onClick={()=>{this.onActiveBtnAndToggleView() }}>
                    <div className="WatChat-logo">WatChat</div>
                </Link>
                <div className="under-logo">- online cinema -</div>
            </span>

           <div className="login-and-serach-section">
                <Search className="navlink-search nav-column" toggleView={this.props.toggleView} searchingValue={"movie"}/>
       
                <div className="user-container nav-column">
        
                    {loggedInUser === null && <div className="user-login  after-canvas" onClick={this.onOpenModal}>Log in</div>}
      
                    <div className="user-details-container">
                        {loggedInUser && <div className="user-name">Hello {loggedInUser.username}</div>}
                        {loggedInUser &&<div id="logout-btn" onClick={this.logout}>Logout</div>}
                    </div>
                    { loggedInUser && loggedInUser.avatar &&
                    <div  className="user-details-btn userImg">
                        <div className="user-img" style={{ backgroundImage: `url(${loggedInUser.avatar})` }} onClick={this.onOpenUserModal}></div>
                    </div>
              
                    }
                   
                </div>
           </div>
            
           </div>
         
        </nav>
        {this.state.showComponent ? <LoginModal onOpenModal={this.onOpenModal}/> : null}

        {this.state.showUserModal ? <UserModal onOpenUserModal={this.onOpenUserModal}/> : null}
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
    logout,
}
export const Navbar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Navbar))