import React, { Component } from 'react';
import UserHeader from './UserComponents/UserHeader';
import UserRatings from './UserComponents/UserRating';
import UserImage from './UserComponents/UserImg.png'
import userRating from './UserComponents/UserRating';

class User extends Component {
    constructor() {
        super();
        this.state = {
            name: 'user',
            id: '1',
            bio: "hey! i'm a user",
            ratings: [
                {
                    albumid: 1,
                    album: 'hey yo',
                    rating: 3
                },
                {
                    albumid: 2,
                    album: 'jacks albums',
                    rating: 5
                },
                {
                    albumid: 3,
                    album: 'byo',
                    rating: 5
                },
                {
                    albumid: 4,
                    album: 'hejhs',
                    rating: 1
                },
            ]
        };
    };

    render() {
        return (
            <div>
                <UserHeader name={this.state.name} id={this.state.id} img={UserImage} />
                <ul>
                    {this.state.ratings.map(rating => (
                        <li key={rating.albumid}>
                            <UserRatings albumid={rating.albumid}
                                album={rating.album}
                                rating={rating.rating} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default User;