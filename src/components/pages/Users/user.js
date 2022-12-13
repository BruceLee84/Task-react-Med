import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css';

function User (){
    const navigate = useNavigate();
    let uuid = localStorage.getItem('uuid')
    let Name = localStorage.getItem('Name')
    let email = localStorage.getItem('Email')
    let phoneNumber = localStorage.getItem('Number')
    let images = localStorage.getItem('image')
    let role = localStorage.getItem('role')
    const [user, setUser] = useState('');
    const [userName, setuserName] = useState(Name);
    const [Email, setEmail] = useState(email)
    const [PhoneNumber, setPhoneNumber] = useState(phoneNumber)
    const [image, setImage] = useState(images)
    const [update, setUpdate] = useState('')

    // const [upload, setUpload] = useState([]);
    // const handleChange = (e)=>{
    //     setUpload(e.target.files[0])
    //     console.log(upload)
    // }


    // const uploader =()=>{
    //     const formdata = new FormData();
    //     formdata.append('file', upload);
    //     formdata.append('data', { name: 'bala' })

    //    console.log("formData", formdata)
    //  axios.post('http://localhost:3030/api/v4/upload/upload', formdata,{
    //     headers:{"Content-Type": "multipart/form-data"}}).then((res) => {
    //     console.log("res", res)
    //   }).catch((error) => {
    //     console.log(error)
    // })
    // }

      
     const userChange = ()=>{
        console.log('userChange', uuid)
        axios.get('http://localhost:3030/api/v1/user/getoneUser',
        {params:{"uuid":uuid}}).then(result=>{
            setUpdate(result)
            console.log('result', result.data.result)
       })
     }

    const userEdit =()=>{
        let userDetail = {
            uuid:uuid,
            userName: userName,
            Email:Email,
            PhoneNumber:PhoneNumber,
            image:image
        }
        axios.put('http://localhost:3030/api/v1/user/editUser', userDetail).then(res=>{
            console.log('res', res)
            // setUpdate(res)
            console.log('status', res.status)
            if(res.status == 200){
                swal.fire({
                    title: "profile updated",
                    text: "Login Again!",
                    icon: "success"
                })
                navigate('/')
            }
        })
    }

    const logout =()=>{
        console.log('uuid-state', uuid)
        axios.post(`http://localhost:3030/api/v1/user/logout?uuid=${uuid}`).then(data=>{
            console.log('log', data.status)
            console.log('logout', data.data.result)
            if(data.status == 200){
                swal.fire({
                    title: "User SignOut",
                    text: "LOGOUT",
                    icon: "success"
                })
                navigate('/')
            } 
        }).catch(err=>{
            console.log('err',err.message)
        })
    }

    const userDel =()=>{
        axios.delete('http://localhost:3030/api/v1/user/userDelete',
        {params:{"uuid":uuid}}).then(data=>{
            console.log('delete', data)
        })
    }

    const deletePro =()=>{
        console.log('delete')
        // axios.delete(`http://localhost:3030/api/v1/user/deleteUser?uuid=${uuid}`).then(del=>{
        //     console.log('deleted', del)
        //     if(del.status == 200){
        //         swal.fire({
        //             title: "DELETE!",
        //             text: "product deleted",
        //             icon: "success"
        //         })
        //         navigate('/dashboard')
        //     }else{
        //         console.log('err')
        //     }
        // })
    }


    if(update){
        return(
            <>
            <header>
            <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button">&#128269;</button>
        </form> {role == 'admin'? <li className="list-data">Dashbord</li>: <li className="list-data" onClick={()=>window.location.href='/home'}>Home</li>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/category'}>Category</li>
          <li className="li-homes">Products</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/user'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button">Logout</button>
                </div></div></li>
        </ul>
        </nav>
        </div>
        </div>
        </header>
            <div className="user-card">
            <div className="proup">
            <h4>Profile Update</h4>
            <div className="user-form">
            <label className="user-label">Name:</label>
            <input className="user-input" type='text' value={userName} onChange={(text)=>setuserName(text.target.value)}></input>
            <label className="user-label">Email:</label>
            <input className="user-inputs" type="text" id="Email" name="Email" value={Email} disabled="true"></input>
            <label className="user-label">Number:</label>
            <input className="user-input" type='text' value={PhoneNumber} onChange={(text)=>setPhoneNumber(text.target.value)}></input>
            <button className="user-btn" type="submit" onClick={userEdit}>confirm</button>
            </div>
            </div>
            </div>
            <div className="profile-left">
                   {
                    image == null ?
                    <img src={images}/>
                    : <img className="user-image" src={image}/>
                    }
                </div>
                <div className="image-input">
                <input type='file' onChange={(text)=>setImage(URL.createObjectURL(text.target.files[0]))}/>
                </div>
        </>
        )
    }else{
       return(
        <>  
         <div>
         <header>
         <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button">&#128269;</button>
        </form> {role == 'admin'? <li className="list-data">Dashbord</li>: <li className="list-data" onClick={()=>window.location.href='/home'}>Home</li>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/cart'}>Cart [0]</li>
          <li className="li-homes" onClick={()=>window.location.href='/order'}>OrderList</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/user'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
        </ul>
        </nav>
        </div>
        </div>
        </header>
             <div className="card2">
             <h4 className="acc">Your Account</h4>
                 <div className="list">
                 <h5 className="listh">Your Orders</h5>
                 <h5 className="listh2">Your Gift Cards</h5>
                 <h5 className="listh3">Doctor Consultation lists</h5>
                 <h5 className="listh3">MedPlus Advantages</h5>
                 <h5 className="listh3">Booked CheckUp lists</h5>
                 </div>
                 { role == 'admin'?
                 <button className="btn11-1" onClick={deletePro}>Delete Profile</button>:<></>
                  }
             </div>
         </div>
    
        <div className="upcard">
        <div className="card">
         <img className="cardim" src={localStorage.getItem('image')} width = '200' height='150'/>
         <div className="downuser">
         <h4>Name: {localStorage.getItem('Name')}</h4>
        <p>Email: {localStorage.getItem('Email')}</p>
        <p>Number:{localStorage.getItem('Number')}</p>
        </div>
        <button className="btn11" onClick={userChange}>Edit Profile</button>
         </div>
        </div>
        </>
        )
    }
}

export default User;



// const handleInputChange = (event) => {
//     setuserInfo({
//       ...userInfo,
//       file: event.target.files,
//       filepreview: URL.createObjectURL(event.target.files),
//     });
//   };