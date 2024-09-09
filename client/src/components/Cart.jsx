import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom'; // Ensure the correct import path and no curly braces

const Cart = () => {
  const { cart, decreaseQty,addToCart,removeFromCart,clearCart} = useContext(AppContext);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  const navigate = useNavigate();

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
 // console.log("my cart",cart)
  
  // Fetch the cart from context

  return (
    <>
    {cart?.items?.length == 0 ? (
      <>
      <div className=' my-5  text-center'>
      <h1>Cart Is Empty Dear Coustomer</h1>
      <button className='btn btn-warning mx-3' style={{fontWeight:"bold",fontSize:"1.243m"}}
      onClick={() => navigate("/")}> 0 *Please Continue Shopping*  {qty}</button>
      </div>
      </>

    ) : (

    <>
    <div className=' my-5  text-center'>
      <button className='btn btn-info mx-3' style={{fontWeight:"bold",fontSize:"1.243m"}}>Total Qty :-  {qty}</button>
      <button className='btn btn-success mx-3' style={{fontWeight:"bold",fontSize:"1.243m"}}>Total Price :- {price}</button>
    </div>
    </>

    )}
    
    {cart?.items?.map((product) =>(<div key={product._id} className='container p-3 my-5 bg-light text-center'>
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <div className="card__img" >
          <img src={product.imgSrc} alt="" style={{width:"200px",height:"200px",borderRadius:"10%"}} />
        </div>
        <div className="card__des">
          <h2>{product.title}</h2>
          <h4>{product.price}</h4>
          <h4>Qty :- {product.qty}</h4>
        </div>
        <div>
          <button className='btn btn-warning mx-3' style={{fontWeight:"bold"}}
              onClick={() => decreaseQty(product?.productId,1)}>Qty--
          </button>
          <button className='btn btn-info mx-3' style={{fontWeight:"bold"}}
             onClick={() => addToCart(product?.productId, product.title, product.price/product.qty,1, product.imgSrc)}>Qty++
          </button>
          <button className='btn btn-danger mx-3' style={{fontWeight:"bold"}}
              onClick={() =>{
                if(confirm("Are you sure you want to remove this product from cart?")){
                removeFromCart(product?.productId)}}}>Remove{" "}</button>

        </div>

      </div>
    </div>)
      
    )} 
    {cart?.items?.length > 0 && (
    <div className="container text-center my-5">
      <button className="btn btn-warning mx-3" style={{fontWeight:"bold"}}
      onClick={() => navigate('/shipping')}>Checkout</button>
      <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}}
      onClick={() => {
        if(confirm("Are you sure you want to clear cart?")){
        clearCart()}}
      }>Clear Cart</button>
    </div>)}
    </>
  );
};

export default Cart;
