import React,{useState,useContext,useEffect} from 'react';
// import styles from "styles/Login.module.css";
import { startLogin } from "hooks/useAuth";
import { useForm } from "hooks/useForm";
import userContext from "context/user/userContext";
import AlertaContext from 'context/alertas/alertaContext';
import AuthContext from 'context/autenticacion/authContext';
import { useRouter } from 'next/router';

const FormBusqueda = (props) => {

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    // const productContext = useContext(ProductContext);
    // const {BuscarProductopornombre,loading,error} = productContext;

    const [nameBus, guardarNombreBus] = useState('');

    const router = useRouter()

     // En caso de que el password o usuario no exista
     useEffect(() => {
        // if(nameBus) {
        //     router.push('/')
        // }
        // if(nameBus===""){

        // }
        // BuscarProductopornombre();
        console.log(nameBus)

        // if(mensaje) {
        //     mostrarAlerta(mensaje.msg, mensaje.categoria);
        // }
        // eslint-disable-next-line
    }, [ nameBus]);

    
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        name: ''
    } );

    // const {nameBus} = formLoginValues;

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

        // Pasarlo al action
        BuscarPorNombre({nameBus});
        // console.log(formLoginValues)
    }

    return(
        <div>
            {/* <Head>
                <html lang="es"/>
                <title>Almacen frontend</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            </Head> */}
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-12 login-form-1">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <button><i class="bi bi-search"></i></button>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Coloca el nombre para busqueda"
                                    name="nameBus"
                                    value={nameBus}
                                    onChange={e => guardarNombreBus(e.target.value)}
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
                </div>
            </div>
        </div>
)
                }

export default FormBusqueda;