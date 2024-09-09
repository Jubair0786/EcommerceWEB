import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';

const TableProduct = ({cart}) => {

    const { decreaseQty,addToCart,removeFromCart,clearCart} = useContext(AppContext);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

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

  
  return (
    <>
      <table className="table table-bordered border-primary bg-dark text-center">
  <thead>
    <tr>
      <th scope="col" className='bg-dark text-light'>Product Img</th>
      <th scope="col" className='bg-dark text-light'>Title</th>
      <th scope="col" className='bg-dark text-light'>Price</th>
      <th scope="col" className='bg-dark text-light'>Qty</th>
      <th scope="col" className='bg-dark text-light'>Qty++</th>
      <th scope="col" className='bg-dark text-light'>Qty--</th>
      <th scope="col" className='bg-dark text-light'>Remove</th>

    </tr>
  </thead>
  <tbody>
    {cart?.items?.map((product) => (
    <tr key={product._id}>
      <th scope="row">
        <img
          src={product.imgSrc}
          alt={product.title}
          style={{ width: "50px", height: "50px" }}
        />
      </th>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.qty}</td>
      <td><span className="material-symbols-outlined" onClick={() =>
         addToCart(product?.productId, product.title, product.price/product.qty,1, product.imgSrc)}>add_circle</span></td>
      <td><span className="material-symbols-outlined" onClick={() =>
         decreaseQty(product?.productId,1)}>do_not_disturb_on</span></td>
      <td><span className="material-symbols-outlined" onClick={() =>
         { if(confirm("Are you sure you want to remove this product from cart?")){
         removeFromCart(product?.productId)}}}>delete</span></td>
      
    </tr>))}

    <tr>
      <th scope="row" className='bg-dark text-light'>
        <th scope="col" ><span className="material-symbols-outlined " style={{color:"red" ,fontSize:"30px",fontWeight:"bold"}}
         >hotel_class
        </span> <span class="material-symbols-outlined" style={{color:"orange" ,fontSize:"30px",fontWeight:"bold"}}>verified
        </span> <span className="material-symbols-outlined " style={{color:"red" ,fontSize:"30px",fontWeight:"bold"}}
         >hotel_class</span>
         </th>
        
      </th>
      <td><button className='btn btn-primary' style={{fontWeight:"bold"}}>Total</button></td>
      <td><button className='btn btn-warning'style={{fontWeight:"bold"}}>{price}</button></td>
      <td><button className='btn btn-info' style={{fontWeight:"bold"}}>{qty}</button></td>
      <td><span className="material-symbols-outlined"style={{color:"orange"}}>
           social_leaderboard
          </span></td>
      <td><span className="material-symbols-outlined"style={{color:"gold"}}>
           star_rate_half
          </span></td>
      <td><span className="material-symbols-outlined"style={{color:"red"}}>
           sentiment_very_dissatisfied
          </span></td>
      
    </tr>
    
  </tbody>
</table>
    </>
  )
}

export default TableProduct
