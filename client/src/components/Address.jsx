import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import AppContext from '../context/AppContext';

const Address = () => {
  const { ShippingAddress,userAddress } = useContext(AppContext);
  const navigate = useNavigate(); // Correctly use useNavigate
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phoneNumber: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {fullName, address, city, state, country, pinCode, phoneNumber} = formData;
 
  const submitHandler = async (e) => {
    e.preventDefault();
     
    const result = await ShippingAddress(
      fullName,
      address, 
      city, 
      state, 
      country, 
      pinCode, 
      phoneNumber);
      console.log("address added",result)
   
    if (result?.success) { // Ensure result has a success property
     navigate('/checkout'); } 
    setFormData({ fullName: '', address: '', city: '', state: '', country: '', pinCode: '', phoneNumber: '' });
      
    //console.log(formData);
  };

  return (
    <>
      <div className="container my-5 p-3" style={{ border: '1px solid red', borderRadius: '10px' }}>
        <h1 className="text-center">** Shipping Address **</h1>
        <form onSubmit={submitHandler} className="my-3">
      <div className="row">

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
            />
          </div> 
 
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
            />
          </div> 
 
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">State</label>
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputPassword1"
            />
          </div> 
      </div>

      <div className="row">

<div className="mb-3 col-md-4">
  <label htmlFor="exampleInputEmail1" className="form-label">City</label>
  <input
    name="city"
    value={formData.city}
    onChange={onChangeHandler}
    type="text"
    className="form-control bg-dark text-light"
    id="exampleInputEmail2"
    aria-describedby="emailHelp"
  />
</div> 

<div className="mb-3 col-md-4">
  <label htmlFor="exampleInputEmail1" className="form-label">Pincode</label>
  <input
    name="pinCode"
    value={formData.pinCode}
    onChange={onChangeHandler}
    type="number"
    className="form-control bg-dark text-light"
    id="exampleInputEmail3"
    aria-describedby="emailHelp"
  />
</div> 

<div className="mb-3 col-md-4">
  <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
  <input
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={onChangeHandler}
    type="number"
    className="form-control bg-dark text-light"
    id="exampleInputPassword1"
  />
  </div> 
 </div>
 <div className="row">
 <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Address/Nearby</label>
  <textarea class="form-control bg-dark text-light"
   name="address"
   type="text"
   value={formData.address}
   onChange={onChangeHandler}
   id="exampleInputPassword1" 
   rows="3"
   ></textarea>
</div>

 </div>


          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px', fontWeight: 'bold' }}>Submit</button>
          </div>
        </form>
        {userAddress &&(
        <div className="d-grid col-6 mx-auto my-3">
          <button className="btn btn-warning"
          onClick={() => navigate('/Checkout')} style={{ borderRadius: '10px', fontWeight: 'bold' }}>use old address</button>
        </div>)}
      </div>
    </>
  );
};

export default Address;