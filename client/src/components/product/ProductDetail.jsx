import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './RelatedProduct';

const ProductDetail = () => {
    const [product, setProduct] = useState();
    const { id } = useParams();
    const url = "http://localhost:5004/api";
   
      useEffect(() => {
        const fetchProduct = async () => {
          const api = await axios.get(`${url}/product/${id}`,{
            headers: {
              'Content-Type': 'Application/json',
            },
            withCredentials: true,
          })
          //console.log(api.data.products);
          setProduct(api.data.product)
         // setProducts(api.data.products)
        }
  
        fetchProduct()
      },[id]);
  return (
  <>
  <div className="container text-center my-5" style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
    <div className="left">
      <img src={product?.imgSrc} alt=""style={{width:"450px",height:"450px", borderRadius:"10%",border:"1px solid red"}} />
    </div>
    <div className="right">
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <h1>{product?.price}<span>₹</span>
      </h1>
     {/* <h3>{product.category}</h3>*/}
      <div className='my-5'>
      <button className='btn btn-warning' style={{fontWeight:"bold",color:"black",border:"1px solid red"}}>Add to Cart</button>
      <button className='btn btn-danger mx-3' style={{fontWeight:"bold",color:"black",border:"1px solid red",backgroundColor:"green"}}>Buy Now</button>
      </div>
    </div>
  </div>

  <RelatedProduct category={product?.category} />
  
   </>
  )
  

}

export default ProductDetail
