import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadReviews } from '../store/actions/reviewActions.js';
import { updateUser, toggleFavUserList } from '../store/actions/userActions.js';
import { cloudinaryService } from '../services/cloudinarySerivice';



class _UserDetails extends Component {
    state = {
        imgUrl:'',
        name:''
    }
    componentDidMount() {
        if(!this.props.loggedInUser){
            this.props.history.goBack()
        }else{
            this.setState({
                imgUrl:this.props.loggedInUser.avatar,
                name:this.props.loggedInUser.username
            })
           console.log("this.props.loggedInUser",this.props.loggedInUser)
        }
    }

    
    onUploadImg = async (ev) => {
        ev.preventDefault()
        const cloudImg = await cloudinaryService.uploadImg(ev)
        const imgUrl = cloudImg.secure_url
        console.log("onUploadImg -> imgUrl", imgUrl)
        this.setState({ ...this.state, imgUrl })

    }
    handleInput = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value })
    }

    onSave =ev=>{
        ev.preventDefault()
        const newUser = { ...this.props.loggedInUser, username:this.state.name, avatar:this.state.imgUrl}
        this.props.updateUser(newUser);
        this.props.closeModal()
    }
    removeFromFavList=(ev,movie)=>{
        if(this.props.loggedInUser){
          ev.stopPropagation()
          this.props.toggleFavUserList(this.props.loggedInUser,movie)
        }
    }
    
    render() {
        
        const { loggedInUser } = this.props
        const { imgUrl } = this.state
        if (!loggedInUser) return <div>Loading....</div>    
        return (
            <React.Fragment>
                <form className="user-details-form" onSubmit={this.onSave} >

               <div className="user-avatar">
                    <div style={{ backgroundImage: `url(${imgUrl})` }}></div>
                    
                    <label className="custom-file-upload">
                        <input onChange={this.onUploadImg} type="file"/>
                        Upload Image
                    </label>
               </div>

               <div className="username">
                <div> Change your username:</div>
                <input value={this.state.name} onChange={this.handleInput} type="text"  name="name"/>
              </div>

                <button onClick={this.onSave}>Save Changes</button>
              </form>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        movies: state.movie.movies,
        loggedInUser: state.user.loggedInUser,
        users: state.user.users,
        reviews: state.review.reviews,
    }
}
const mapDispatchToProps = {
    loadReviews,
    updateUser,
    toggleFavUserList
  };
export const UserDetails = connect(mapStateToProps,mapDispatchToProps)(_UserDetails)