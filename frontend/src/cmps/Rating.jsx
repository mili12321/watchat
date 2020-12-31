import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
 
export class Foo extends Component {
 
    render() {
        const { rating } = this.props
      return (
        <StarRatings
          rating={{rating}}
          starRatedColor='maroon'
          numberOfStars={5}
          name='rating'
          starDimension='18px'
        />
      
      )
    }
}
 
 

