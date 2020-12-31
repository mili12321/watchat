import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import { loginByGoogle } from '../store/actions/userActions'

export class _GoogleOauth extends Component {
    responseGoogle = (response) => {
        const userCreds = { 
            email: response.profileObj.email,
            avatar:response.profileObj.imageUrl, 
            username: response.profileObj.givenName 
        }
        this.props.loginByGoogle(userCreds)
        console.log("loggedInUser:", this.props.loggedInUser)
        this.props.closeModal()
    }
       
    render() {
        return (
           <div>
                <GoogleLogin
                    clientId="866960241942-jhfvtsh6b7adl5jae5cth72jlhug4i72.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
           </div> 
        )}
}
const mapStateToProps = (state) => {
    return {
      users: state.user.users,
      loggedInUser: state.user.loggedInUser,
      isLoading: state.system.isLoading,
    }
}
const mapDispatchToProps = {
    loginByGoogle
}
export const GoogleOauth = connect(mapStateToProps, mapDispatchToProps)(_GoogleOauth)