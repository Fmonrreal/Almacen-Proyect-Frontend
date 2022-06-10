import { useContext,useState} from 'react';
import AlertaContext from 'context/alertas/alertaContext';
import { useForm } from "/hooks/useForm";
import clienteContext from 'context/cliente/clienteContext';
import BotonAgregar from './BotonAgregar'
import ClientesNombres from './ClientesNombre'
import ClientesNombres2 from './ClientesNombre2'

const BuscarCliente = () => {

    const ClienteContext = useContext(clienteContext);
    const {clientes,error,loading,obtenerclientesAction} = ClienteContext;

    // clearProductState();
    const [id_clientes, setId_clientes] = useState(0)
    const [nombre, guardarNombreBus] = useState('');

    return ( 
       <div>
           <div className='row'>
                <div className='col-12'>
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-12 login-form-1">
                                <div className="form-group">
                                    <button 
                                        onClick={() => obtenerclientesAction({nombre})}>O</button>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Coloca el nombre para busqueda"
                                        name="nombre"
                                        value={nombre}
                                        onChange={e => guardarNombreBus(e.target.value)}
                                        // onChange={() => filtrarArticulosAction({nombre,id_supplier})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                        { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                         { loading ? <p className="text-center">Cargando....</p> : null }

                        { clientes.length === 0 ? 'Teclea para buscar cliente' : (
                            clientes.map(cliente => (
                                <ClientesNombres2
                                        key={cliente.id_clientes}
                                        cliente={cliente}
                                >
                                    <BotonAgregar
                                        key={cliente.id_clientes}
                                        cliente={cliente}
                                    />
                                </ClientesNombres2>
                                // <ClientesNombres
                                // key={cliente.id_clientes}
                                // cliente={cliente}
                                // />
                            ))
                        ) }
                </div>
            </div>
       </div>
     );
    
}
 
export default BuscarCliente;