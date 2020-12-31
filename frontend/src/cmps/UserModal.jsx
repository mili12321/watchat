import React from 'react'
import {UserDetails} from '../pages/UserDetails'

export class UserModal extends React.Component {
  state = {
    isShown: true,
  }
  closeModal = () => {
    this.setState({ isShown: false })
    this.props.onOpenUserModal()
  }
  render() {
    const { isShown } = this.state
    return (
      <div
        className={`modal-wrapper ${isShown ? '' : 'hide'}`}
        onClick={this.closeModal}>
        <div className='user-modal-content' onClick={(ev) => ev.stopPropagation()}>
            <UserDetails closeModal={this.closeModal}/>
        </div>
      </div>
    )
  }
}
