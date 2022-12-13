import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css';

function Register(){
      const navigate = useNavigate();
      const[userName, setUsername] = useState();
      const[PhoneNumber, setPhoneNumber]= useState();
      const[Email, setEmail]= useState();
      const[Password, setPassword]= useState();

    const {register, handleSubmit, formState: { errors }, reset, trigger} = useForm();

      const sign =(userData)=>{
        // console.log("Name", userName);
        // console.log("Number", PhoneNumber);
        // console.log("Email", Email);
        // console.log("Password", Password);
        console.log("userDetail", userData)
        axios.post('http://localhost:3030/api/v1/user/register', 
        // {userName, PhoneNumber, Email, Password}
        userData).then((data)=>{
            console.log('data', data)
            localStorage.setItem('token', data.data.result.token)
            localStorage.setItem('uuid', data.data.result.uuid)
            localStorage.setItem('Name', data.data.result.userName)
            localStorage.setItem('Email', data.data.result.Email)
            localStorage.setItem('role', data.data.result.role)
            localStorage.setItem('Number', data.data.result.PhoneNumber)
            localStorage.setItem('image', data.data.result.image)
            console.log(data.status)
            if (data.status === 200) {
                // alert(data.message);
                swal.fire({
                title: "Registeration Success",
                text: "welcome",
                icon: "success",
                button: "OK",
                })
                navigate('/home')
              } else {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'SignUp Failed',
                  })
              }
        }).catch((err)=>{
            console.log('error', err)
        })
        // console.log('detail', detail)
      }

    return(
        <>
        <div className="sign-card">
            <div className="login-page">
              <form className="forms" onSubmit={handleSubmit(sign)}>
                <h4 className="loginh">SIGNUP</h4>
                <div className="login-form">
                <div>
                <label className="user-label">Username</label>{errors.userName && (<small className="sw1">{errors.userName.message}</small>)}
                <input className="user-input" type='text' name="name" onChange={(name)=>setUsername(name.target.value)} 
                {...register("userName", {
                required: "name is required",
                pattern: {
                  // value: /^[A-Z][a-zA-Z '.-]*$/,
                  // message:
                  //   "first latter is capital",
                  value: /^[a-zA-Z '.-]*$/,
                  message:
                    "use latters only",
                },
                minLength: {
                  value: 4,
                  message: "minimum 4 latters must",
                },
                maxLength: {
                  value: 16,
                  message: "maximum 16 latters allowed",
                },
              })}
              onKeyUp={() => {
                trigger("userName");
              }}
            />
            {/* {errors.userName && (<small className="sw">{errors.userName.message}</small>)} */}
            </div>
            <div>
            <label className="user-label">Email</label>{errors.Email && (<small className="sw2">{errors.Email.message}</small>)}
            <input className="user-input" type='email' name="email" onChange={(email)=>setEmail(email.target.value)}
             {...register("Email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:
                    "(example : samplemail@a123.com)",
                },
              })}
              onKeyUp={() => {
                trigger("Email");
              }}
            />
            {/* {errors.Email && (<small className="sw">{errors.Email.message}</small>)} */}
            </div>
            <div>
            <label className="user-label">Number</label>{errors.PhoneNumber && (<small className="sw3">{errors.PhoneNumber.message}</small>)}
            <input className="user-input" type='text' name="number" onChange={(number)=>setPhoneNumber(number.target.value)}
             {...register("PhoneNumber", {
                required: "number is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "numbers only allowed",
                },
                maxLength: {
                  value: 10,
                  message: "only 10 numbers are allowed",
                },
              })}
              onKeyUp={() => {
                trigger("PhoneNumber");
              }}
            />
            {/* {errors.PhoneNumber && (<small className="sw">{errors.PhoneNumber.message}</small>)} */}
            </div>
            <div>
            <label className="user-label">Password</label>{errors.Password && (<small className="sw">{errors.Password.message}</small>)}
            <input className="user-input" type='text' name="password" onChange={(password)=>setPassword(password.target.value)}
             {...register("Password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*?[a-z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message:
                    "password must have 8 characters.",
                },
              })}
              onKeyUp={() => {
                trigger("Password");
              }}
            />
            {/* {errors.Password && (<small className="sw">{errors.Password.message}</small>)} */}
            </div>
            <p>By creating an account you agree to our <u><a href="#">Terms & Privacy</a></u>.</p>
            <button className="signUp-btn" type="submit">Register</button>
            </div>
             </form>
             <p className="have-acc" onClick={()=>window.location.href='/'}>Already have a account? <u className="under-log">Login</u></p>
            {/* <button className="sign-btn"></button> */}
            </div>
        </div>



        </>
    )
}

export default Register;