import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

const Profile = () => {
  const { user } = useContext(AppContext);

  // Debugging: Check if user data is received correctly

  return (
    <div className="container text-center my-5">
      {user ? (
        <>
          <h1 className="my-3" style={{color:"red",fontSize:"40px",fontWeight:"bold",backgroundColor:"gray"}}>***Welcome***</h1>
          <h2 >{user.name}</h2>
          <h3>{user.email}</h3>
          
        </>
      ) : (
        <h1>Loading user data...</h1> // Display a message if user data is missing
      )}
    </div>
  );
};

export default Profile;
