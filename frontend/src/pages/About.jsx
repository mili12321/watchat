import React, { Component } from 'react'


export class About extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
        <div className='about-page'>
            <div className="description-section">
                <div>
                    <span className="gradient-text">WatChat</span> is a virtual movie theater where you and your friends can watch movies and chat together.
                </div>
                <div>
                    You can tag, send gifts to each other and play/pause movie are synchronized to everyone.
                </div>
                <div>
                    Choose a movie and send a link to your friends.
                </div>
            </div>
            <div className="developer-section">
                <div> This project was created by <span className="gradient-text"><a target="_blank" href="https://www.linkedin.com/in/mili-malzev-310ab3182/">Mili Malzev</a></span>.</div>
                <div>Project Repository <a href="https://github.com/mili12321/watchat" target="_blank"><i class="fab fa-github"></i></a></div>
            </div>
            <div className="tools-section">
                <div>Tools used in this project:</div>
                <div>React</div>
                <div>SCSS</div>
                <div>Node.js</div>
                <div>Socket.io</div>
            </div>

            <div className="sceenshots">
                <div>
                   <div className="phone-container">
                        <img class="blank-phone" src="assets/img/screenshots/blank-screen-device/phone.png" alt=""></img> 
                        <img className="img2" alt=''  src="../assets/img/screenshots/from mobile/3.png"></img> 
                   </div>
                </div> 
               <div className="computer-container">
                    <img class="blank-comp" src="assets/img/screenshots/blank-screen-device/blank-d.png" alt=""></img>
                    <img className="img1" alt='' src="../assets/img/screenshots/desktop/cap21-d.PNG"></img>
               </div>
            
            <img className="img3" alt='' src="../assets/img/screenshots/movies-p2.PNG"></img>
            <img className="img4" alt='' src="../assets/img/screenshots/movies-p.PNG"></img>
            </div>
        </div>
        </React.Fragment>
        )
    }
}