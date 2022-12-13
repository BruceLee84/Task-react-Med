import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';
import swal from "sweetalert";
import axios from 'axios';

function Google() {
    const [data, setData] = useState('');
    const [login, setlogin] = useState(true);
    const [logout, setlogout] = useState(false);
    const navigate = useNavigate();

    // google sign-in 
    const onLoginSuccess =  async(response) => {
        console.log("Login Success", response.credential)
        let decoder = jwt(response.credential)
        console.log("data", decoder)
        console.log('Name', decoder.name)
        console.log('email', decoder.email)
        // console.log('detail',JSON.stringify(response))
        setData(decoder)
        registeration(decoder)
        // setlogin(false);
        // setlogout(true);
        // swal.fire({
        //     title: "LOGIN SUCCESS!",
        //     text: "welcome",
        //     icon: "success",
        //     button: "OK",
        // })
        // window.location.href ='/home';

        // const { value: Number } = await swal.fire({
        //     title: 'Input Phone Number',
        //     input: 'Number',
        //     inputLabel: 'Your Phone Number',
        //     inputPlaceholder: 'Enter your email Number'
        //   })
          
        //   if (Number) {
        //     swal(`Entered Number: ${Number}`)
        //   }
        
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

     const logoutData = () => {
            googleLogout()
        alert("You have been logged out successfully");
        console.clear();
        setlogin(true);
        setlogout(false);
    };


//  Mobile Number 

    var number = '0123456789';
    let otp='' ;
    for(let i=0;i<4;i++){
     otp += number[ Math.floor(Math.random()*10)]
    }
    console.log('otp',otp)

    const mobile = (value, Email) =>{
        console.log('Email',Email)
        console.log("PhoneNumber",value)
        let Number ={
            Email:Email,
            PhoneNumber:value
        }
        axios.put(`http://192.168.29.174:3030/api/v1/user/edit`,Number).then(result =>{
           if(result.data.status = 200){
            swal({
                
                title: "REGISTER SUCCESS!",
                text: "welcome",
                icon: "success",
                button: "OK",
              });
              console.log('result',result.data.result)
           }else{
            swal({
                title: "Register Failed",
                icon: "Failed"
              });
           }
        }).catch(error=>{
            console.log('error',error.message)
        })
    }


    const verify = async(value,Email) =>{
        let smsdata = {
            PhoneNumber : value,
            text : "otp:"+ otp
        }
        await axios.post('http://192.168.29.174:3030/api/v1/user/otp',smsdata).then(result =>{
            console.log('otp has sended')
            swal("Enter your OTP :", {
                content: "input",
              })
              .then((number) => {
                if(otp == number){
                    // mobile(value, email)
                    mobile(value, Email)
                    console.log('otp verified')
                }else{
                    swal("enter valid otp!");

                }
              }).catch(err=>{
                console.log('err',err.message)
                swal("somthing went wrong!");
              })

        })

    }


// google registeration

//    const[PhoneNumber, setPhoneNumber]=useState('')
const registeration = (decoder)=>{
    let userDetail = {
       userName:decoder.name,
       Email:decoder.email,
       PhoneNumber:'7788990011',
       Password: '09876@',
       accountType: 'Google'
    }
   console.log('User', userDetail)
   axios.post('http://192.168.29.174:3030/api/v1/user/register', userDetail, ).then(userData=>{
       console.log('data', userData)
       console.log("email", userData.data.result.Email)
       if(userData.data.status =='success'){
           let Email = userData.data.result.Email;
             swal("Enter your Mobie Number ", {
               content: "input",
             })
             .then((value) => {
              // moblienumber(value,uuid);
            //   mobile(value, Email)
              verify(value,Email)
             })
          }
        //   window.location.href='/home'
        navigate('/home', {state:userData.data})
       // console.log('num', PhoneNumber)
    }).catch((error)=>{
       console.log('error', error)
   })
  }
   

   return(
        <div>
            {/* <h5>Phone Number is Required</h5>
            <input type="text" placeholder="Number" onChange={(number)=>setPhoneNumber(number.target.value)}/>
            <button className='btns' type='button'>Submit</button> */}
           <GoogleOAuthProvider clientId='709147510140-n4pjmossmskv4n21btoru3a7bg64ep8i.apps.googleusercontent.com'>
                <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={onLoginFailure}/>
            </GoogleOAuthProvider> 
        </div>
        )
}


export default Google;
