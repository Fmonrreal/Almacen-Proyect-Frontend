import React,{useContext,useState} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProvedorContext from 'context/provedor/provedorContext';
import Modal from 'helpers/modal';
import EditarProvedor from './EditarProvedor'
import { Fragment } from 'react/cjs/react.production.min';

const Provedor_Row = ({provedor,props}) => {
    const provedorContext = useContext(ProvedorContext);
    const {ProvedorSelAction,borrarProvedorAction,error,loading} = provedorContext;
    const { id_provedores,razon,email,telefono,sku,direccion} = provedor;

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
    const confirmarEliminarProvedor = id_provedores => {

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
                borrarProvedorAction(id_provedores);
            }
        });
    }     

    return ( 
        // <div>
        <>
            <tr onClick={()=>ProvedorSelAction(provedor)}>
                <td>{razon}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>{direccion}</td>
                <td>{sku}</td>
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
                        onClick={() => confirmarEliminarProvedor(id_provedores)}
                    >Eliminar </button>
                </td>
            </tr>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <EditarProvedor
                    handleModalOnChange2={handleModalOnChange2}
                />
            </Modal>
            :
            null
            }
        </>
  
        
     );
}
 
export default Provedor_Row;