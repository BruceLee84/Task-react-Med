import React from 'react'
import { useSelector } from 'react-redux'


function Profilepage() {
    const user = useSelector(state => state.user.value);
    console.log('user', user);
    return (
        <div>
            <h3>Profile Info</h3>
            <p>Name:{user.Name}</p>
            <p>Email:{user.Email}</p>
            <p>Number:{user.Number}</p>
            <p>Password:{user.Password}</p>
            <input type='color'></input>
        </div>
            

    )
}

export default Profilepage