import { milesSeparator } from '../utils';

const CheckoutCard = ({ data }) => {
  return (
    <div className="col">
      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{data.product}</h5>
              <p className="card-text">
                {data.quantity} x {milesSeparator(data.unit_price)} Gs.
              </p>
            </div>
          </div>
          <div className="col ">
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
              <h5>{milesSeparator(data.total_price)} Gs.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
