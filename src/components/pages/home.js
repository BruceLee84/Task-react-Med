import React from "react";
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import axios from "axios";
import SliderImage from "../hookcom/silder1";
import { useCart } from "react-use-cart";
import swal from "sweetalert2";

function Home(){
   const navigate = useNavigate();
   const { addItem, totalUniqueItems} = useCart();
   let role = localStorage.getItem('role');
   const [search, setSearch]=useState('');
   const [searchData, setSearchdata]= useState('');
   const [category, setCategory] = useState('');
   const [change, setOnchange]= useState('');
   const [product, setProduct]=useState('');


  
   useEffect(()=>{
    axios.get('http://localhost:3030/api/v2/category/getCat').then(result=>{
     console.log('result', result)
     console.log('result', result.data.result)
     setCategory(result);
    })
},[]) 


     
   const searchPro = async()=>{
      try {
        const data = await axios.get(`http://localhost:3030/api/v3/product/search?Name=${search}`)
        console.log('search', data.data.result)
        setSearchdata(data)
      } catch (error) {
        console.log('error', error.message)
      }
   }

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

const indData = async(data)=>{
  console.log("Product_id", data)
  const datas = await axios.get(`http://localhost:3030/api/v3/product/getIndPro?uuid=${data}`)
  setProduct(datas)
  if(product){ 
      console.log("Cat_Product")
      navigate ('/product:id',{state:datas.data.result})
  }}

    
   if(searchData){
    return(
        <>
        <div>
        <header>
        <div className="header-header">
          <div className="heads">
        <p className="med" onClick={()=>window.location.href ='/home'}>Medplus</p>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search" onChange={(text)=>setSearch(text.target.value)}/>
              <button className="sbtn" type="button" onClick={searchPro}>&#128269;</button>
        </form> {role == 'admin'? <li className="list-data" onClick={()=>window.location.href='/dashboard'}>Dashbord</li>: <li className="list-data" onClick={()=>window.location.href='/category'}>Category</li>}
        <ul>
        <li className="li-home" onClick={()=>window.location.href='/cart'}>Cart [<span className="total-cart">{totalUniqueItems}</span>]</li>
          <li className="li-homes" onClick={()=>window.location.href='/allproduct'}>Products</li>  
          <li className="drop">         
          <div className="dropdown">
          <button className="dropbtn" onClick={()=>navigate('/user')}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
        </ul>
        </nav>
        </div>
        </div>
        </header>
        
            <div className="gridSea">
                  {
                    searchData.data.result.map((data, index)=>{
                        console.log('product', data.Name)
                        return(
                            <>
                            <div className="seacard">
                            <p key={index}>
                            <img onClick={()=>indData(data.uuid)} src={data.image} width = '200' height='150'/><br></br>
                            <small>Product:{data.Name}</small><br></br>
                            <small>MRP: {data.price}</small><br></br>
                            <small>Quantity: {data.Quantity}</small><br></br>
                            <small> Ratings &#9733;&#9733;&#9733;</small>
                            <button className="btn10" onClick={()=>indData(data.uuid)}>Buy Now</button>
                            </p>
                            </div>
                            </>
                        )
                    })
                  }
                  </div>
                  {/* </tbody>
               </table> */}
               <br></br><hr></hr><br></br><br></br>
             
              {/* <div> */}
                {/* <img className="img" src="https://static2.medplusmart.com/live/bannerImage/Mart/b8c4d65cb30e23a596bd6119755c1236.jpg"/> */}
                {/* <img className="img" src="https://tm-storage-bucket-prod.s3.ap-south-1.amazonaws.com/Images/Content/Med_Web.jpg"/><br></br><br></br><br></br><br></br> */}
                {/* <img className="img" src="https://tm-storage-bucket-prod.s3.ap-south-1.amazonaws.com/Images/Content/Doctor_Web.jpg"/> */}
              {/* </div><br></br><br></br> */}
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
            
        </div>
        </>
    )
   }else if(category){
    return(
        <>
        <div>
        <header>
        <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search" onChange={(text)=>setSearch(text.target.value)}/>
              <button className="sbtn" type="button" onClick={searchPro}>&#128269;</button>
        </form> {role == 'admin'? <li className="list-data" onClick={()=>window.location.href='/dashboard'}>Dashbord</li>: <li className="list-data" onClick={()=>window.location.href='/category'}>Category</li>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/cart'}>Cart [<span className="total-cart">{totalUniqueItems}</span>]</li>
          <li className="li-homes" onClick={()=>window.location.href='/allproduct'}>Products</li>  
          <li className="drop">         
          <div className="dropdown">
          <button className="dropbtn" onClick={()=>navigate('/user')}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
        </ul>
        </nav>
        </div>
        </div>
        </header><br></br>
        <div className="body-body">
             <SliderImage/><br></br><br></br>
             <h5 className="top">Categories</h5>
            <div className="Cat-grid">
            <div className="grid-cat">
              {
                category.data.result.map((data, index)=>{
                  console.log('data', data.categoryName)
                  return(
                    <div key={index} onClick={()=>navigate('/product', {state:data})}>
                     <img className="catIm" src={data.image} width = '300' height='250'/>
                     <p className="catNe">{data.categoryName}</p>
                    </div>
                  )
                })
              }
              </div>
            </div>
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
        </div>    
        </div><br></br>
        <footer>
                <div className="last">
                    <h5 className="pay"><b>Payments</b></h5>
                    <img className="paym" src="https://www.dobotspain.es/wp-content/uploads/2021/03/payment-methods.png" width='900px' height='70px'/>
                    <img src="https://png.pngtree.com/png-vector/20210531/ourlarge/pngtree-cash-on-delivery-label-sign-car-box-png-image_3393405.jpg" width='90px'/>
                     <h6 className="part"><b>Partners</b></h6>
                     <a href="https://www.medplusmart.com/"><h6 className="medplus" >MedPlusMart</h6></a>
                     <h6 className="follow"><b>Follow us</b></h6>
                     <img className="foll" src="https://flyclipart.com/thumb2/follow-us-beach-realty-nc-774849.png" width='300px' height='50px'/>
                </div>
            <hr></hr>
                <h6 className="reserve">© 2022 MedPlus.com. All rights reserved.</h6>
                <hr></hr>
            </footer>
        </>
    )
    }
}

export default Home;