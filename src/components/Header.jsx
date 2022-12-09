import { useAuth } from '../context/AuthContext';

const Header = () => {
  const auth = useAuth();
  return (
    <nav class="navbar bg-light">
      <div class="container-fluid d-flex">
        <div>
          <h5 style={{ margin: 0 }}>Hola! {auth.userData.first_name}</h5>
        </div>
        <div>
          <button className="btn login-btn me-3">
            <span className="me-2">Ver carrito</span>
            <i class="bi bi-cart-fill"></i>
          </button>
          <button className="btn btn-danger">
            <span className="me-2">Cerrar sesión</span>
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
