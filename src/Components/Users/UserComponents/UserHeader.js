import React from 'react';

const userHeader = (props) =>{
    return(
        <div className = "UserHeader">
            <img className = "UserImage" src={props.img}/>
            <div className = "UserName">{props.name}</div>
            <div className = "UserID">{props.id}</div>
        </div>
    );
}

export default userHeader;