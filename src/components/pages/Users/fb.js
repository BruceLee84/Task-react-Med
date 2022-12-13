import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import swal from "sweetalert2";
import axios from "axios";


function Facebook() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const responseFacebook = (response) => {
    console.log(response);
    console.log("token", response.accessToken)
    console.log('Name', response.name)
    regFb(response)
    setData(response)
    if (response.accessToken) {
        setLogin(true);
        // swal.fire({
        //     title: "LOGIN SUCCESS!",
        //     text: "welcome",
        //     icon: "success",
        //     button: "OK",
        // })
        // window.location.href ='/home';
      } else {
        setLogin(false);
      }
    if (response.status === "unknown") {
        swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Check your Username and Password',
        })   
    }    
   }

//    const logout = () => {
//     setLogin(false);
//     setData({});
//   };



// fb signUp
const regFb = (response)=>{
    let userDetail = {
       userName:response.name,
       Email:'balakrrish2000@gmail.com',
       PhoneNumber:'7788990012',
       Password: '09876@',
       accountType: 'facebook'
    }
   console.log('User', userDetail)
   axios.post('http://192.168.29.174:3030/api/v1/user/register', userDetail).then(userData=>{
       console.log('data', userData)
    }).catch((err)=>{
       console.log('error', err)
   })
  }



return(
    <>
    <div className="fb">
        <FacebookLogin
        appId="1187513878498468"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        callback={responseFacebook}
        icon="fa-facebook"/>
    </div>
    <div>
        {/* <a href="/" onClick={logout}>Logout</a> */}
    </div>
    </>
   )
}

export default Facebook;