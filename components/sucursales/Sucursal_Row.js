import React,{useContext,useState} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import SucursalContext from 'context/sucursal/sucursalContext';
import Modal from 'helpers/modal';
import EditarSucursal from './EditarSucursal'
import { Fragment } from 'react/cjs/react.production.min';

const Sucursal_Row = ({sucursal,props}) => {
    const sucursalContext = useContext(SucursalContext);
    const {SucursalSelAction,borrarSucursalAction,error,loading} = sucursalContext;
    const { nombre, direccion, telefono,id_sucursales} = sucursal;

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
    const confirmarEliminarProducto = id_sucursales => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Todo lo que incluya la sucursal se eliminara y no se podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                borrarSucursalAction(id_sucursales);
            }
        });
    }     

    return ( 
        // <div>
        <>
            <tr onClick={()=>SucursalSelAction(sucursal)}>
                <td>{nombre}</td>
                <td>{direccion}</td>
                <td>{telefono}</td>
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
                        onClick={() => confirmarEliminarProducto(id_sucursales)}
                    >Eliminar </button>
                </td>
            </tr>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <EditarSucursal
                    handleModalOnChange2={handleModalOnChange2}
                />
            </Modal>
            :
            null
            }
        </>
  
        
     );
}
 
export default Sucursal_Row;