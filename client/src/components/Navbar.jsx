import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Video from '../assets/videos/advertisement.mp4';
import Video2 from '../assets/videos/advertisement2.mp4'; // Ensure these files exist

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  const filterbyCategory = (cat) => {
    if (cat === '') {
      setFilteredData(products);
    } else {
      const filtered = products.filter((data) => data.category.toLowerCase() === cat.toLowerCase());
      setFilteredData(filtered);
    }
  };

  const filterbyprice = (price) => {
    setFilteredData(products.filter((data) => data.price >= Number(price)));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/product/search/' + searchTerm);
    setSearchTerm('');
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to="/" className="left" style={{ textDecoration: 'none', color: 'white' }}>
            <h3>Goldi-Supplement</h3>
            <span className="material-symbols-outlined">house</span>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">travel_explore</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="btn btn-primary position-relative mx-3">
                  <span className="material-symbols-outlined">shopping_cart_checkout</span>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="btn btn-info mx-3">
                  Profile
                </Link>
                <button className="btn btn-danger mx-3" onClick={() => { logout(); navigate('/'); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary mx-3 bg-info">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname === '/' && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory('mobiles')}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory('laptops')}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory('supplements')}>
              Supplements
            </div>
            <div className="items" onClick={() => filterbyCategory('electronics')}>
              Electronics
            </div>
            <div className="items" onClick={() => filterbyCategory('cloths')}>
              Cloth's
            </div>
            <div className="items" onClick={() => filterbyCategory('cameras')}>
              Camera's
            </div>
            <div className="items" onClick={() => filterbyCategory('headphone')}>
              HeadPhone
            </div>
            <div className="items" onClick={() => filterbyCategory('vitamin')}>
              Vitamin
            </div>
            <div className="items" onClick={() => filterbyCategory('fitness')}>
              Fitness
            </div>
            <div className="items" onClick={() => filterbyCategory('books')}>
              Books
            </div>
            <div className="items" onClick={() => filterbyCategory('sports')}>
              Sports
            </div>
            <div className="items" onClick={() => filterbyCategory('toys')}>
              Toys
            </div>
            <div className="items" onClick={() => filterbyprice('15000')}>
              15000
            </div>
            <div className="items" onClick={() => filterbyprice('50000')}>
              50000
            </div>
            <div className="items" onClick={() => filterbyprice('100000')}>
              100000
            </div>
            <div className="items" onClick={() => filterbyprice('200000')}>
              200000
            </div>
          </div>
        )}
      </div>

      <div className="advertisement-header">
        <h4>Special Offer: Get 20% off on all supplements!</h4>
        <div className="video_container">
          <video
            src={Video}
            autoPlay
            loop
            muted
            controls
            className="left_advertisement-video"
          >
            Your browser does not support the video tag.
          </video>
          <video
            src={Video2}
            autoPlay
            loop
            muted
            controls
            className="right_advertisement-video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default Navbar;
