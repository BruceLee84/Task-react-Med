import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from "sweetalert2";
import './home.css';

function AllProducts(){
    let role = localStorage.getItem('role')
    const navigate = useNavigate();
    const [product, setProduct]= useState();
    // const allProdect = async()=>{
    //     await axios.get('http://localhost:3030/api/v3/product/getAllPro').then(result=>{
    //       console.log('all product', result.data.result)
    //       setProduct(result.data.result)
    //     }) 
    //    }

    
    useEffect(()=>{
      axios.get('http://localhost:3030/api/v3/product/getAllPro').then(result=>{
         console.log('result', result)
         setProduct(result);
        })
   },[])


   const indData = async(data)=>{
    console.log("Product_id", data)
    const datas = await axios.get(`http://localhost:3030/api/v3/product/getIndPro?uuid=${data}`)
    setProduct(datas)
    if(product){
        console.log("Cat_Product")
        navigate ('/product:id',{state:datas.data.result})
    }}

    const logout =()=>{
      let uuid = localStorage.getItem('uuid')
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


   if(product){
    return(
        <>
        <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button" >&#128269;</button>
        </form> {role == 'admin'? <li className="list-home" onClick={()=>window.location.href='/dashboard'}>Dashbord</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/category'}>Category</li>
          <li className="li-homes" onClick={()=>window.location.href='/home'}>Home</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/home'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
        </ul>
        </nav>
        </div>
        </div>
        <div className="progrid">
                      {
                          product.data.result.map((data, index)=>{
                            console.log('data', data.Name)
                            return(
                            <p key={index}>
                                <div className="procard">
                                <img src={data.image} width = '200' height='150' onClick={()=>indData(data.uuid)}/>
                                
                                <p className="price">Product: {data.Name}</p>
                                <p>Quantity: {data.Quantity}</p>
                                <p className="price">MRP: {data.price}</p>
                                <p>Manufacturer: {data.Manufacturer}</p>
                                <p>Category: {data.categoryName}</p>
                                <p className="prorat"> Ratings &#9733;&#9733;&#9733;</p>
                                <button className="btn10" onClick={()=>indData(data.uuid)}>Buy Now</button>
                                </div>
                            </p>
                            )
                          })
                      }
                    </div><br></br><br></br>
                    <div className="top-home">
                <h5 className="top">Top Brands</h5><br></br>
                <div className="imRow">
                <div className="col-home">
                <img className="grid-home" src="https://admin.pharmingo.com/assets/category/catimg/1611212007.png"/><br></br>
                <small className="g1">Dabur</small>
                </div>
                <div className="col-home">
                <img className="grid-home" src="https://m.media-amazon.com/images/I/71jCQwbl4QL._SL1134_.jpg"/><br></br>
                <small className="g1">Himalaya</small>
                </div>
                <div className="col-home">
                <img className="grid-home" src="https://www.passionateinmarketing.com/wp-content/uploads/2022/01/ColgatePalmolive-products-shutterstock_636702274.jpg"/><br></br>
                <small className="g1">Colgate</small>
                </div>
                <div className="col-home">
                <img className="grid-home" src="https://img.etimg.com/thumb/msid-63500343,width-1200,height-900/industry/cons-products/fmcg/nestle-unilever-in-list-of-suitors-for-gsks-horlicks.jpg"/><br></br>
                <small className="g1">Horlicks</small>
                </div>
                </div>
            </div><br></br><br></br>
            <div>
              <img className="img2" src="https://static2.medplusmart.com/live/bannerImage/Mart/29121cd623e0776e2d04410ab2481581.jpg"/>
              <img className="img2" src="https://static2.medplusmart.com/live/bannerImage/Mart/881d1db6abd82a948cd40687aff215ea.jpg"/>
              <img className="img2" src="https://static2.medplusmart.com/live/bannerImage/Mart/02dfa58cb94477a16ee2dff3f41d35a3.jpg"/>
              <img className="img2" src="https://static2.medplusmart.com/live/bannerImage/Mart/9ed6c192ebcf30b3f2286d5c08c25ed5.jpg"/>
            </div>
        </>
    )
}
}

export default AllProducts;