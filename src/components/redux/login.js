import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {login, logout} from '../redux/data/user'

function Loginpage() {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const use = (data) => {
        console.log(data)
        setName(data)
    }
    return (
        <div>
            <button onClick={() =>dispatch(login({Name: 'bala', Email: 'bala1232gmail.com', Number: 8907654321, Password: 12345}))}>Login</button><br></br><br></br>
            <button onClick={()=>dispatch(logout({Name:'', Email:'', Number:'', Password:''}))}>Logout</button>
        </div>
    )
}

export default Loginpage;