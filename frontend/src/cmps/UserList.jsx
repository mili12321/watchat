import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IoIosPerson } from 'react-icons/io'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Toolbar } from './Toolbar'
import { UsersCarousel } from './UsersCarousel'
import { MobileToolbar } from './MobileToolbar'
import {
  loadUsers
} from '../store/actions/userActions'

export class _UserList extends Component {
  state = {
    currPage: 0,
    currSearch:''
  }


  getUsersForDisplay = () => {
    let numOfUsers = 4
    const myUserIdx = this.props.users.findIndex(
      (user) => user._id === this.props.currUser._id
    )
    if (myUserIdx > 0) {
      this.props.users.splice(myUserIdx, 1)
      this.props.users.unshift(this.props.currUser)
    }
    const width = parseInt(window.innerWidth)
    if (width <= 500) numOfUsers = 1
    if (width > 500 && width <= 900) numOfUsers = 2
    if (width > 900 && width <= 1100) numOfUsers = 3
    const startUser = this.state.currPage * numOfUsers
    const users = this.props.users.slice(startUser, startUser + numOfUsers)
    return users
  }

  onMoveRight = () => {
    if ((this.state.currPage + 1) * 4 < this.props.users.length) {
      this.setState(function (prevState) {
        return {
          currPage: prevState.currPage + 1,
        }
      })
    }
  }

  onMoveLeft = () => {
    if (this.state.currPage > 0)
      this.setState(function (prevState) {
        return {
          currPage: prevState.currPage - 1,
        }
      })
  }

  handleInput=(ev)=>{
    this.setState({ currSearch: ev.target.value })
  }
  onClearInput=(vlaue)=>{
    this.setState({ currSearch: vlaue})
  }
   

  getFileredUsersForDisplay(){
    if(this.state.currSearch){
      return this.props.users.filter(user =>
            user.username.toLowerCase().includes(this.state.currSearch.toLowerCase())
          )
    }else{
      return this.props.users
    }
  }



  render() {
    const users = this.getFileredUsersForDisplay()
    return (
      <div className={`
      user-list-container 
      ${window.innerWidth>813?this.props.fullScreenChatBackground():""}
      ${this.props.isVisible?"show-user-list-animation":"hide-user-list-animation"}
      `}>
        <div className="watch-room-users-container">
          <UsersCarousel 
          users={users}
          gift={this.props.gift} 
          sendGift={this.props.sendGift}
          socketInfo={this.props.socketInfo}
          currUser={this.props.currUser}
          onUsernameSelect={this.props.onUsernameSelect}
          />
        </div>
        <input onChange={this.handleInput} type="text"  name="name" autocomplete="off" placeholder="Search user" className="search-user-input"/>
        <MobileToolbar 
        onShare={this.props.onShare} 
        movie={this.props.movie} 
        users={users} 
        handleInput={this.handleInput} 
        onClearInput={this.onClearInput}
        onGoBack={this.props.onGoBack}/>
        <Toolbar 
        onShare={this.props.onShare} 
        movie={this.props.movie} 
        fullScreenChatBackground={this.props.fullScreenChatBackground}
        isFullScreen={this.props.isFullScreen}
        toggleFullScreen={this.props.toggleFullScreen}
        onGoBack={this.props.onGoBack}
        />
        <div className={`user-list ${this.props.fullScreenChatBackground()}`}>
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={this.state.currPage}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false)
              }}
              classNames='fade'>
              <div className='users-container'>
                {this.getUsersForDisplay().length < 1 ? (
                  <h1>Loading...</h1>
                ) : (
                  <UsersCarousel 
                  users={users}
                  gift={this.props.gift} 
                  sendGift={this.props.sendGift}
                  socketInfo={this.props.socketInfo}
                  currUser={this.props.currUser}
                  onUsernameSelect={this.props.onUsernameSelect}
                  />
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
          <span className='total-users'>
            <IoIosPerson size='15px' color='white' /> {this.props.users.length}
          </span>
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
const mapDispatchToProps = {
  loadUsers,
}
export const UserList = connect(mapStateToProps,mapDispatchToProps)(_UserList)