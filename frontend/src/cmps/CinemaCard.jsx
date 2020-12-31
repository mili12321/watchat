import React from 'react';

import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom'


export function CinemaCard({ movie }) {
  return (
    <React.Fragment>
      <Tilt
        className="parallax-effect-glare-scale"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
        style={{backgroundImage: `url(${movie.coverUrl})`}}
      >
        <div className="inner-element">
          <Link to={`/room/${movie._id}`}><div className="paly-card-btn"><i className="fas fa-play card-play"></i></div></Link>
        </div>
      </Tilt>
    </React.Fragment>
  )
}
