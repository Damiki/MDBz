import React, { Component } from 'react';

import Card from './card';
import Album from '../Album/Album';
import './results.css';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked:false,
            album:'',
            artist:'',
            art:'',
            albums: []
        };
    }

    componentDidMount(){
        this.setState({albums:this.props.albums});
    }
    
    handleClick = (album,artist,art) =>{
        this.setState({
            album,
            artist,
            art,
            isClicked:true})
    }

    handleExit = ()=>{
        this.setState({isClicked:false})
    }

    render() {

        if(this.state.albums.length < 1)
            return <div className="results-container">No Results Found</div>
        else
        return (
            <div className="results-container">
                {this.state.albums.map(album => (
                    <div className ="search-card" key={album.abumid}>
                        <Card 
                        handleClick={this.handleClick}
                        albumname={album.albumname} 
                        artist={album.artist} 
                        albumart={album.albumart} />
                    </div>
                ))}
                {this.state.isClicked && <div className = "overlay">
                <span id="close" onClick={()=>this.handleExit()}>x</span>
                    <Album 
                        album={this.state.album}
                        artist={this.state.artist}
                        art={this.state.art}
                    />
                </div>}
            </div>
        );
    }

}

export default Results;