import React,{useContext} from 'react';
import clienteContext from 'context/cliente/clienteContext';


const ClientesNombres = (props,{cliente}) => {


    const {id_clientes,nombre,rfc} = props.cliente

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
                            {props.children}  
                        </div>
                    </div>
                </div>
        </div>
        
     );
}
 
export default ClientesNombres;