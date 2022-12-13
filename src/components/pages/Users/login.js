import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../home";
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css';



function Login(){
     const navigate = useNavigate(); 
     const[userName, userNameData]=useState('');
     const[Password, PasswordData]=useState('');

     const login = async()=>{
        console.log("Name", userName)
        console.log("password", Password)
        const detail = await axios.post('http://localhost:3030/api/v1/user/login', {userName, Password})
        console.log("det", detail)
        localStorage.setItem('token', detail.data.result.token)
        localStorage.setItem('uuid', detail.data.result.uuid)
        localStorage.setItem('Name', detail.data.result.userName)
        localStorage.setItem('Email', detail.data.result.Email)
        localStorage.setItem('role', detail.data.result.role)
        localStorage.setItem('Number', detail.data.result.PhoneNumber)
        localStorage.setItem('image', detail.data.result.image)
        // console.log('token', detail.data.result.token)
        console.log("result", detail.data.result)
        // console.log("Nmuber", detail.data.result.PhoneNumber)
        console.log("role", detail.data.result.role)
        // console.log("status", detail.status)
    //     if(detail.data.result.role == 'admin'){
    //     swal.fire({
    //         title: "Admin!",
    //         text: "welcome",
    //         icon: "success"
    //     })
    //     navigate('/home', {state:detail.data})
    //     // window.location.href ='/home'; 
    // }else if(detail.data.result.role == 'user'){
    //     swal.fire({
    //         title: "LOGIN SUCCESS!",
    //         text: "welcome",
    //         icon: "success"
    //     })
    //     navigate('/home', {state:detail.data})
    //     // window.location.href ='/home'; 
    // }

    if(detail.status == 200){
        swal.fire({
                    title: "LOGIN SUCCESS!",
                    text: "welcome",
                    icon: "success"
                })
                navigate('/home')
    }
    else{
        swal.fire({
            title: "LOGIN FAILLED!",
            text: "userName and password is Wrong!",
            icon: "Failed"
        })
        // alert("userName and password is Wrong!");
    }
}

    return(
        <>
        <div className="login-card">
            <div className="login-page">
                <h4 className="loginh">LOGIN</h4>
                <div className="login-form">
                <label className="user-label">Username</label>
                <input className="user-input" type='text' onChange={(text)=>userNameData(text.target.value)}></input>
                <label className="user-label">Password</label>
                <input className="user-input" type='password' onChange={(text)=>PasswordData(text.target.value)}></input>
                <small className="pw" onClick={()=>window.location.href='/forgot'}>forgot password</small>
                <button className="login-btn" type="submit" onClick={login}>login</button>
                </div>
                <h5 className="or">or</h5>
                {/* <small className="media">login with</small> */}
                <div className="login-row">
                    <div className="login-col">
                    <button className="google-btn" onClick={()=>window.location.href='/google'}>Google+</button>
                    </div>
                    <div className="login-col">
                    <button className="face-btn" onClick={()=>window.location.href='/facebook'}>Facebook</button>
                    </div>
                </div>
                <p className="new-acc" onClick={()=>window.location.href='/signUp'}>New User? <u className="under-log">SignUp</u></p>
                {/* <button className="sign-btn" onClick={()=>window.location.href='/signUp'}>signup</button> */}
            </div>
        </div>
        </>
    )
}

export default Login;