import React,{useContext,useState} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClienteContext from 'context/cliente/clienteContext';
import Modal from 'helpers/modal';
import EditarCliente from './EditarCliente'
import { Fragment } from 'react/cjs/react.production.min';

const Cliente_Row = ({cliente,props}) => {
    const clienteContext = useContext(ClienteContext);
    const {ClienteSelAction,borrarClienteAction,error,loading} = clienteContext;
    const { nombre,id_clientes,rfc,razon,direccion} = cliente;

    const [modal, abrirModal] = useState(0);

    const handleModalOnChange1 = () => {
        abrirModal(1)
    }

    const handleModalOnChange2 = () => {
    abrirModal(0)
    }

    const handleModalOnChange3 = () => {
        abrirModal(3)
        }

    // Confirmar si desea eliminarlo
    const confirmarEliminarCliente = id_clientes => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Todo lo que incluya al cliente se eliminara y no se podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                borrarClienteAction(id_clientes);
            }
        });
    }     

    return ( 
        // <div>
        <>
            <tr onClick={()=>ClienteSelAction(cliente)}>
                <td>{nombre}</td>
                <td>{razon}</td>
                <td>{rfc}</td>
                <td>{direccion}</td>
                <td className="acciones">
                    <button 
                        type="button"
                        onClick={ () => handleModalOnChange1(1) }
                        className="btn btn-outline-primary mr-2">
                        Editar
                    </button>
                    <button 
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => confirmarEliminarCliente(id_clientes)}
                    >Eliminar </button>
                </td>
            </tr>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <EditarCliente
                    handleModalOnChange2={handleModalOnChange2}
                />
            </Modal>
            :
            null
            }
        </>
  
        
     );
}
 
export default Cliente_Row;