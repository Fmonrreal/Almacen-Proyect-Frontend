import React,{useContext} from 'react';
import clienteContext from 'context/cliente/clienteContext';


const ClientesNombres = ({cliente}) => {

    const ClienteContext = useContext(clienteContext);
    const {clientesSeleccionadoAction} = ClienteContext;

    const {id_clientes,nombre,rfc} = cliente

    return ( 
        <div >
                <div className='cuadros'>
                {/* <div className='cuadros'> */}
                    <div className='row'>
                        <div className="col-12">
                            <span>Nombre</span>
                            <span>{nombre}</span>
                            <span>Id</span>
                            <span>{id_clientes}</span>
                            <span>RFC</span>
                            <span>{rfc}</span>
                            <button 
                                type="button"
                                // onClick={ () => redireccionarEdicion(producto) }
                                className="btn btn-outline-primary mr-2"
                                onClick={ () => clientesSeleccionadoAction(cliente) }>
                            Agregar
                            </button>
                        </div>
                    </div>
                </div>
        </div>
        
     );
}
 
export default ClientesNombres;