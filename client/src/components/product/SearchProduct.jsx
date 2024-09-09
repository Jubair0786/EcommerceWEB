import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const {term} = useParams();

  useEffect(() => {
    setSearchProduct(
      products.filter(
        (data) => data?.title?.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, products]);

  return (
    <div className="container text-center">
      <h1 className="my-5"  style={{color:"red",fontSize:"40px",fontWeight:"bold",backgroundColor:"gray"}}>Searchd Products</h1>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {searchProduct?.map((product) => (
            <div key={product._id} className="my-4 col-md-3 d-flex justify-content-center align-items-center">
              <div className="card bg-dark text-light text-center" style={{ width: '18rem' }}>
                <Link
                  to={`/product/${product._id}`} // Corrected template literal
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title} // Improved alt text
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '10%',
                      border: '1px solid red',
                    }}
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {product.price} ₹
                    </button>
                    <button className="btn btn-warning">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
