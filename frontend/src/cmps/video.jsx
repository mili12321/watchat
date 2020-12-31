
import React from 'react';
import { Player } from 'video-react';
import '~video-react/dist/video-react.css';

export default props => {
  return (
    <Player
      playsInline
      src="assets/img/video.mp4"
    />
  );
};