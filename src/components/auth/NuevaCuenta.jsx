import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //en caso de que el usuario se haya autenticado a registrado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //state para iniciar Sesión
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        confirmar: '',
        password: '',
    });

    //extraer de usuario
    const { nombre, email, confirmar, password } = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    //cuando el usuario quiere iniciar sesion
    const onSubmit = (e) => {
        e.preventDefault();

        //validar que no haya campos vacios
        if (
            nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === ''
        ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //password minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta(
                'El password de al menos 6 caracteres',
                'alerta-error'
            );
            return;
        }

        //revisar que los 2 password sean iguales
        if (password !== confirmar) {
            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
        }
        //Pasarlo al action, definir reducer
        registrarUsuario({ nombre, email, password });
    };

    return (
        <div className="form-usuario">
            {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
            ) : null}
            <div className="contenedor-form sombra-dark">
                <h1 data-cy="titulo">Obtener una cuenta</h1>
                <form onSubmit={onSubmit} data-cy="form-agregar-nueva-cuenta">
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            data-cy="nombre-input"
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            data-cy="email-input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            data-cy="password-input"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            data-cy="repetir-password-input"
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            data-cy="btn-submit"
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta" data-cy="enlace-login">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};

export default NuevaCuenta;
