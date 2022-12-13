import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from 'react-use-cart';
import { Link } from "react-router-dom";
import swal from "sweetalert2";


const ProductData=()=>{
    const uuid = localStorage.getItem('uuid')
    const {state} = useLocation();
    const navigate = useNavigate();
    console.log('uuid', state.uuid);
    let role = localStorage.getItem('role')
    const [product, setProduct]=useState('');
    const { addItem, totalUniqueItems} = useCart();


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

    // const CategoryProducts = async()=>{
    //     const result = await axios.get('http://localhost:3030/api/v2/category/getOne',
    //     {params:{"categoryuuid":state.uuid}})
    //     setProduct(result)
    //     console.log('res', result.data.result)
    //  }

    useEffect(()=>{
        axios.get('http://localhost:3030/api/v2/category/getOne',
        {params:{"categoryuuid":state.uuid}}).then(result=>{
            setProduct(result)
            console.log('res', result.data.result)
        })
    },[])

     const allProdect = async()=>{
        const result = await axios.get('http://localhost:3030/api/v3/product/getAllPro')
        console.log('all product', allProdect)
        setProduct(result)
       }

    const indData = async(data)=>{
        console.log("Product_id", data)
        const datas = await axios.get(`http://localhost:3030/api/v3/product/getIndPro?uuid=${data}`)
        setProduct(datas)
        if(product){ 
            console.log("Cat_Product")
            navigate ('/product:id',{state:datas.data.result})
        }}   

  if(product){   
    return(
        <div>
        <header>
        <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button" >&#128269;</button>
        </form> {role == 'admin'? <li className="list-data">Dashbord</li>: <li className="list-data" onClick={()=>window.location.href='/category'}>Category</li>}
        <ul>
        <li className="li-home" onClick={()=>window.location.href='/cart'}>Cart [<span className="total-cart">{totalUniqueItems}</span>]</li>
          <li className="li-homes" onClick={()=>window.location.href='/allproduct'}>Products</li> 
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
          </header>
          <body>
                <div className="progrid">
                      {
                          product.data.result.map((data, index)=>{
                            console.log('data', data.Name)
                            return(
                            <p key={index}>
                                <div className="procard">
                                <img src={data.image} width = '200' height='150' onClick={()=>indData(data.uuid)}/>
                                
                                <p className="price">Product: {data.Name}</p>
                                <p>Quantity: {data.quantity}</p>
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

          </body>
          </div>
    )}
    // else{
    //  return(
    //     <div>
    //     <header>
    //           <div className="bord">
    //               <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
    //               <ul className="sign"><Link  className="log" to={'/signUp'}>Login/SignUp</Link></ul>
    //           </div>
    //           <div className="bgc">
    //           <nav className="navbar">
    //               <div className="locate">
    //               <img className="locat" src="https://static.thenounproject.com/png/1953232-200.png" 
    //                   onClick={()=>window.location.href = '/map'}/>    
    //               </div>
    //               <small className="locat2">Chennai, TamilNadu</small>    
    //           <form>
    //                   <input className="search" type="text" placeholder="Search.." name="search"/>
    //                   <button className="sbtn" type="button">&#128269;</button>
    //           </form>
    //           <div className="nav">   
    //           <ul>
    //           <li onClick={()=>window.location.href ='/home'}>Home</li>
    //           <li onClick={()=>window.location.href ='/cart'}>Cart</li>
    //           <li onClick={()=>window.location.href ='/order'}>Order</li>
    //           </ul>
    //           </div>
    //           </nav>
    //           </div>
    //       </header>
    //         <div>
    //             <button onClick={CategoryProducts}>Product</button><br></br><br></br>
    //             <button onClick={allProdect} type="button">Products</button>
    //         </div>
    //       </div>
    //  )
    // }
}

export default ProductData;