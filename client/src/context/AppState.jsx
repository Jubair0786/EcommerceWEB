import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


const AppState = (props) => {
  const url = "http://localhost:5004/api";
   

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState([false]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState({});


    
    useEffect(() => {
      const fetchProduct = async () => {
        const api = await axios.get(`${url}/product/all`,{
          headers: {
            'Content-Type': 'Application/json',
          },
          withCredentials: true,
        })
        console.log(api.data.products);
        setProducts(api.data.products);
        setFilteredData(api.data.products);
        userProfile();
      }

      fetchProduct()
      userCart();
      getAddress();
      user_Order();
    },[token,reload]);


    useEffect(() => {

      let lstoken = localStorage.getItem("token");
      //console.log(lstoken);

      if(lstoken){
        setToken(lstoken)
        setIsAuthenticated(true)
      }

      //setToken(localStorage.getItem("token"))
      
    }, []);
    //registeruser
    const register = async (name,contact,email,password) => {
      const api = await axios.post(`${url}/user/register`,{name,contact,email,password},{
        headers: {
          'Content-Type': 'Application/json',
        },
        withCredentials: true,
      })
      //alert(api.data.message)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return api.data
      //console.log("user register",api);
      
    };

    //loginuser

    const login = async (email,password) => {
      const api = await axios.post(`${url}/user/login`,{email,password},{
        headers: {
          'Content-Type': 'Application/json',
        },
        withCredentials: true,
      })
      //alert(api.data.message)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      
      //console.log("user login",api.data);
      setToken(api.data.token)
      setIsAuthenticated(true)
      localStorage.setItem("token",api.data.token)
      return api.data
    };

    //logout user
    const logout =  () => {
      setIsAuthenticated(false)
      setToken(null)
      localStorage.removeItem("token")
      toast.success("Logout Successfully", {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

    //USER PROFILE
    const userProfile = async () => {
      const api = await axios.get(`${url}/user/profile`,{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
      //console.log("user profile",api.data);
      setUser(api.data.user)
      
    }

    //add to cart
    const addToCart = async (productId, title, price, qty, imgSrc) => {
      const api = await axios.post(`${url}/cart/add`,{productId, title, price, qty, imgSrc},{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })

      setReload(!reload)
      //console.log(" my cart", api);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

    //user Cart
    const userCart = async () => {
      const api = await axios.get(`${url}/cart/user`,{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
      //console.log("user Cart",api.data.cart);
      setCart(api.data.cart)
      //setUser("user Cart",api)
    }
    //decrease quantity
    const decreaseQty = async (productId, qty) => {
      const api = await axios.post(`${url}/cart/--qty`,{productId, qty},{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
      setReload(!reload)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      //console.log("decrease Cart item",api);
      //setUser("user Cart",api)
    }
    //remove item from cart
   
    const removeFromCart = async (productId) => {
      const api = await axios.delete(`${url}/cart/remove/${productId}`,{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
      setReload(!reload)
     // console.log("remove item from cart",api);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      //console.log("decrease Cart item",api);
      //setUser("user Cart",api)
    }
    //clear cart
    const clearCart = async () => {
      const api = await axios.delete(`${url}/cart/clear`,{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
      setReload(!reload)
      //console.log("clear cart",api);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      //console.log("decrease Cart item",api);
      //setUser("user Cart",api)
    }
//Shipping Address
    const ShippingAddress = async (fullName, address, city, state, country, pinCode, phoneNumber) => {
      const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pinCode, phoneNumber},{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
      setReload(!reload)
      //console.log("clear cart",api);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        return api.data
      //console.log("decrease Cart item",api);
      //setUser("user Cart",api)
    }

    //get User latest address
    const getAddress = async () => {
      const api = await axios.get(`${url}/address/get`,{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
     // console.log("user address",api.data.userAddress);
      
     setUserAddress(api.data.userAddress)
    
    }
    //get User order
    const user_Order = async () => {
      const api = await axios.get(`${url}/payment/userorder`,{
        headers: {
          'Content-Type': 'Application/json',
          "Auth":token
        },
        withCredentials: true,
      })
     //console.log("user order",api.data);
      
     setUserOrder(api.data)
    
    }
    console.log("user order =",userOrder);
    

  return (<AppContext.Provider value={{products,register,login,url,token,isAuthenticated,
    setIsAuthenticated,filteredData, setFilteredData,logout,user,addToCart,cart,decreaseQty,
    removeFromCart,clearCart,ShippingAddress,userAddress,userOrder}}>
      {props.children}</AppContext.Provider>
  )
}

export default AppState;
