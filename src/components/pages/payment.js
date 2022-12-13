import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'braintree-web'
import DropIn from "braintree-web-drop-in-react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Payment (){
    // const {state} = useLocation();
    // console.log('cart', state)
    const[pay, setPay] = useState({
        clientToken:null,
        success:'',
        error:'',
        instance:""
    });

    const {clientToken,instance}=pay
    console.log('pay', pay)

    useEffect(() => {
        try {
            axios.get('http://localhost:3030/api/v6/pay/tokenGenerate').then(data=>{
                console.log('result', data)
                console.log('token', data.data.token)
                setPay({clientToken:data.data.token})
            }).catch(err=>{
                console.log('err', err)
            })
        } catch (error) {
            console.log('error found', error)
        }
      }, []);

      const transaction =()=>{
        try {
            instance.requestPaymentMethod().then(nonceData=>{
                console.log("nounceData", nonceData);
                if(nonceData){
                    let data= {
                        // amount: state,
                        amount: 50,
                        paymentMethodNonce: nonceData.nonce
                    }
                    console.log('datas', data)
                    axios.post('http://localhost:3030/api/v6/pay/saleTransaction', data).then(resData=>{
                        console.log('resData', resData);
                    }).catch((err)=>{
                        console.log('err', err.message)
                    })
                }
            })
        } catch (error) {
            console.log('error', error.message)
        }
      }

  return(
   <>
   <div>
    <h5 className='text-center'><b>Payment Details</b></h5>
    {clientToken && (
    <div>
    <DropIn
        options={{ authorization: clientToken }}
        onInstance={(instance) =>setPay ({ ...pay,instance : instance})}
    />
    <div className="text-center">
    <button type="button" className="btn btn-info" onClick={()=>transaction()}>Buy</button><br></br>
    <button type="button" className="btn btn-info" onClick={()=>window.location.href='/home'}>Buy More</button>
    </div>
    </div>
    )}
    {!clientToken}
   </div>
   </>
  )
}
export default Payment

// visa no= 4000 0200 0000 0000