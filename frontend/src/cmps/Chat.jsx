import React, { Component} from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService'
import { IoMdSend, IoIosHappy } from 'react-icons/io'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { UserList } from './UserList'
import { customEmojis } from '../data/emojis'
import uuid from 'react-uuid'
import RSC from 'react-scrollbars-custom'
import { msgList1 } from '../data/msgs1'
import Particles from 'react-particles-js'


class _Chat extends Component {
  state = {
    currUser: null,
    msg: {
      type: '',
      from: '',
      to: '',
      txt: '',
      senderId: '',
      user:null,
      sendedMsg:''
    },
    msgList: [],
    users: [],
    giftName: '',
    showGift: '',
    showRecivedGift: '',
    showRecivedMsg: '',
    giftPosition: '',
    socketInfo:[],
    gift:{},
    gifts:[],
    msgForUser:{},
    msgsFromUsers:[],
    popupVisible: false,
  }

  inputRef = React.createRef()
  scrollBarRef = React.createRef()


  handleClick=() =>{
    if (!this.state.popupVisible) {
      // attach/remove emojies picker
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
    }));
  }

  handleOutsideClick=(e)=> {
    // ignore clicks on the component itself( the emojies picker )
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.handleClick();
  }

  rotatedGiftTxt=(gift)=>{
    let chars;
    switch(gift.name) {
      case 'kiss':
        chars =`XOXO`.split("")
        return chars;
      case 'drink':
        chars =`Drink on me!`.split("")
        return chars;
      case 'small-popcorn':
        chars =`What's Poppin?`.split("")
        return chars;
      default:
        return '';
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.cleanUp)
    if (this.props.currUser) this.setState({ currUser: this.props.currUser })
    this.setupSockets()
    this.setState({ msgList: msgList1 })
  }

  componentWillUnmount() {
    this.cleanUp()
    window.removeEventListener('beforeunload', this.cleanUp)
  }

  componentDidUpdate() {
    this.scrollDown()
  }

  setupSockets = () => {
    socketService.emit('chat room', {
      roomId: this.props.roomId,
      user: this.props.currUser,
    })
    socketService.on('chat room', (users, newUser, firstUser) => {
      console.log("firstUser: ",firstUser)
      this.setState({ users })
      if (!this.state.currUser) {
        this.setState({ currUser: newUser },()=>{
          console.log("this.state.currUser123:",this.state.currUser)
        })
      }
      this.props.onAddNewUser(users, newUser, firstUser)
    })
    socketService.on('chat', (msg) => {
      this.setState({ msgList: [...this.state.msgList, msg] })
    })
    socketService.on('remove-user', (users, firstUser) => {
      this.setState({ users })
    })
    socketService.on('receive-gift', (_gift) => {
      console.log('RECEIVING NEW gift FROM SOCKET: ', _gift.name)

      this.setState({ gift:{_gift,showRecivedGift:true }})
      let gift={
        ..._gift,
        id:uuid(),
        showRecivedGift:true 
      }
      this.setState({ gifts:[...this.state.gifts,gift] },()=>{
        setTimeout(() => {
          const newGifts = this.state.gifts.filter(_gift=>_gift.id!==gift.id)
          this.setState({ gifts:newGifts})
        }, 5500)
        console.log('this.state.gifts-->',this.state.gifts)
      })
    })


    socketService.on('receive-msg', (msg) => {
      console.log('RECEIVING NEW msg FROM SOCKET: ', msg)
      const currMsg = {
        txt:msg.txt,
        from:msg.from,
        to:msg.to,
        sendedMsg:msg.sendedMsg,
        id:uuid(),
        showRecivedMsg:true
      }
      this.setState({ msgForUser:currMsg })
      this.setState({ msgsFromUsers:[...this.state.msgsFromUsers,currMsg] },()=>{
        setTimeout(() => {
          const newMsgs = this.state.msgsFromUsers.filter(_msg=>_msg.id!==currMsg.id)
          this.setState({ msgsFromUsers:newMsgs})
        }, 10000)
      })
    })
  } 


  cleanUp = () => {
    if (this.state.currUser)
      socketService.emit('remove-user', {
        userId: this.state.currUser._id,
        userRoom: this.props.roomId,
      })
    socketService.terminate()
  }

  onMsgSend = () => {
    if (this.state.msg.txt !== '') this.sendMsg()
  }

  onMsgEnter = (ev) => {
    if (ev.key === 'Enter' && this.state.msg.txt !== '') this.sendMsg()
  }

  sendMsg = () => {
    let msg = this.state.msg
    msg.from = this.state.currUser.username
    msg.senderId = this.state.currUser._id
    socketService.emit('chat', msg)
    if(this.state.msg.txt.charAt(0)==="@"){
      console.log('receive-msg')
      console.log('receive-msg from',this.state.currUser)
      console.log('receive-msg to',this.state.msg.user)
      socketService.emit('receive-msg',{from:this.state.currUser, user:this.state.msg.user, txt: this.state.msg.txt, sendedMsg: this.state.msg.sendedMsg, to:this.state.msg.to })
    }
    this.removeMsg()
    this.props.hideEmojis()
  }

  closeMsg=(currMsg)=>{
    const newMsgs = this.state.msgsFromUsers.filter(_msg=>_msg.id!==currMsg.id)
    this.setState({ msgsFromUsers:newMsgs})
  }

  onMsgInput = (ev) => {
    const msg = this.state.msg
    msg.txt = ev.target.value
    this.setState({ msg })
  }

  onEmojiSelect = (emoji) => {
    let msg = this.state.msg
    if (emoji.native) {
      msg.txt += emoji.native
      this.setState({
        msg,
      })
    } else {
      msg.txt += emoji.name
      this.setState({
        msg,
      })
    }
  }

  onUsernameSelect = (user) => {
    if (user._id === this.state.currUser._id) return
    const input = this.inputRef.current
    input.value = '@' + user.username + ' '
    const msg = { to: user.username, txt: input.value ,user}
    this.setState({ msg })
    input.focus()
  } 
  
  ReplyToSender = (user,sendedMsg) => {
    if (user._id === this.state.currUser._id) return
    const input = this.inputRef.current
    input.value = '@' + user.username + ' '
    const msg = { to: user.username, txt: input.value ,user, sendedMsg}
    this.setState({ msg })
    input.focus()
  }

  sendGift = (giftName, giftPosition, user) => {
    this.setState({ giftName, showGift: true, giftPosition})
    console.log('GIFT POSITION: ', giftPosition)
    console.log('user that recived gift: ', user)
    let gift={
      user,
      giftName,
      sender:this.state.currUser
    }
    socketService.emit('receive-gift',{gift})
    setTimeout(() => {
      this.setState({ showGift: false })
    }, 2000)
  }


  removeMsg = () => {
    const msg = {
      type: '',
      from: '',
      to: '',
      txt: '',
    }
    const privateMsg = {
      isPrivate: false,
      to: '',
    }
    this.setState({ privateMsg })
    this.setState({ msg })
  }

  replaceWithGif = (msg) => {
    msg = this.replaceWithTagName(msg)
    let result = msg
    customEmojis.forEach((em) => {
      const emoji = `
      <img src=${em.imageUrl} className='gif-img'></img>
    ` 
    const trolldance = `
      <img src=${em.imageUrl} className='gif-img gif-img-trolldance'></img>
    `
      let temp = ''
      while (result !== temp) {
        temp = result
        const searchStr = em.name
        if(searchStr===":trolldance:"){
          result = result.replace(searchStr, trolldance)
        }else{
          result = result.replace(searchStr, emoji)
        }
      }
    })
    return result
  }

  replaceWithTagName = (msg) => {
    let result = msg
    this.state.users.forEach((user) => {
      const tagname = `<span className='name-tag'>${user.username}</span>`
      const searchStr = user.username
      result = result.replace(searchStr, tagname)
      // result = result.replace('@', '')
    })
    return result
  }

  scrollDown = () => {
    const scrollBar = this.scrollBarRef.current
    if (scrollBar) scrollBar.scrollToBottom()
  }



  render() {
    if (!this.state.currUser) return <div>Loading...</div>
    return (
      <React.Fragment>
{this.state.msgsFromUsers.map(msgForUser=>

  <div className={`msgForUser ${!msgForUser.showRecivedMsg ? 'hidden' : "slide-left"}`}>
  {msgForUser.sendedMsg&&
      <div className="old-msg">
          <span>About:</span>
          <span dangerouslySetInnerHTML={{__html: this.replaceWithGif(msgForUser.sendedMsg.slice(msgForUser.to.length+1)),}} style={{width: "20px"}}></span>
      </div>
  }

  <div className="new-msg">
    <div  className="sender-avatar-container" >
    <div className="sender-avatar" 
    style={{backgroundImage: `url(${
        msgForUser.from.avatar ? msgForUser.from.avatar : ''})`,}}></div>
    </div>
    <div className="sender-msg-container">
        <div className="sender-msg-name">{msgForUser.from.username}</div>
        <div className="sender-msg-txt" dangerouslySetInnerHTML={{__html: this.replaceWithGif(msgForUser.txt.slice(msgForUser.to.length+1)),}} style={{width: "20px"}}></div>
    </div>
  </div>

  <div className="reply-btn" onClick={()=>{this.ReplyToSender(msgForUser.from, msgForUser.txt)}}>Reply</div>

  <div className="close-msg" onClick={()=>{this.closeMsg(msgForUser)}}>X</div>
</div>
)}
        
        

        {this.state.gifts.map(gift=>
        gift.showRecivedGift?
 <div className={`recived-gift sended-gift sended-${gift.name} ${
  !gift.showRecivedGift ? 'hidden' : "start-animation"
}`}>
  <h1>
    {this.rotatedGiftTxt(gift).map((char,idx)=>
        <span className={`char char-${idx+1}`} key={idx}>
            {char}
        </span>
    )}
  </h1>
  <div className="gift-sender">
    <div className="avatar-container">
      <div className="avatar-img" style={{
        backgroundImage: `url(${
          gift.sender.avatar ? gift.sender.avatar : ''
        })`,
      }}></div>
    </div>
      <div className="name">{gift.sender.username}</div>
  </div>
</div>:''
        )}

      <section className={`chat ${this.props.fullScreenChat()}`}>
        {this.props.isVisible&&
        <UserList
          socketInfo={this.state.socketInfo}
          msgForUser={this.state.msgForUser}
          movie={this.props.movie}
          sendGift={this.sendGift}
          users={this.state.users}
          currUser={this.state.currUser}
          onUsernameSelect={this.onUsernameSelect}
          fullScreenChatBackground={this.props.fullScreenChatBackground}
          isFullScreen={this.props.isFullScreen}
          toggleFullScreen={this.props.toggleFullScreen}
          onGoBack={this.props.onGoBack}
        />}
        <div className={`chat-window ${window.innerWidth>813?this.props.fullScreenChatBackground():""}`}>

        {this.props.showParticles&&<Particles 
          canvasClassName='chat-particles'
          params={{
            particles:{number:{value:160,density:{enable:true,value_area:800}},color:{value:'#f01548'},shape:{type:'circle',stroke:{width:0,color:'#000000'},polygon:{nb_sides:5},image:{src:'img/github.svg',width:100,height:100}},opacity:{value:1,random:true,anim:{enable:true,speed:1,opacity_min:0,sync:false}},size:{value:3,random:true,anim:{enable:false,speed:4,size_min:0.3,sync:false}},line_linked:{enable:false,distance:150,color:'#ffffff',opacity:0.4,width:1},move:{enable:true,speed:1,direction:'none',random:true,straight:false,out_mode:'out',bounce:false,attract:{enable:false,rotateX:600,rotateY:600}}},interactivity:{detect_on:'canvas',events:{onhover:{enable:true,mode:'bubble'},onclick:{enable:true,mode:'repulse'},resize:true},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:250,size:0,duration:2,opacity:0,speed:3},repulse:{distance:400,duration:0.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:true
          }}></Particles>

          }


          <div className='chat-box' ref={node => { this.node = node; }} >
            {this.props.isChatVisible&&<RSC
              ref={this.scrollBarRef}
              // className='chat-box'
              style={{ color: 'red', 
              direction:'rtl' }}>
              {this.state.msgList.map((msg) => (
                <div
                  key={uuid()} 
                  style={{ direction:'ltr' }}
                  className={`msg-container ${
                    this.state.currUser &&
                    msg.senderId === this.state.currUser._id
                      ? 'left'
                      : 'right'
                  }-msg ${this.props.fullScreenMsg()}`}>
                  <div
                    className={`chat-msg from-${
                      this.state.currUser &&
                      msg.senderId === this.state.currUser._id
                        ? 'me'
                        : 'user'
                    } ${this.state.currUser &&
                      msg.senderId === this.state.currUser._id
                        ?this.props.fullScreenMessageMe():this.props.fullScreenMessageUser()}`}
                    key={uuid()}>
                    <div
                      className='msg-sender'
                    >
                      {this.state.currUser &&
                      msg.senderId === this.state.currUser._id
                        ? 'Me'
                        : msg.from}
                    </div>
                    <div
                      className='msg-content'
                      dangerouslySetInnerHTML={{
                        __html: this.replaceWithGif(msg.txt),
                      }} style={{width: "20px"}}
                    />
                  </div>
                </div>
              ))}
            </RSC>}
            <div
              className={`gift ${
                !this.state.showGift ? 'hidden' : this.state.giftName
              }`}
              style={{ left: `${this.state.giftPosition}px` }}>
            </div>
           {
          this.state.popupVisible &&
             <div 
              className='emojis'
              >
              <Picker
                style={{ width: '100%' }}
                custom={customEmojis}
                theme='light'
                perLine={6}
                showPreview={false}
                showSkinTones={false}
                onSelect={this.onEmojiSelect}
                // onClick={this.on}
                exclude={[
                  'flags',
                  'symbols',
                  'nature',
                  'search',
                  'places',
                  'objects',
                  'activity',
                ]}
                emojiTooltip={true}
              />
            </div>}
          </div>

          {this.props.isChatVisible&&<div className={`chat-input ${this.props.fullScreenInput()}`}>
            <input
              ref={this.inputRef}
              type='text'
              value={this.state.msg.txt}
              placeholder='Type a message'
              onChange={this.onMsgInput}
              onKeyPress={this.onMsgEnter}
              onFocus={this.props.hideEmojis}
            />
            <div
              className={`input-icon ${
                this.state.msg.txt === '' ? '' : 'msg-content'
              }`}>
              <IoMdSend size='20px' onClick={this.onMsgSend} />
            </div>
            <div
              className={`input-icon emoji ${
                this.props.showEmojis ? 'selected' : ''
              }`}
              onClick={this.handleClick}
              >
              <IoIosHappy size='20px' />
            </div>
          </div>}
        </div>


      </section>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
      loggedInUser: state.user.loggedInUser, 
  }
}

export const Chat = connect(mapStateToProps)(_Chat)