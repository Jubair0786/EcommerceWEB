import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import axios from 'axios';
import TableProduct from './TableProduct';
import {useNavigate} from 'react-router-dom'// Ensure the correct import path and no curly braces

const Checkout = () => {
  const { cart,userAddress,url,user , clearCart} = useContext(AppContext);

  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()
 
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart?.items[i].qty
        price += cart?.items[i].price
      }
    }
      setQty(qty)
      setPrice(price) 
    
  }, [cart])

  const handlePayment = async () => {
    try{
      const orderRepons = await axios.post(`${url}/payment/checkout`,{
        amount:price,
        qty:qty,
        cartItem : cart?.items,
        userShipping : userAddress,
        userId : user._id
      })
     console.log("orderRepons",orderRepons)
     const {orderId,amount:orderAmount} = orderRepons.data

     var options = {
      "key": "rzp_test_DWYpvmocq5ZzsL", // Enter the Key ID generated from the Dashboard
      "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "web Dev Mastery",
      "description": "web Dev Mastery",
      
      "order_id":orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response){
        const paymentData = {
          orderId:response.razorpay_order_id,
          paymentId:response.razorpay_payment_id,
          signature:response.razorpay_signature,
          amount:orderAmount,
          orderItems:cart?.items,
          userId : user._id,
          userShipping : userAddress
        }

        const api = await axios.post(`${url}/payment/verify-payment`,paymentData);
        console.log("razorpay res",api.data)

        if(api.data.success === true){
          clearCart();
          navigate('/orderconfirmation')
       
        }
      },
      "prefill": {
          "name": "Web Dev Mastery",
          "email": "webdevmastery@gmail.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "kharar Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();




    }catch(error){
      console.log(error)
    }
  }

  
  // Fetch the cart from context

  return (
  <>
    <div className="container my-5">
      <h1 className="text-center">Order Summary</h1>

      <table className="table table-bordered border-primary bg-dark">
  <thead className='bg-dark'>
    <tr>
      <th scope="col" className='bg-dark text-light text-center'>Product Details</th>
    
      <th scope="col" className='bg-dark text-light text-center'>Shipping Address</th>
    </tr>
  </thead>
  <tbody className='bg-dark'>
    <tr>
      
      <td className='bg-dark text-light'>


      <TableProduct cart={cart}/>

      </td>
      <td className='bg-dark text-light'>

        <ul style={{fontWeight: "bold"}}>
          <li>Name:{" "} {userAddress?.fullName}</li>
          <li>Phone:{" "} {userAddress?.phoneNumber}</li>
          <li>City:{" "} {userAddress?.city}</li>
          <li>State:{" "} {userAddress?.state}</li>
          <li>Country:{" "} {userAddress?.country}</li>
          <li>PinCode:{" "} {userAddress?.pinCode}</li>
          <li>Near By:{" "} {userAddress?.address}</li>
        </ul>
      </td>
    
    </tr>
  
  </tbody>
</table>
    -
       
    </div>
    <div className="container text-center my-5">
      <button className="btn btn-secondary btn-lg " style={{fontWeight: "bold"}}
      onClick={handlePayment}>Procced To Pay</button>

    </div>
  </>
    
  );
};

export default Checkout;
