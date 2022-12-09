import { useEffect } from 'react';
import { useState } from 'react';
import CheckoutCard from '../components/CheckoutCard';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import api from '../services/api';
import { milesSeparator } from '../utils';
import { useNavigate } from 'react-router-dom';

const CheckoutScreen = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const onCheckoutClick = () => {
    api.carts
      .checkout(cart.id)
      .then((res) => {
        console.log(res);
        if (res.meta.status === 'success') {
          window.location.replace(res.debt.payUrl);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    api.carts
      .getActiveCart()
      .then((res) => {
        setCart(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="login-container " style={{ backgroundColor: '#235e6f' }}>
      <Header />
      <div className="vh-100">
        {loading ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Spinner />
          </div>
        ) : (
          <div className="container-fluid row py-5">
            <div className="col">
              <h4 style={{ color: 'white' }}>Tu carrito</h4>
              {cart.details.map((el, index) => (
                <CheckoutCard key={index} data={el} />
              ))}
            </div>
            <div className="col">
              <h4 style={{ color: 'white' }}>Total {milesSeparator(cart.total_price)} Gs.</h4>

              <button className="btn btn-primary mb-1" style={{ width: '80%' }} onClick={onCheckoutClick}>
                Proceder al pago
              </button>
              <button className="btn btn-secondary" style={{ width: '80%' }} onClick={() => navigate('/products')}>
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutScreen;
