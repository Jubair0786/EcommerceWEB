import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import AppContext from '../../context/AppContext';

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate(); // Correctly use useNavigate
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, contact, email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, contact, email, password);

    if (result?.success) { // Ensure result has a success property
      navigate('/login');
    } 
      
    //console.log(formData);
  };

  return (
    <>
      <div className="container my-5 p-3" style={{ width: '500px', border: '1px solid red', borderRadius: '10px' }}>
        <h1 className="text-center">*User Register*</h1>
        <form onSubmit={submitHandler} className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Contact</label>
            <input
              name="contact"
              value={formData.contact}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail4"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
