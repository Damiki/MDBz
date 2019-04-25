import React,{Component} from 'react';
import Card from './card';

class Results extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            albums : []
        };

        this.getResults();
    }

    getResults = () => {
        // fetch('/search'+this.props.keyword)
        fetch('search/a')
        .then(res =>res.json())
        .then((res)=> 
            this.setState({albums: res, isLoading: false}));
    }

    render(){
        if(this.state.isLoading)
        return (
            <div className = "Loading">LOADING...</div>
        );
        else return(
            <div className="results-container">
                {this.state.albums.map(album => (
                    <li key = {album.abumid}>
                        <Card albumname = {album.albumname} artist = {album.artist} albumart = {album.albumart}/>
                    </li>
                ))}
            </div>
        );
    }
    
}

export default Results;