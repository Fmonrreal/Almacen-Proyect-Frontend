import React,{useContext} from 'react';
import clienteContext from 'context/cliente/clienteContext';


const BotonAgregar = (cliente) => {

    const ClienteContext = useContext(clienteContext);
    const {clientesSeleccionadoAction} = ClienteContext;

    const funcionx = (cliente) =>{
        console.log(cliente)
        clientesSeleccionadoAction(cliente.cliente)
    }

    return ( 
        <button 
            type="button"
            // onClick={ () => redireccionarEdicion(producto) }
            className="btn btn-outline-primary mr-2"
            onClick={ () => funcionx(cliente) }>
        Agregar
        </button>
     );
}
 
export default BotonAgregar;