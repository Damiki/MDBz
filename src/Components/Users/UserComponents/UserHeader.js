import React from 'react';

const userHeader = (props) =>{
    return(
        <div className = "UserHeader">
            <img className = "UserImage" src={props.img} alt="" height="150px" width="150px"/>
            <span className = "UserName">{props.name}</span>
        </div>
    );
}

export default userHeader;