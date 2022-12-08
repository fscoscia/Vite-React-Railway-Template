import React from "react";
import "../App.css";
import tree from "../assets/tree.png";

const LoginScreen = () => {
    return (
        <div className="login-container container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="form-container rounded-4 px-5 py-5 text-center">
                <img src={tree} width="200" />
                <h2 class="fw-bold mb-2">Iniciar sesión</h2>
                <p class="opacity-50 mb-5">Ingresa tu usuario y contraseña!</p>
                <div class="form-outline form-white mb-4">
                    <input
                        type="email"
                        id="typeEmailX"
                        class="form-control form-control-lg"
                        placeholder="Usuario"
                    />
                </div>
                <div class="form-outline form-white mb-4">
                    <input
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                        placeholder="Contraseña"
                    />
                </div>
                <button class="btn btn-lg px-5 login-btn" type="submit">
                    Ingresar
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
