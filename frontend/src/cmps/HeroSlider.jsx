import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';

export class HeroSlider extends Component {
  render() {
    const settings =  {
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true
    };
    return (
      <div>
        <span>CustomSlider</span>
        <Slider { ...settings }>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
        </Slider>
      </div>
    );
  }
}