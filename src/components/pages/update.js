import React from "react";
import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";


function UpdateData(){
    const navigate = useNavigate();
    const[userName, setUsername] = useState();
    const[PhoneNumber, setPhoneNumber]= useState();
    const[Email, setEmail]= useState();
    const[Password, setPassword]= useState(); 
    const[role, setRole]= useState(); 
    const [accountType, setAccountType] = useState();
    const[image, setImage] = useState();


    const addUser=()=>{
        let userData={
            userName:userName,
            PhoneNumber:PhoneNumber,
            Email:Email,
            Password:Password,
            role:role,
            image:image
        }
        axios.post('http://localhost:3030/api/v1/user/register', userData).then(userAdd=>{
            console.log('new user', userAdd)
            if(userAdd.status == 200){
                Swal.fire({
                    title: "ADDED!",
                    text: "New User Added",
                    icon: "success"
                })
                navigate('/dashboard')
            }else{
                console.log('err')
            }
        })
    }


    return(
        <>
        <div className="user-card">
            <div className="proup">
            <h4>Add Profile</h4>
            <div className="user-form">
            <label className="user-label">Name:</label>
            <input className="user-input" type='text'  onChange={(text)=>setUsername(text.target.value)}></input>
            <label className="user-label">Email:</label>
            <input className="user-input" type='text' onChange={(text)=>setEmail(text.target.value)}></input>
            <label className="user-label">Number:</label>
            <input className="user-input" type='text' onChange={(text)=>setPhoneNumber(text.target.value)}></input>
            <button className="user-btn" type="submit" onClick={addUser}>confirm</button>
            </div>
            </div>
            </div>
            <div className="addUser-left">
                <label className="user-label">Password:</label>
                <input className="user-input" type='text' onChange={(text)=>setPassword(text.target.value)}></input>
                <label className="user-label">Role:</label>
                <input className="user-input" type='text' onChange={(text)=>setRole(text.target.value)}></input>
                
                   {/* {
                    image == null ?
                    <img src={images}/>
                    : <img className="user-image" src={image}/>
                    } */}
                </div>
                <div className="image-input">
                <input type='file' onChange={(text)=>setImage(URL.createObjectURL(text.target.files[0]))}/>
                </div>
        </>
    )
}

export default UpdateData;