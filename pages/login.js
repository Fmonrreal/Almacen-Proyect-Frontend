import React,{useState,useContext,useEffect,Component} from 'react';
import styles from "styles/Login.module.css";
//import 'styles/Login.module.css';
import { startLogin } from "hooks/useAuth";
import Head from  "../components/Head";
import { useForm } from "../hooks/useForm";
import userContext from "context/user/userContext";
import AlertaContext from 'context/alertas/alertaContext';
import AuthContext from 'context/autenticacion/authContext';
import { useRouter } from 'next/router';

const LoginScreen = (props) => {

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje,autenticado,iniciarSesion} = authContext;

    const router = useRouter()

     // En caso de que el password o usuario no exista
     useEffect(() => {
        if(autenticado) {
            router.push('/')
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);


    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        email: 'lfmonrreal91@gmail.com',
        password: 'Clave12345'
    } );

    const {email,password} = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();

        // startLogin(email,password);
    }

    // const onChange = e => {
    //     handleLoginInputChange({
    //         ...formLoginValues,
    //         [e.target.name] : e.target.value
    //     })
    // }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return
        }

        // Pasarlo al action
        iniciarSesion({ email, password });
        // console.log(formLoginValues)
    }

    return(
        <div className="bg justify-content-center align-items-center ">
            <Head>
                <html lang="es"/>
                <title>Almacen frontend</title>
                <link href="https://fonts.googleapis.com/css2?family=Alata&family=Arima+Madurai:wght@100;200;900&family=Dancing+Script&family=Fredoka:wght@300&family=Nanum+Gothic&family=Nanum+Pen+Script&family=Open+Sans:ital@1&family=Roboto:ital,wght@1,100&family=Shadows+Into+Light&display=swap" rel="stylesheet"></link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            </Head>
            
           

             <div className="row  d-flex justify-content-center align-items-center positionA bodylogin" >
             
                    <div className="col-8 login-form-inicio  text-center ">
                    {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                        <h3>INGRESO</h3>
                        <form onSubmit={onSubmit}>
                            <div className="form-group dp-flex">
                            <label className='correo'>Correo</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="email"
                                    value={email}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className='contraseña'>Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={password}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login" 
                                />
                            </div>
                        </form>
                    
                    </div>
                    <div className="col-8 login-form-1  text-center "> </div> 
                </div>
            </div>
          
)
                }

export default LoginScreen;