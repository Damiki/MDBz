import React, { Component } from 'react';
import Card from './card';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            albums: []
        };
    }

    getResults = () => {
        // fetch('/search'+this.props.keyword)
        const search = this.props.search;
        fetch('search/'+search)
            .then(res => res.json())
            .then((res) =>
                this.setState({ albums: res, isLoading: false }));
    }

    render() {
        this.getResults();
        if (this.state.isLoading)
            return (
                <div className="Loading">LOADING...</div>
            );
        else return (
            <div className="results-container">
                {this.state.albums.map(album => (
                    <li key={album.abumid}>
                        <Card 
                        albumname={album.albumname} 
                        artist={album.artist} 
                        albumart={album.albumart} />
                    </li>
                ))}
            </div>
        );
    }

}

export default Results;