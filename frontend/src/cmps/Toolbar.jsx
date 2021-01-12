import React, { Component } from 'react'
import {
  IoMdShare,
} from 'react-icons/io'



export class Toolbar extends Component {
  render() {
    return (
      <div className={`toolbar ${this.props.fullScreenChatBackground()}`}>
        <div className='user-count toolbar-icon' onClick={this.props.onGoBack}>
          <i className="fas fa-home" size='20px'></i>
        </div>
        <div className='add-user toolbar-icon' onClick={this.props.onShare}>
          <a
            href={`whatsapp://send?text=${window.location.href} Watch ${this.props.movie.title} Together With Friends!`}
            data-action='share/whatsapp/share'
            target='_blank'
            rel="noopener noreferrer"
            >
            <IoMdShare size='20px' />
          </a>
        </div>
      </div>
    )
  }
}
