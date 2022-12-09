import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
const ProductListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.products.getMulti().then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="login-container " style={{ backgroundColor: '#235e6f' }}>
      <Header />
      {loading ? (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
          <div className="d-flex ">
            {products.map((el) => (
              <ProductCard key={el.id} data={el} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
