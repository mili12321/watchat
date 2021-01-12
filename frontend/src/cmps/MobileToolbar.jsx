import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import {Search} from './Search'
import { connect } from 'react-redux'
import {
  IoMdShare,
  IoIosPerson,
} from 'react-icons/io'



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

            <div className='add-user toolbar-icon'>
                <a
                // href={'https://wa.me/?text='+encodeURIComponent(window.location.href)
                href={'whatsapp://send?text='+encodeURIComponent(window.location.href)} 
                target="_blank"
                rel="noopener noreferrer"
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