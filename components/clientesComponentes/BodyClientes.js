import React, { useState, useEffect,useContext } from 'react';
import Paginate_Clientes from 'components/ClienteComponente/Paginate_Clientes'
import AgregarCliente from 'components/ClienteComponente/AgregarCliente'
import Modal from 'helpers/modal';
import useForm from 'hooks/useForm'

const BodyClientes = () => {
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
    
    // const ClienteContext = useContext(clienteContext);
    // const {crearNuevoClienteAction} = ClienteContext;
    // const [ formLoginValues, handleLoginInputChange ] = useForm( {
    //     nombre: "",
    //     razon: "",
    //     rfc: "",
    //     direccion: ""
    // } );

// const {nombre,razon,rfc,direccion} = formLoginValues;

const submitModificarCliente = e => {
    e.preventDefault();

    // validar formulario
    if(formLoginValues.nombre.trim() === '') {

        const alerta = {
            msg: 'Nombre no debe estar vacio',
            categoria: 'alert alert-danger text-center text-uppercase p3'
        }
         mostrarAlerta(alerta.msg,alerta.categoria);

        return;
    }

    // editarProductoAction(producto)
    modificarClienteAction(formLoginValues)

}

// const {id,name,precio} = formLoginValues;

    return ( 
        <div>
            <div>
                <span>Cliente</span>
                <button onClick={()=>handleModalOnChange1()} className="derecha"><span className='sub'>crear cliente</span></button>
            </div>
            <div>
                <Paginate_Clientes/>
            </div>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <AgregarCliente/>
            </Modal>
            :
            null
        }
        </div>
     );
}
 
export default BodyClientes;