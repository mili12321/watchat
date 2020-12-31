import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

export class MovieLoader extends React.Component {
  state = {
    phrases: ['Grab your popcorn', 'Enjoy!'],
    currTxt: 'Take a seat',
    txtInterval: null,
    hideSpinner: false,
  }

  componentDidMount() {
    this.animateText()
  }

  componentWillUnmount() {
    this.setState({ txtInterval: null })
  }

  animateText = () => {
    let counter = 0
    const txtInterval = setInterval(() => {
      if (this.state.phrases[counter] === 'Enjoy')
        this.setState({ hideSpinner: true })
      if (counter < 2) this.setState({ currTxt: this.state.phrases[counter] })
      counter++
    }, 2000)
    this.setState({ txtInterval })
  }

  render() {
    return (
      <div className='movie-loader'>
        <div className={this.state.hideSpinner ? 'hidden' : 'red-spinner'}>
          <img
            style={{ width: '100%', height: '100%' }}
            src='https://i.gifer.com/8Etj.gif'
            alt=''
          />
        </div>
        <div>
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={this.state.currTxt}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false)
              }}
              classNames='phrase'>
              <div
                className={`phrases ${this.state.hideSpinner?'large-text' : ''}`}>
                {this.state.currTxt}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    )
  }
}
