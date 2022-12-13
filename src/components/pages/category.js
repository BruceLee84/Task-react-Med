import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { useCart } from 'react-use-cart'
// import CategoryProducts from './product';


function Category(){
    let role = localStorage.getItem('role')
    const [category, setCategory] = useState();
    const [product, setProduct]= useState();
    const [CategoryName, setCategoryName]=useState()
    const [Image, setImage] = useState();
    const [UserUuid, setUserUuid] = useState();
    // const [addItem, totalUniqueItems] = useCart();
    const {state} = useLocation();
    const navigate = useNavigate();
//    console.log('Cat_state', state)
//    const categoryData = async()=>{
//     const result= await axios.get('http://localhost:3030/api/v2/category/getCat')
//         console.log("category", result)
//         setCategory(result);
//          console.log('Cat', result.data.result)
//   }



    const allProdect = async()=>{
    const result = await axios.get('http://localhost:3030/api/v3/product/getAllPro')
    console.log('all product', allProdect)
    setProduct(result)
   }

      useEffect(()=>{
           axios.get('http://localhost:3030/api/v2/category/getCat').then(result=>{
            console.log('result', result)
            setCategory(result);
           })
      },[])     


    //   const userEdit =()=>{
    //     let userDetail = {
    //         uuid:uuid,
    //         categoryName: CategoryName,
    //         userUuid:UserUuid,
    //         image:Image
    //     }
    //     axios.put('http://localhost:3030/api/v2/category//updateCat', userDetail).then(res=>{
    //         console.log('res', res)
    //         // setUpdate(res)
    //         console.log('status', res.status)
    //         if(res.status == 200){
    //             swal.fire({
    //                 title: "profile updated",
    //                 text: "Login Again!",
    //                 icon: "success"
    //             })
    //             navigate('/')
    //         }
    //     })
    // }

      


   if(category){
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
              <button className="sbtn" type="button" >&#128269;</button>
              </form> {role == 'admin'? <li className="list-data">Dashbord</li>: <li className="list-data" onClick={()=>window.location.href='/home'}>Home</li>}
        <ul>
        <li className="li-home" onClick={()=>window.location.href='/cart'}>Cart [ ]</li>
          <li className="li-homes" onClick={()=>window.location.href='/allproduct'}>Products</li> 
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
        <body>
            <select className="sel">
                <option>Category</option>
                <option onClick={allProdect}>AllProducts</option>
            </select>
            <div className="up-cat">
            <div className="cat">
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
                        // <>
                        // <img className="catIm" src={state[0].image} width = '350' height='300'/>
                        // <p className="catNe">{state[0].categoryName}</p>
                        // </>
                    }
                </div>
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
        </body>
        </div>
    </>
   )
//    }else{
//     return(
//         <>
//          <div>
//       <header>
//             <div className="bord">
//                 <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
//                 <ul className="sign"><Link  className="log" to={'/signUp'}>Login/SignUp</Link></ul>
//             </div>
//             <div className="bgc">
//             <nav className="navbar">
//                 <div className="locate">
//                 <img className="locat" src="https://static.thenounproject.com/png/1953232-200.png" 
//                     onClick={()=>window.location.href = '/map'}/>    
//                 </div>
//                 <small className="locat2">Chennai, TamilNadu</small>    
//             <form>
//                     <input className="search" type="text" placeholder="Search.." name="search"/>
//                     <button className="sbtn" type="button">&#128269;</button>
//             </form>
//             <div className="nav2">   
//             <ul>
//             <li onClick={()=>window.location.href ='/home'}>Home</li>
//             <li onClick={()=>window.location.href ='/cart'}>Cart</li>
//             <li onClick={()=>window.location.href ='/order'}>Order</li>
//             </ul>
//             </div>
//             </nav>
//             </div>
//         </header>
//         </div>
//         <div>
            
//             <button onClick={categoryData} type="button">Category</button>
            
//         </div>
//         </>
//     )
}
}

export default Category;