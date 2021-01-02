import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import {Search} from './Search'
import { connect } from 'react-redux'
import {
  IoMdShare,
  IoIosPerson,
} from 'react-icons/io'
import { white } from 'material-ui/styles/colors';


export class _MobileToolbar extends Component {
    state ={
        showComponent: false,
        color: '',
        active: '',
        location:''
    }
    
    componentDidMount() {
        this.setState({ active: 'home' })
        this.setState({ location: window.location.href })
    }
    componentWillUnmount(){
        this.setState({ active: '' })
    }

 
    changeToActiveBtn(name) {
        this.setState({ active: name })
    }
  render() {
    return (
    <div className="mobile-toolbar">

        <div className="toolbar-btns">
            <div className={`home nav-column ${this.state.active === 'home' ? 'active-navLink' : ''}` }>
                <NavLink className={`navlink-btn toolbar-btn`}  to="/" onClick={()=>{this.changeToActiveBtn('home') }}>
                    <i className="fas fa-home"></i>
                </NavLink>
            </div>

            <div className='add-user toolbar-icon' onClick={this.props.onShare}>
                <div style={{color:white}}>{this.state.location}</div>
                <a
                href={`whatsapp://send?text=${window.location.href} 
                Watch ${this.props.movie.title} Together With Friends! ${this.state.location}
                `}
                data-action='share/whatsapp/share'
                // target='_blank'
                >
                    <IoMdShare size='25px' />
                </a>
            </div>

           <div className="toolbar-search">
                <Search searchingValue={"user"} 
                handleInput={this.props.handleInput}
                onClearInput={this.props.onClearInput}
                />
           </div>

            <div  className='total-users-mobile'>
                <IoIosPerson size='25px' color='white' />
                 {this.props.users.length}
            </div>

        </div>

    </div>
    )
  }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser, 
    }
}

export const MobileToolbar = connect(mapStateToProps)(withRouter(_MobileToolbar))