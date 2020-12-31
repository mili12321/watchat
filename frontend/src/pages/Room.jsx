import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { movieService } from '../services/movieService'
import { socketService } from '../services/socketService'
import { Chat } from '../cmps/Chat'
import { VideoControls } from '../cmps/VideoControls'
import { MovieLoader } from '../cmps/MovieLoader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';



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
    isPlaying:true

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
    socketService.on('toggle-play-btn', (isPlaying) => {
      this.setState({isPlaying})
    })
  }

  onTogglePlay=()=>{
    this.setState({isPlaying:!this.state.isPlaying},()=>{
      socketService.emit('toggle-play-btn', this.state.isPlaying)
    })

    
  }

  onAddNewUser=(users, newUser, firstUser)=>{
    if(newUser._id===firstUser._id){
      this.setState({ allowedToJoin: true })
      this.setState({firstUser:firstUser})
      this.setState({isFirstUser:true})
    }else{
      this.setState({isFirstUser:false})
      this.setState({ allowedToJoin: false })
      console.log("bbbbbbbbbbbbbbbbbb",firstUser)
      firstUser&&socketService.emit('get-first-user', firstUser)
      firstUser&&socketService.emit('sending-request-for-approval', {newUser,firstUser})
      socketService.on('sending-currTime-to-user', (data) => {
        this.setState({currTime:data.currTime})
        this.setState({ allowedToJoin: true })
      })
    }
  }

  onDuration = (duration) =>{
    console.log("onDuration:",duration)
    this.setState({duration})
  }

  onProgress=(progress)=>{
    if(!this.state.isPlaying)return
    if (!this.state.showVideo) {
          setTimeout(() => {
            this.setState({ showVideo: true })
          }, 6500)
        }
    if(this.state.isFirstUser){
      console.log("this.state.currTime",this.state.currTime)
      let player = this.playerRef.current
        if (player && !this.state.timeSet&&this.state.allowedToJoin ) {
          player.seekTo(this.state.currTime, 'seconds')
          this.setState({ timeSet: true })
      }
      if(!this.state.duration) return
      const secondsElapsed = progress.played * this.state.duration
      if(secondsElapsed!==this.state.secondsElapsed){
        this.setState({ currTime:secondsElapsed })
        console.log("currTime",secondsElapsed)
      }
    }else{
      this.onGetCurrTime()
      if(!this.state.duration) return
      const secondsElapsed = progress.played * this.state.duration
      if(secondsElapsed!==this.state.secondsElapsed){
        this.setState({ currTime:secondsElapsed })
        console.log("currTime",secondsElapsed)
      }
    }
  } 


  onGetCurrTime=()=>{
    console.log("this.state.currTime",this.state.currTime)
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
    this.setState({ currTime: 1 })
    this.setState({ interval: null })
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

  updateCurrTime = () => {
    socketService.emit('timestamp', 0)
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
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-chat-input" 
    }else{
        return "" 
    }
  }
  fullScreenChatBackground =()=>{//.user-list-container, .chat <div className="">     </div>chat-window
    if(this.state.isFullScreen&&window.innerWidth>813){
        this.setState({showParticles:false})
        return "chat-background" 
    }else{
        this.setState({showParticles:true})
        return "" 
    }
  }
  fullScreenRoomWindow=()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-room-window" 
    }else{
        return "" 
    }
  }    

  fullScreenFrame =()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-frame" 
    }else{
        return "" 
    }
  }

  fullScreenIframe =()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-iframe" 
    }else{
        return "" 
    }
  }

  fullScreenControlPanel =()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-control-panel" 
    }else{
        return "" 
    }
  }

  fullScreenMessageMe =()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
        return "fullScreen-message-me" 
    }else{
        return "" 
    }
  }
  fullScreenMessageUser =()=>{
    if(this.state.isFullScreen&&window.innerWidth>813){
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
  }


  handleTouchEnd=()=>{
    const {startX, startY, endX, endY} = this.state
    if (startX - endX > 150) {
      if(window.innerWidth>414){
        this.setState({isChatVisible:false})
      }
    }

    if (startX - endX < -150) {
      this.setState({isChatVisible:true})
    }

    if (startY - endY > 150) {
      if(window.innerWidth>414){
         this.setState({isVisible:false})
      }
    }

    if (startY - endY < -150) {
      this.setState({isVisible:true})
    }
  }


  render() {
    if (!this.state.movie) return <div>Loading....</div>
    return (
      <div 
      className={`watch-room ${this.fullScreenWatchRoom()}`} 
      ref={node => { this.node = node; }}
      >

        <div className={`room-window ${this.fullScreenRoomWindow()}`}
            onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => this.handleTouchEnd()}
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
                muted={!this.state.showVideo}
                volume={this.state.volume}
                playing={this.onPlaying&&this.state.isPlaying}
                onDuration={this.onDuration}
                onProgress={this.onProgress}
              />
            </div>
            <VideoControls
              onVolumeChange={this.onVolumeChange}
              volume={this.state.volume}
              toggleFullScreen={this.toggleFullScreen}
              isFullScreen={this.state.isFullScreen}
              fullScreenControlPanel={this.fullScreenControlPanel}
              onTogglePlay={this.onTogglePlay}
              isPlaying={this.state.isPlaying}
            />
            <div className='reaction'></div>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  }
}

export const Room = connect(mapStateToProps)(withRouter(_Room))
