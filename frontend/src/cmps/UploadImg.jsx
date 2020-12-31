import React, { Component } from 'react'
import { cloudinaryService } from '../services/cloudinarySerivice';

export class UploadImg extends Component {
    state = {
        imgUrl:'',
        name:''
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
    


  render() {
    return (
      <div>
        <label> Upload your image to cloudinary!
            <input onChange={this.onUploadImg} type="file"/>
        </label>
        {this.state.imgUrl&&<img src={this.state.imgUrl} alt=""/>}
        <input value={this.state.name} onChange={this.handleInput} type="text"  name="name"/>
        
      </div>
    )
  }
}
