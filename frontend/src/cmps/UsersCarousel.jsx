import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { UserPreview } from './UserPreview'

export class UsersCarousel extends Component {
    render() {
        const {users} = this.props
        const responsive = {
            0: { items: 4 },
            400: { items: 4 },
            600: { items: 5 },
            700: { items: 6 },
            800: { items: 3 },
            1400: { items: 4 },
            1600: { items: 5 },
        };

        
        return (
            <React.Fragment>
            <AliceCarousel
            mouseTracking
            // infinite
            responsive={responsive}
            >
            { users.map((user, idx)=>
                <UserPreview
                key={user._id}
                gift={this.props.gift} 
                sendGift={this.props.sendGift}
                socketInfo={this.props.socketInfo}
                user={user}
                userIdx={idx}
                currUser={this.props.currUser}
                onUsernameSelect={this.props.onUsernameSelect}
                ref={(el) => (this.Carousel = el)}
                />
            )}
            </AliceCarousel>
            </React.Fragment>
        );
    }
}