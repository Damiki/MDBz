import React, { Component } from 'react';
import UserHeader from './UserComponents/UserHeader';
import UserRatings from './UserComponents/UserRating';
import UserImage from './UserComponents/UserImg.png';
import './user.css';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ratings: [],
            isLoadingName: true,
            isLoadingRatings: true
        };
        // this.props.checkLogin();
        this.getUsername();
    };

    getUsername = () => {
        fetch('/username')
        .then(res =>res.json())
        .then((res)=> {
            this.setState({
                name: res,
                isLoadingName: false
            });
            this.getRatings(res);
        }
        )
    }

    getRatings = (name) =>{
        fetch('/ratings/'+name)
        .then(res => res.json())
        .then(ratings => this.setState({
            ratings: ratings,
            isLoadingRatings: false
        }));
    }

    deleteRating = (title) =>{
        console.log('deleted!');
        fetch('/delete/'+this.state.name+'/'+title)
        .then( this.getRatings(this.state.name));
    }

    render() {
        if(this.state.isLoadingRatings || this.state.isLoadingName)
                return(
                    <div>Loading</div>
                );
        else
        return (
            <div className="user-container">
                <UserHeader name={this.state.name} id={this.state.id} img={UserImage} />
                <hr/>
                <h2>My Ratings</h2>
                {this.state.ratings.length?
                <ul className="user-rated">
                    {this.state.ratings.map(rating => (
                        <li className="user-rated-item"
                            key={rating.ALBUM_ID}>
                            <UserRatings 
                                img = {rating.IMG}
                                artist={rating.ARTIST_NAME}
                                album={rating.TITLE}
                                rating={rating.RATING} 
                                deleteRating = {this.deleteRating}/>
                        </li>
                    ))}
                </ul>: 
                <div>None</div>
                }
            </div>
        );
    }
}

export default User;