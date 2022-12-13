import React from "react";
import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";



function Addpro(){
    const navigate = useNavigate();
    const[Name, setName] = useState();
    const[price, setPrice] = useState();
    const[quality, setQuantity] = useState();
    const[expiryDate, setexpiryDate] = useState();
    const[Manufacturer, setManufacturer] = useState();
    const[image, setimage] = useState();
    const[categoryName, setcategoryName] = useState();
    const[categoryuuid, setcategoryuuid] = useState();
    const[AdminUuid, setAdminUuid] = useState();


    const addproduct=()=>{
        let token = localStorage.getItem('token')
        let product={
            Name:Name,
            price:price,
            quality:quality,
            expiryDate:expiryDate,
            Manufacturer:Manufacturer,
            image:image,
            categoryName:categoryName,
            categoryuuid:categoryuuid,
            AdminUuid:AdminUuid
        }
         axios.post('http://localhost:3030/api/v3/product/addPro', product,
         {headers:{'token':token}}).then(pro=>{
            console.log('added product', pro)
            if(pro.status == 200){
                Swal.fire({
                    title: "ADDED!",
                    text: "New Product Added",
                    icon: "success"
                })
                navigate('/dashboard')
            }else{
                console.log('err')
            }
         })

    }

    return(
        <>
        <div className="updatepro-card">
            <div className="proup">
            <h4>Add New Product</h4>
            <div className="user-form">
            <label className="user-label">Product Name:</label>
            <input className="user-input" type='text' onChange={(text)=>setName(text.target.value)}></input>
            <label className="user-label">MRP:</label>
            <input className="user-input" type='text' onChange={(text)=>setPrice(text.target.value)}></input>
            <label className="user-label">Quantity:</label>
            <input className="user-input" type='text'  onChange={(text)=>setQuantity(text.target.value)}></input>
            <label className="user-label">manufacturer:</label>
            <input className="user-input" type='text' onChange={(text)=>setManufacturer(text.target.value)}></input>
            <label className="user-label">ExpiryDate:</label>
            <input className="user-input" type='text' onChange={(text)=>setexpiryDate(text.target.value)}></input>
            </div>
            </div>
            </div>
            <div className="product-up">
            <label className="user-label">Categoryuuid:</label>
            <input className="user-input" type='text' onChange={(text)=>setcategoryuuid(text.target.value)}></input>
            <label className="user-label">CategoryName:</label>
            <input className="user-input" type='text'  onChange={(text)=>setcategoryName(text.target.value)}></input>
            <label className="user-label">AdminUuid:</label>
            <input className="user-input" type='text'  onChange={(text)=>setAdminUuid(text.target.value)}></input>
            <label className="user-label">image:</label>
            <input className="user-input" type='text'  onChange={(text)=>setimage(text.target.value)}></input>
            <button className="updatePro-btn" type="submit" onClick={addproduct}>confirm</button>
            </div>
        </>
    )
}

export default Addpro;