import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { movieService } from '../services/movieService'
import { socketService } from '../services/socketService'
import { Chat } from '../cmps/Chat'
import { VideoControls } from '../cmps/VideoControls'
import { MovieLoader } from '../cmps/MovieLoader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {updateMovie} from '../store/actions/movieActions.js'

// let lastPress = 0;
export class _Room extends Component {
  state = {
    movie: null,
    showVideo: false,
    volume: 0.2,
    currTime: 1,
    timeSet: false,
    currUser: null,
    isFullScreen:false,
    showParticles:true,
    isVisible:true,
    isChatVisible:true,
    startX:0,
    startY:0,
    endX:0,
    endY:0,
    showEmojis: false,
    duration: null,
    played:null,
    secondsElapsed: null,
    notFirstUser:false,
    newUser:{},
    allowedToJoin:false,
    request:false,
    isFirstUser:false,
    firstUser:{},
    isPlaying:true,
    disableToggleUserList:false,
    stopToggleUserList:false,
    newUserFromBackend:{},
    playBtnMsg:null
  }

  playerRef = React.createRef()
 
  componentDidMount() {
    this.loadMovie()
    this.setState({ currUser: this.props.loggedInUser })
    socketService.setup()
    socketService.on('get-first-user', (data) => {
      this.setState({isFirstUser:data.isFirstUser})
    })
    socketService.on('sending-request-for-approval', (data) => {
      socketService.emit('sending-currTime-to-user',{newUser:data.newUser,currTime:this.state.currTime})
    })
    socketService.on('toggle-play-btn', (data) => {
      this.setState({isPlaying:data.isPlaying},()=>{
        if(!data.isPlaying){
          this.setState({playBtnMsg:`${data.currUserName} pause the movie`})
        }else{
          this.setState({playBtnMsg:`${data.currUserName} resume the movie`})
        }
      })
    })
    if (!this.state.showVideo) {
      setTimeout(() => {
        this.setState({ showVideo: true })
      }, 6500)
    }
  }


  onTogglePlay=()=>{
    this.setState({isPlaying:!this.state.isPlaying},()=>{
      socketService.emit('toggle-play-btn', {isPlaying:this.state.isPlaying,currUserName:this.state.currUser?this.state.currUser.username:'guest'}) 
    })
  }

  playBtnMsg=()=>{
    setTimeout(() => {
      this.setState({ playBtnMsg: null })
    }, 2000)
    return this.state.playBtnMsg 
  }


  onAddNewUser=(users, newUser, firstUser)=>{
    if(newUser._id===firstUser._id){
      this.setState({ allowedToJoin: true })
      this.setState({firstUser:firstUser})
      this.setState({isFirstUser:true})

      this.setState({newUserFromBackend:newUser})
      this.setState({currUser:newUser},()=>{
      })
    }else{
      this.setState({isFirstUser:false})
      this.setState({ allowedToJoin: false })
      firstUser&&socketService.emit('get-first-user', firstUser)
      firstUser&&socketService.emit('sending-request-for-approval', {newUser,firstUser})
      socketService.on('sending-currTime-to-user', (data) => {
        this.setState({currTime:data.currTime})
        this.setState({ allowedToJoin: true })
      })
    }
  }

  onDuration = (duration) =>{
    this.setState({duration})
  }

  onProgress=(progress)=>{
    if(!this.state.isPlaying)return
    if(this.state.isFirstUser){
      let player = this.playerRef.current
        if (player && !this.state.timeSet&&this.state.allowedToJoin ) {
          if(this.state.currTime===0){
            this.setState({ currTime: 1 })
          }
          player.seekTo(this.state.currTime, 'seconds')
          this.setState({ timeSet: true })
      }
      if(!this.state.duration) return
      const secondsElapsed = progress.played * this.state.duration
      if(secondsElapsed!==this.state.secondsElapsed){
        this.setState({ currTime:secondsElapsed })
      }
    }else{
      this.onGetCurrTime()
      if(!this.state.duration) return
      const secondsElapsed = progress.played * this.state.duration
      if(secondsElapsed!==this.state.secondsElapsed){
        this.setState({ currTime:secondsElapsed })
      }
    }
  } 


  onGetCurrTime=()=>{
    let player = this.playerRef.current
      if (player && !this.state.timeSet&&this.state.allowedToJoin ) {
        player.seekTo(this.state.currTime, 'seconds')
        this.setState({ timeSet: true })
      }
  }


  onPlaying=()=>{
    if(this.state.currTime){
      return true
    }else{
      return false
    }
  }

  componentWillUnmount() {
    this.setState({ isPlaying: true })
  }

  async loadMovie() {
    const movieId = this.props.match.params.id
    const movie = await movieService.getById(movieId)
    this.setState({ movie })
  }

  onVolumeChange = (newVolume) => {
    this.setState({ volume: newVolume })
  }

  onMovieReady = () => {
    let player = this.playerRef.current
    if(player && this.state.allowedToJoin){
      player.seekTo(this.state.currTime)
    }
  }

  toggleEmojis = () => {
    this.setState({ showEmojis: !this.state.showEmojis })
  }

  hideEmojis = () => {
    this.setState({ showEmojis: false })
  }



  // full sceen classes 
  toggleFullScreen=()=>{
    if(window.innerWidth<813){
      this.setState({isFullScreen:false})
    }else{
      this.setState({isFullScreen:!this.state.isFullScreen})
    }
  }
  fullScreenWatchRoom=()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-watch-room" 
    }else{
        return "" 
    }
  }
  fullScreenChat=()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-chat" 
    }else{
        return "" 
    }
  }  
  
  fullScreenMsg=()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "" 
    }else{
        return "" 
    }
  }

  fullScreenInput=()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-chat-input" 
    }else{
        return "" 
    }
  }
  fullScreenChatBackground =()=>{//.user-list-container, .chat <div className="">     </div>chat-window
    if(window.innerWidth>813&&this.state.isFullScreen){
        this.setState({showParticles:false})
        return "chat-background" 
    }else{
        this.setState({showParticles:true})
        return "" 
    }
  }
  fullScreenRoomWindow=()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-room-window" 
    }else{
        return "" 
    }
  }    

  fullScreenFrame =()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-frame" 
    }else{
        return "" 
    }
  }

  fullScreenIframe =()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-iframe" 
    }else{
        return "" 
    }
  }

  fullScreenControlPanel =()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-control-panel" 
    }else{
        return "" 
    }
  }

  fullScreenMessageMe =()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-message-me" 
    }else{
        return "" 
    }
  }
  fullScreenMessageUser =()=>{
    if(window.innerWidth>813&&this.state.isFullScreen){
        return "fullScreen-message-user" 
    }else{
        return "" 
    }
  }

  onGoBack=()=>{
    this.props.history.goBack()
  }
  

  handleTouchStart=(ev)=>{
    const x = ev.targetTouches[0].clientX
    const y = ev.targetTouches[0].clientY
    this.setState({startX:x})
    this.setState({startY:y})
  }

  handleTouchMove=(ev)=>{
    const x = ev.targetTouches[0].clientX
    const y = ev.targetTouches[0].clientY
    this.setState({endX:x})
    this.setState({endY:y})

    const {startX,endX,startY,endY} = this.state
    if (window.screen.width>415&&startX - endX > 75&&endY-startY<10) {
        this.setState({isChatVisible:false})
    }

    if (startX - endX < -75&&endY-startY<10) {
      this.setState({isChatVisible:true})
    }
  }

  //double press
  // onToggleUserList=()=>{
  //   if(window.screen.width<415)return
  //   const time = new Date().getTime();
  //   const delta = time - lastPress;

  //   const DOUBLE_PRESS_DELAY = 200;
  //   if (delta < DOUBLE_PRESS_DELAY) {
  //     // Success double press
  //     this.setState({isVisible:!this.state.isVisible})
  //   }
  //   lastPress = time;
  // }


  onToggleDisableToggleUserList=()=>{
    this.setState({disableToggleUserList:!this.state.disableToggleUserList})
  }
  onDisableToggleUserList=()=>{
    this.setState({stopToggleUserList:true})
  }
  onAnabelToggleUserList=()=>{
    setTimeout(()=>{this.setState({stopToggleUserList:false}) }, 500);
  }
  onChangeDisableToggleUserList=()=>{
    setTimeout(()=>{this.setState({disableToggleUserList:false}) }, 500);
  }

  onToggleUserList=()=>{
    if(window.innerHeight>415&&window.innerWidth<415){
      this.setState({isVisible:true})
    }else if(this.state.stopToggleUserList||window.innerHeight>415||this.state.disableToggleUserList){
       return
    }else{
      this.setState({isVisible:!this.state.isVisible})
    }
  }

  onChangeUserListAndChatToVisible=()=>{
    this.setState({isVisible:true})
    this.setState({isChatVisible:true})
  }

  onUpdateMovieMsgList=(msg)=>{
    this.state.movie.msgList.push(msg)
    this.props.updateMovie(this.state.movie)
  }


  render() {
    if (!this.state.movie) return <div>Loading....</div>
    return (
      <React.Fragment>
      <div 
      className={`watch-room ${this.fullScreenWatchRoom()}`} 
      ref={node => { this.node = node; }}
      >

        <div className={`room-window ${this.fullScreenRoomWindow()}`}
            onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
        >
          <Chat
            roomId={this.state.movie._id}
            currUser={this.state.currUser}
            movie={this.state.movie}
            fullScreenChat={this.fullScreenChat}
            fullScreenChatBackground={this.fullScreenChatBackground}
            toggleFullScreen={this.toggleFullScreen}
            isFullScreen={this.state.isFullScreen}
            fullScreenMessageMe={this.fullScreenMessageMe}
            fullScreenMessageUser={this.fullScreenMessageUser}
            fullScreenMsg={this.fullScreenMsg}
            fullScreenInput={this.fullScreenInput}
            showParticles={this.state.showParticles}
            onGoBack={this.onGoBack}
            isVisible={this.state.isVisible}
            isChatVisible={this.state.isChatVisible}
            toggleEmojis={this.toggleEmojis}
            hideEmojis={this.hideEmojis}
            showEmojis={this.state.showEmojis}
            onAddNewUser={this.onAddNewUser}
            onUpdateFirstUser={this.onUpdateFirstUser}
            onToggleUserList={this.onToggleUserList}
            onChangeDisableToggleUserList={this.onChangeDisableToggleUserList}
            onToggleDisableToggleUserList={this.onToggleDisableToggleUserList}
            onDisableToggleUserList={this.onDisableToggleUserList}
            onAnabelToggleUserList={this.onAnabelToggleUserList}
            stopMovie = {this.stopMovie}
            onChangeUserListAndChatToVisible={this.onChangeUserListAndChatToVisible}
            updateMovie={this.props.updateMovie}
            onUpdateMovieMsgList={this.onUpdateMovieMsgList}
          />
     
          <section className={`frame ${this.fullScreenFrame()}`} >
            {!this.state.showVideo && <MovieLoader />}
            <div
              className={`video disabled player-wrapper ${
                this.state.showVideo ? '' : 'hide-video'
              }`}>
              <ReactPlayer
                className='react-player'
                ref={this.playerRef}
                url={this.state.movie.videoUrl}
                width='100%'
                height='100%'
                // muted={!this.state.showVideo}
                volume={this.state.volume}
                playing={this.onPlaying&&this.state.isPlaying}
                onDuration={this.onDuration}
                onProgress={this.onProgress}
              />
            </div>
            {this.state.newUserFromBackend&&<VideoControls
              onVolumeChange={this.onVolumeChange}
              volume={this.state.volume}
              toggleFullScreen={this.toggleFullScreen}
              isFullScreen={this.state.isFullScreen}
              fullScreenControlPanel={this.fullScreenControlPanel}
              onTogglePlay={this.onTogglePlay}
              isPlaying={this.state.isPlaying}
              currTime={this.state.currTime}
              onChangeDisableToggleUserList={this.onChangeDisableToggleUserList}
              onToggleDisableToggleUserList={this.onToggleDisableToggleUserList}
              newUser={this.state.newUserFromBackend}
            />}
            <div className='reaction'></div>
          </section>
        </div>
      </div>

      {(!this.state.isPlaying||!this.state.currTime)&&<div onClick={this.onTogglePlay} className="middle-play-btn">
        <i className="fas fa-play"></i>
      </div>}

      {this.state.playBtnMsg&&
      <div className={`play-btn-msg ${this.state.isPlaying?'palying':''}`}>{this.playBtnMsg()}</div>
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  }
}

const mapDispatchToProps = {
  updateMovie,
};


export const Room = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Room))
