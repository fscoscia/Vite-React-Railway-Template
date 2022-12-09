import React from 'react';
import { useState } from 'react';
import '../App.css';
import tree from '../assets/tree.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const LoginScreen = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const changeData = (key, value) => {
    setLoginData({ ...loginData, [key]: value });
  };

  const onLoginButtonClick = (event) => {
    console.log(loginData);
    event.preventDefault();
    setIsLoading(true);
    auth
      .signIn(loginData.username, loginData.password)
      .then(() => {
        navigate('/products');
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-container container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="form-container rounded-4 px-5 py-5 text-center">
        <img src={tree} width="200" />
        <h2 className="fw-bold mb-2">Iniciar sesión</h2>
        <p className="opacity-50 mb-5">Ingresa tu usuario y contraseña!</p>
        <Form>
          <div className="form-outline form-white mb-2">
            <input
              type="text"
              id="username"
              className="form-control form-control-lg"
              placeholder="Usuario"
              onChange={(e) => {
                changeData('username', e.target.value);
              }}
            />
          </div>
          <div className="form-outline form-white mb-4">
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              placeholder="Contraseña"
              onChange={(e) => {
                changeData('password', e.target.value);
              }}
            />
          </div>
          <button className="btn btn-lg px-5 login-btn" type="submit" onClick={onLoginButtonClick}>
            Ingresar
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
