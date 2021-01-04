import React, { Component } from 'react'

export class MovieFilter extends Component {
    state = {
        active: 'All',
        activeBtn: false,
        keyUpValue: false,
        search:''
    }
    buttons = [
        'All',
        'Action',
        'Comedy',
        'Crime',
        'Drama',
        'Fantasy',
        'Adventure',
        'Sci-Fi',
        'Thriller',
        'Horror',
        'Fairy Tale',
    ]
    componentDidMount(){
        if(this.props.currCategory){
            this.setState({ active: this.props.currCategory })
            this.setState({activeBtn:true},() => {this.changeGenre(this.props.currCategory)})
        }
    }

    changeToActive(name) {
        this.setState({ active: name })
        if(name==="All"){
            this.setState({activeBtn:false},() => {this.changeGenre(name)})
        }else{
            this.setState({activeBtn:true},() => {this.changeGenre(name)})
        }
    }
    changeGenre(name){
        this.toggleView()
        this.props.currGenre(name)
    }

    onKeyUpValue(event) {
        if(event.target.value){
            this.setState({keyUpValue:true,search:event.target.value},() => {this.searchValue()})
        }else{
            this.setState({keyUpValue:false,search:event.target.value},() => {this.searchValue()})
        }
    }

    searchValue(){
        this.toggleView()
        this.props.currSearch(this.state.search)
    }

    toggleView(){
        if(this.state.activeBtn||this.state.keyUpValue){
            this.props.toggleView('FilteredMovie')
        }else{
            this.props.toggleView('MovieList') 
        } 
    }

    render() {
        return (
            <div className="movies-side-nav">
              <div className={`movies-sidenav`}>
                <div className="side-nav-main">
                    <div>Search Movie</div>
                  <input type="text" 
                  onKeyUp={this.onKeyUpValue.bind(this)}/>
                </div>
                {this.buttons.map(name => {
                    return <div 
                        className={`side-btn ${this.state.active === name ? 'active-side-btn' : ''}`}
                        onClick={() => this.changeToActive(name)}
                        >{name}</div>;
                })}
              </div>

            </div>
        )
    }
}