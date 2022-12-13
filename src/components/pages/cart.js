import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "../hookcom/silder1";
import swal from "sweetalert2";
import { useCart } from 'react-use-cart';

function Cart (){
    let role = localStorage.getItem('role')
    const navigate = useNavigate();
    // const {state} = useLocation();
    // console.log('state', state)

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


    const {isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart
    } = useCart();
    
    // const remove = async()=>{
    //   const cancel = axios.
    // }


if(isEmpty){
    return(
        <>
        <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button" >&#128269;</button>
        </form> {role == 'admin'? <li className="list-home" onClick={()=>window.location.href='/dashboard'}>Dashbord</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='#'}>Cart [<span className="total-cart">{totalUniqueItems}</span>]</li>
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
        
        <div className="empty-cart"></div>
        <h4 className="cart-empty">YOUR CART IS EMPTY</h4>
        <h5 className="cart-empty-shop">Shop Now...!</h5>
        <button className="cart-empty-btn" onClick={()=>window.location.href='/home'}>Buy Now</button>
        </>
    )
}

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
        </form> {role == 'admin'? <li className="list-home" onClick={()=>window.location.href='/dashboard'}>Dashbord</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='#'}>Cart [<span className="total-cart">{totalUniqueItems}</span>]</li>
          <li className="li-homes" onClick={()=>window.location.href='/home'}>Home</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/home'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
        </ul>
        </nav>
        </div></div>       
        </header>
        </div>
        
            <hr></hr>

            <h3 className="cartH5">Shopping Cart ({totalUniqueItems})</h3>
               {
                    items.map((data, index)=>{
                        return(
                            <>
                            <div key={index}>  
                            <div className="products">
                            <div className="product">
                            <img className="cart-images" src={data.image} width = "50" height="25"/>
                            <div className="product-info">
                            <h3 className="product-name">Product: {data.Name}</h3>
                            <h3 className="product-name">Price: ₹{data.price}</h3>
                            <h5 className="product-quantity">Quantity ({data.quantity})</h5>
                            <button className="btn-btn" onClick={()=>updateItemQuantity(data.id, data.quantity -1)}> - </button>
                            <button className="btn-btns" onClick={()=>updateItemQuantity(data.id, data.quantity +1)}> + </button>
                            <p className="product-remove">
                            <p className="remove-rem" onClick={()=>removeItem(data.id)}>Remove</p>
                            </p>
                            </div>
                            </div>
                            </div>
                            </div>
                            </>
                          )
                        })
                    }

                                                       

                <div className="line-code"></div>
                <div className="cart-total">
			    <p>
                <span className="tot-pri">Total Price</span>
			    <span>₹ {cartTotal}</span>
			    </p>
			    <button className="clear-cart" onClick={()=>emptyCart()}>Clear All</button>
		        </div>
                <div className="btn-up">
                <button className="buy-now" onClick={()=>navigate('/payment', {state:cartTotal})}>BUY NOW</button>
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
            </div><br></br>

            <Slider/>
     
    </>
)
}
export default Cart;