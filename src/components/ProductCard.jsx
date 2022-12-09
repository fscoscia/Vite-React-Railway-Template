import { useState } from 'react';
import batman from '../assets/car.png';
import bear from '../assets/bear.png';
import minion from '../assets/minion.png';
import api from '../services/api';
import Spinner from './Spinner';
import { milesSeparator } from '../utils';

const ProductCard = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(null);

  const changeQuantity = (action) => {
    if (action === '+') {
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    setLoading(true);
    api.orders
      .create({ product: data.id, quantity: quantity })
      .then((res) => {
        setIcon('success');
        setTimeout(() => {
          setLoading(false);
          setIcon(null);
        }, 3000);
      })
      .catch((e) => {
        setIcon('error');
        setTimeout(() => {
          setLoading(false);
          setIcon(null);
        }, 3000);
      });
  };

  return (
    <div className="card rounded-3 me-2" style={{ width: 400, overflow: 'hidden', border: 'none' }}>
      <img
        src={data.title === 'Batimóvil Lego' ? batman : data.title === 'Oso de peluche' ? bear : minion}
        style={{ height: 200, objectFit: 'cover' }}
        alt="batman"
      />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button className="btn btn-link px-2" onClick={() => changeQuantity('-')}>
              <i className="bi bi-dash"></i>
            </button>

            <input
              id="form1"
              min={1}
              name="quantity"
              value={quantity}
              type="number"
              className="form-control form-control-sm"
              style={{ maxWidth: 50 }}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />

            <button className="btn btn-link px-2" onClick={() => changeQuantity('+')}>
              <i className="bi bi-plus-lg"></i>
            </button>
            {!loading ? (
              <button className="btn btn-primary" onClick={addToCart}>
                <span>Añadir</span> <i className="bi bi-cart-fill"></i>
              </button>
            ) : icon === null ? (
              <Spinner />
            ) : icon === 'success' ? (
              <button className="btn btn-success">
                <span>Añadido</span> <i class="bi bi-cart-check-fill"></i>
              </button>
            ) : (
              <button className="btn btn-danger">
                <span>Intenta nuevamente</span> <i class="bi bi-cart-dash-fill"></i>
              </button>
            )}
            {/* <button className="btn btn-primary" onClick={addToCart}>
              {!loading ? (
                <>
                  <span>Añadir</span> <i className="bi bi-cart-fill"></i>
                </>
              ) : icon === null ? (
                <Spinner />
              ) : icon === 'success' ? (
                <>
                  <span>Añadido</span> <i class="bi bi-cart-check-fill"></i>
                </>
              ) : (
                <>
                  <span>Intenta nuevamente</span> <i class="bi bi-cart-dash-fill"></i>
                </>
              )}
            </button> */}
          </div>
          <div>
            <h4>{milesSeparator(data.price)} Gs.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
