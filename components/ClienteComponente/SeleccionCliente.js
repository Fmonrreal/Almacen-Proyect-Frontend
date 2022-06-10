import {useState,useContext,useEffect} from 'react';
import clienteContext from 'context/cliente/clienteContext';
import Link from 'next/link';
import Modal from 'helpers/modal';
import AgregarCliente from './AgregarCliente';
import BuscarCliente from './BuscarCliente';

const SeleccionCliente = () => {

    const ClienteContext = useContext(clienteContext);
    const {clienteSeleccionado,obtenerclientesAction,clienteActual,clientesSeleccionadoAction,crearNuevoClienteAction} = ClienteContext;
    
    const [id_clientes, setId_clientes] = useState(0)
     const [modal, abrirModal] = useState(0);

    const handleModalOnChange1 = () => {
      abrirModal(1)
    }

    const handleModalOnChange3 = () => {
      abrirModal(2)
    }

    const handleModalOnChange2 = () => {
      abrirModal(0)
    }

    useEffect(() => {
      
    }, [modal])
    

    const submitClienteActivo = e => {
        e.preventDefault();
        console.log("no deberia salir esto")
        clienteActual(id_clientes)
    }

    const clienteIdSeleccion = (id) => {
        setId_clientes(id)
    }

    return ( 
        <div>
            { clienteSeleccionado == null 
                ?
                <div>
                    <div>
                        <span>Cliente</span>
                        <button onClick={()=>handleModalOnChange1()} className="derecha"><span className='sub'>crear cliente</span></button>
                        <button onClick={()=>handleModalOnChange3()} className="derecha"><span className='sub'>buscar cliente</span></button>
                    </div>
                    <form
                        onSubmit={submitClienteActivo}
                    >
                            <div>
                                <div>
                                    <div className="form-group">
                                        {/* <label>Cliente</label> */}
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            placeholder="Introduce el id del cliente"
                                            name="nombre"
                                            // value={id_clientes}
                                            // onChange={onChangeFormulario}
                                            onChange={e => clienteIdSeleccion(e.target.value)}
                                        />
                                    </div>
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-outline-primary font-weight-bold text-uppercase "
                            >Aceptar</button>
                        </div>
                    </form>
                </div>
                :
                <div>
                    <div className='sepcomp'>
                        <span>Cliente</span>
                        <button onClick={()=>clientesSeleccionadoAction(null)}><span className='sub'>cambiar cliente</span></button>
                    </div>
                    <table>
                            <tbody>
                                <tr>
                                    <th scope="row">Nombre:</th>
                                    <td>{clienteSeleccionado.nombre}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Direccion:</th>
                                    <td>Salvador Glz Lobo #308-B Colonia Republica</td>
                                </tr>
                                <tr>
                                    <th scope="row">Telefono:</th>
                                    <td>844 1234568</td>
                                </tr>
                                <tr>
                                    <th scope="row">Correo:</th>
                                    <td>jehjbashfja@hotmail.es</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
        }
        { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <AgregarCliente/>
            </Modal>
            :
            null
        }
        { modal == 2 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <BuscarCliente/>
            </Modal>
            :
            null
        }
        
    </div> 
    );
}
 
export default SeleccionCliente;