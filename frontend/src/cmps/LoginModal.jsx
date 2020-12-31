import React from 'react'
import Login from '../pages/Login'
export class LoginModal extends React.Component {
  state = {
    isShown: true,
  }
  closeModal = () => {
    this.setState({ isShown: false })
    this.props.onOpenModal()
  }
  render() {
    const { isShown } = this.state
    return (
      <div
        className={`modal-wrapper ${isShown ? '' : 'hide'}`}
        onClick={this.closeModal}>
        <div className='modal-content' onClick={(ev) => ev.stopPropagation()}>
          <Login closeModal={this.closeModal} />
        </div>
      </div>
    )
  }
}
