import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2';
import {useLocation, useNavigate } from "react-router-dom";
import './page.css';

function Forgot(){
   const navigate = useNavigate();
   const[Email, setEmail]= useState();
   const [forgot, setForgot] = useState('')
   const [otp, setOtp] = useState('')
   const [newPassword, setNewpassword] = useState('')
   const [confirm, setcomfirm] = useState('')
   const [Password, setPassword] = useState('')

 
   const forgotPass = ()=>{
       axios.post(`http://localhost:3030/api/v1/user/forgotPass?Email=${Email}`).then(data=>{
         console.log('res', data.status)
         // console.log('data', data.data);
         let status = data.status;
          if(status == 200){
              swal.fire({
                  title: "SUCCESS!",
                  text: "otp sended your mail",
                  icon: "success",
                });
          setForgot(data.data.status);
          }else{
            swal.fire("something went wrong!");
        }
       }).catch(error=>{
         console.log('error', error.message)
       })
   }


   const reset = ()=>{
       if(newPassword == confirm){
         setPassword(newPassword)
       }else(
         setPassword()
       )

      axios.post(`http://localhost:3030/api/v1/user/resetPass?newPassword=${newPassword}&otp=${otp}`).then(result=>{
         console.log('result',result.data.status);
    let status = result.data.status;
      if(result.data.status == 'success'){
        swal.fire({
            title: "SUCCESS!",
            text: "password reseted successfully!",
            icon: "success",
          });
        navigate('/');
      }else{
        swal.fire("something went wrong!");
      }
 
   }).catch(error=>{
    console.log('err', error.message)
    swal("something went wrong!");
   })
}
 
   if(forgot){
   return(
      <>
       <div className="password-card-2">
            <div className="login-page">
                <h4 className="loginh">Forgot Password</h4>
                <div className="login-form">
                  
                <label className="user-label">Enter OTP:</label>
                <input className="user-input" type='text' onChange={(text)=>setOtp(text.target.value)}></input>
                <label className="user-label">Enter New Password:</label>
                <input className="user-input" type='text' onChange={(text)=>setNewpassword(text.target.value)}></input>
                <label className="user-label">Confirm Password:</label>
                <input className="user-input" type='text' onChange={(text)=>setcomfirm(text.target.value)}></input>
                <button className="login-btn" type="submit" onClick={reset}>Submit</button>  
            </div>

        </div>
        </div>
      </>
       )
   }else{
      return(
         <>
         <div className="password-card">
            <div className="login-page">
                <h4 className="loginh">Forgot Password:</h4>
                <div className="login-form">
                <label className="user-label">Email:</label>
                <input className="user-input" type='text' onChange={(text)=>setEmail(text.target.value)}></input>
                <button className="login-btn" type="submit" onClick={forgotPass}>Submit</button>
            </div>
         </div>
         <p className="new-acc-for" onClick={()=>window.location.href='/signUp'}>New User? <u className="under-log">SignUp</u></p>
         <p className="have-acc-for" onClick={()=>window.location.href='/'}>Already have a account? <u className="under-log">Login</u></p>
        </div>
      
         </>
      )
   }
}

export default Forgot;