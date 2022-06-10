import React,{useContext} from 'react';
import clienteContext from 'context/cliente/clienteContext';


const BotonAcciones = (cliente) => {

    const ClienteContext = useContext(clienteContext);
    const {clientesSeleccionadoAction} = ClienteContext;

    const funcionx = (cliente) =>{
        console.log(cliente)
        clientesSeleccionadoAction(cliente.cliente)
    }

    return ( 
        <div>
            <button 
                type="button"
                onClick={ () => redireccionarEdicion(producto) }
                className="btn btn-outline-primary mr-2">
                Editar
            </button>
            <button 
                type="button"
                className="btn btn-outline-danger"
                onClick={() => confirmarEliminarProducto(id)}
            >Eliminar </button>
        </div>
     );
}
 
export default BotonAcciones;