
import React from 'react'
export class ReviewModal extends React.Component {
    state = {
        isShown: true,
    }
    closeModal = () => {
        this.setState({ isShown: false })
        this.props.onOpenModal()
        
    }
    render() {
        const { isShown } = this.state
        const { children,updateMovie } = this.props
        return (
            <div className={ `modal-wrapper ${isShown ? '' : 'hide'}` } onClick={ this.closeModal } >
                <div className="review-modal-content" onClick={ (ev) => ev.stopPropagation() }>
                    <form onSubmit={updateMovie} className='review-form'>
                    { children }
                    <button className="review-submit-btn" >Continue</button>
                    </form>
                </div>
            </div >
        )
    }
}
