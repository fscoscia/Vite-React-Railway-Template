import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid d-flex">
        <div>
          <h5 style={{ margin: 0 }}>Hola! {auth.userData.first_name}</h5>
        </div>
        <div>
          <button className="btn login-btn me-3" onClick={() => navigate('/checkout')}>
            <span className="me-2">Ver carrito</span>
            <i className="bi bi-cart-fill"></i>
          </button>

          <button className="btn btn-danger">
            <span className="me-2" onClick={() => auth.signOut()}>
              Cerrar sesión
            </span>
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
