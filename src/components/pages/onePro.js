import React from "react";
import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";

const Oneproduct=()=>{
    const {state} = useLocation();
    const navclick = useNavigate();
    console.log("state", state)
    let uuid = state[0].uuid;
    console.log('uuid', uuid)
    let Name = state[0].Name;
    let price = state[0].price;
    let quantity = state[0].quantity;
    let categoryuuid = state[0].categoryuuid;
    let categoryName = state[0].categoryName;
    let AdminUuid = state[0].AdminUuid;
    let Manufacturer = state[0].Manufacturer;
    let expiryDate = state[0].expiryDate;
    let image = state[0].image;
    // console.log('name', Manufacturer)
    const [name, setName] = useState(Name);
    const [Price, setPrice] = useState(price);
    const[Quantity, setQuantity] = useState(quantity);
    const [Categoryuuid, setcategoryuuid] = useState(categoryuuid);
    const [CategoryName, setcategoryName] = useState(categoryName);
    const [adminUuid, setAdminUuid] = useState(AdminUuid);
    const[manufacturer, setManufacturer] = useState(Manufacturer);
    const[ExpiryDate, setexpiryDate] = useState(expiryDate);
    const [Image, setimage]= useState(image);
    const[update, setUpdate]= useState('')
    const { addItem, totalUniqueItems} = useCart();
    const [item,setItem] = useState(state);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    console.log(role)


    const updatePro =()=>{
        console.log('update')
        let Productdetail = {
        uuid:uuid,
        Name:name,
        price:Price,
        quantity:Quantity,
        categoryuuid:Categoryuuid,
        categoryName:CategoryName,
        AdminUuid:adminUuid,
        Manufacturer:manufacturer,
        expiryDate:ExpiryDate,
        image:Image
        }
        axios.put('http://localhost:3030/api/v3/product/updatePro', Productdetail).then(updated=>{
            console.log('update', updated)
            setUpdate(updated)
            console.log('status',updated.data.status)
            if(updated.status == 'success'){
                Swal.fire({
                    title: "Update",
                    text: "Product Updated!",
                    icon: "success"
                })
                navigate('/dashboard')
            }
        })
     }
    
    function addTocart(){
        addItem(item[0]);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'added to Cart',
            showConfirmButton: false,
            timer: 1500
          })
    
    }


    const total = (uuid)=>{
        axios.get(`http://localhost:3030/api/v5/cart/order?uuid=${uuid}`).then(data=>{
            console.log("total", data.data)
            if(data.data.status = "success"){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'added to Cart',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/cart', {state:data.data})
            }
        })
    }

    const cart =()=>{
        const uuid = localStorage.getItem('uuid')
        console.log('uuid', uuid)
        console.log('productuuid', state[0].uuid)
        console.log('Name', state[0].Name)
        console.log('price', state[0].price)

        let add = {
            productuuid : state[0].uuid,
            Name: state[0].Name,
            image: state[0].image,
            Quantity: 1,
            price: state[0].price
        }

        axios.post(`http://localhost:3030/api/v5/cart/addCart?useruuid=${uuid}`, add).then(result=>{
            console.log('result', result)
            console.log('result', result.data.result.uuid)
            let uuid = result.data.result.uuid
            total(uuid)
        }).catch(err=>{
            console.log("err",err.message)
        })
    }
    
  

    const deletePro =()=>{
        axios.delete(`http://localhost:3030/api/v3/product/deletePro?uuid=${state[0].uuid}`).then(del=>{
            console.log('deleted', del)
            if(del.status == 200){
                Swal.fire({
                    title: "DELETE!",
                    text: "product deleted",
                    icon: "success"
                })
                navigate('/dashboard')
            }else{
                console.log('err')
            }
        })
    }
     

    

    const logout =()=>{
        let uuid = localStorage.getItem('uuid')
        console.log('uuid-state', uuid)
        axios.post(`http://localhost:3030/api/v1/user/logout?uuid=${uuid}`).then(data=>{
            console.log('log', data.status)
            console.log('logout', data.data.result)
            if(data.status == 200){
                Swal.fire({
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


    if(update){
         return(
            <>
            <div className="updatepro-card">
            <div className="proup">
            <h4>Product Update</h4>
            <div className="user-form">
            <label className="user-label">Product Name:</label>
            <input className="user-input" type='text' value={name} onChange={(text)=>setName(text.target.value)}></input>
            <label className="user-label">MRP:</label>
            <input className="user-input" type='text' value={Price} onChange={(text)=>setPrice(text.target.value)}></input>
            <label className="user-label">Quantity:</label>
            <input className="user-input" type='text' value={Quantity} onChange={(text)=>setQuantity(text.target.value)}></input>
            <label className="user-label">manufacturer:</label>
            <input className="user-input" type='text' value={manufacturer} onChange={(text)=>setManufacturer(text.target.value)}></input>
            <label className="user-label">ExpiryDate:</label>
            <input className="user-input" type='text' value={ExpiryDate} onChange={(text)=>setexpiryDate(text.target.value)}></input>
            </div>
            </div>
            </div>
            <div className="product-up">
            <label className="user-label">Categoryuuid:</label>
            <input className="user-input" type='text' value={Categoryuuid} onChange={(text)=>setcategoryuuid(text.target.value)} disabled='true'></input>
            <label className="user-label">CategoryName:</label>
            <input className="user-input" type='text' value={CategoryName} onChange={(text)=>setcategoryName(text.target.value)} disabled='true'></input>
            <label className="user-label">AdminUuid:</label>
            <input className="user-input" type='text' value={adminUuid} onChange={(text)=>setAdminUuid(text.target.value)} disabled='true'></input>
            <button className="updatePro-btn" type="submit" onClick={updatePro}>confirm</button>
            </div>
            </>
         )
    }else{
    return(
        <>
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
          <li className="li-home" onClick={()=>navigate('/cart')}>Cart [<span className="total-cart">{totalUniqueItems}</span>]</li>
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
            
                <div className="card5">
                 <div className="sim0">   
                 <img className="sim" src={item[0].image} width = '350' height='300'/> 
                 </div>
                <div className="detail">
                <h4 className="prices">Product: {item[0].Name}</h4>
                <h5>Quantity: {item[0].quantity}</h5>
                <h4 className="prices">MRP: {item[0].price}</h4>
                <h5>Manufacturer: {item[0].Manufacturer}</h5>
                <h5>Category: {item[0].categoryName}</h5>
                <h6>Ratings: &#9733;&#9733;&#9733;</h6>
                {/* <button className="btn12" onClick={cart} >add to cart</button> */}
                {role == 'user'? <div id="show-user">
                <button className="btn12" onClick={()=>addTocart()}>add to cart</button>
                </div> : <div id="show-admin">
                <button className="btn12-2" onClick={()=>deletePro()}>delete</button>
                <button className="btn12-1" onClick={()=>updatePro()}>update</button>
                <button className="btn12" onClick={()=>addTocart()}>add to cart</button>
                </div>}
                </div>
                {/* <td><button className="proh" onClick={()=>navigate('/cart', {state:state})} >add to cart</button></td> */}
                </div><br></br>
                <hr></hr><br></br><br></br>
                <div className="pro-pro">
                <img className="locat5" src="https://static.thenounproject.com/png/1953232-200.png" 
                    onClick={()=>window.location.href = '/map'}/><h5 className="near">NearbyStores</h5>
                <img className="locat6" src="https://graphicriver.img.customer.envatousercontent.com/files/294647233/preview.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=a7966c928d408752fa2bf9c1ea1e237e"/>    
                <h5 className="near2">Delivery option<br></br>Delivery in 2hrs</h5><br></br><hr></hr><br></br><br></br>
                <samll><h5><b>About MedPlusMart:</b></h5><br></br>
                <b>MedPlus:</b> One of the most trusted gateways to medicines and general provision
                With an aim to eradicate fake and ineffective medicines, and supply high-quality medicines in India, MedPlus was launched in 2006 in Hyderabad. According to WHO research, every 1 or 2 in 10 medicines are proven to be adulterated in low/medium income countries like India and MedPlus aspires to bring about a change in this statistic. To encourage and elevate transparency in the functioning of 
                the pharmaceutical industry, MedPlus has been successfully contributing in providing genuine and unadulterated medicines since its inception. Currently operating in 300+ cities, with 1500+ offline stores in India, MedPlus is the second largest pharmacy chain in India today. Welcome to a seamless and impeccable shopping experience!<br></br><br></br>
                <b>6 Reasons for you to Shop from MedPlus:</b><br></br>
                <li><b>Authentic medicines:</b> Be 100% assured of receiving genuine medicines</li>
                <li><b>Monthly provisions:</b>One stop store for both medicines as well as monthly provisions (kiraana)</li>
                <li><b>Quick to-door deliveries:</b> We ensure the delivery of well-packaged products to your doorstep at quick timelines.</li>
                <li><b>Pocket-friendly:</b>Our range of discounts, offers and deals will allow you to go economical everyday, everytime. We recommend you to explore <u>Payback Special Sale</u>, our special saving scheme.</li>
                <li><b>Customer-friendly:</b>Order from the comfort of your sofa with our easy browsing and smooth billing procedure. Our hassle-free <u>Upload</u> option allows you to seamlessly upload online and have your medicines delivered to you!</li>
                <li><b>Track and Re-Order:</b>Conveniently refer to all your previous bills and orders which will allow you to re-order with a single click.</li><br></br>
                <center>Also, for those of you who prefer offline shopping,<u onClick={()=>window.location.href = '/map'}>locate your nearest store</u> and get going!</center>
                </samll><br></br>
                <div>
                <h5><b className="rat">User Ratings</b>
                <img className="star" src ='https://static.vecteezy.com/system/resources/previews/002/634/912/original/star-rating-template-set-with-percent-bar-charts-vector.jpg' width='700' height='500'/>
                </h5>
                </div>
                </div>
            <hr></hr>
            <footer>
                <div className="last">
                    <h5 className="pay"><b className="pay2">Payments</b></h5>
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
    )}
}

export default Oneproduct;