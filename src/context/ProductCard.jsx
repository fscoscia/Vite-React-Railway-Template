import { useState } from 'react';
import batman from '../assets/car.png';
import bear from '../assets/bear.png';
import minion from '../assets/minion.png';

const ProductCard = ({ data }) => {
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (action) => {
    if (action === '+') {
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getSrc = () => {
    if (data.title === 'Batimóvil Lego') {
      return batman;
    } else if (data.title === 'Oso de peluche') {
      return bear;
    } else {
      return minion;
    }
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
            <button className="btn btn-primary">
              Añadir <i className="bi bi-cart-fill"></i>
            </button>
          </div>
          <div>
            <h4>{data.price} Gs.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
