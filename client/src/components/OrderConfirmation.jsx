import React ,{useContext,useEffect,useState} from 'react'
import AppContext from '../context/AppContext'

const OrderConfirmation = () => {
  const{userOrder} = useContext(AppContext)
  const [latestOrder,setLatestOrder] = useState({})
  useEffect(() => {
  if(userOrder){
    setLatestOrder([userOrder])
  }
 
}, [userOrder])

console.log("latestOrder",latestOrder)

  return (
    <>
    <div className="container my-5">
      <h1 className='text-center'> your Order has been Confirmed</h1>
      <h3 className='text-center'>It will be delivered to soon</h3> 
    </div>

    <div className="container ">
      

      <table className="table table-bordered border-primary bg-dark">
  <thead className='bg-dark'>
    <tr>
      <th scope="col" className='bg-dark text-light text-center'>Order Items</th>
    
      <th scope="col" className='bg-dark text-light text-center'>Order-Details & Shipping-Address</th>
    </tr>
  </thead>
  <tbody className='bg-dark'>
    <tr>
      
      <td className='bg-dark text-light'>


     {/*<TableProduct cart={cart}/>*/}

      </td>
      <td className='bg-dark text-light'>

        <ul style={{fontWeight: "bold"}}>
         <li>Name:{" "} {latestOrder?.[0].orders?.[0].userShipping?.fullName}</li>
          <li>Phone:{" "} {latestOrder?.[0].orders?.[0].userShipping?.phoneNumber}</li>
          <li>City:{" "} {latestOrder?.[0].orders?.[0].userShipping?.city}</li>
          <li>State:{" "} {latestOrder?.[0].orders?.[0].userShipping?.state}</li>
          <li>Country:{" "} {latestOrder?.[0].orders?.[0].userShipping?.country}</li>
          <li>PinCode:{" "} {latestOrder?.[0].orders?.[0].userShipping?.pinCode}</li>
          <li>Near By:{" "} {latestOrder?.[0].orders?.[0].userShipping?.address}</li>
        </ul>
      </td>
    
    </tr>
  
  </tbody>
</table>
    
       
    </div>
    <div className="container text-center my-5">
      <button className="btn btn-secondary btn-lg " style={{fontWeight: "bold"}}
      >Continue Shopping</button>

    </div>
    </>
  )
}

export default OrderConfirmation
