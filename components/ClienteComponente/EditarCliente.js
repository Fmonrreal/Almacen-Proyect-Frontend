import React, { useState, useEffect,useContext } from 'react';
import ClienteContext from 'context/cliente/clienteContext';
import AlertaContext from 'context/alertas/alertaContext';
// import { useRouter } from 'next/router';
import { useForm } from "/hooks/useForm";
import { validationArticles } from 'helpers/validationArticles';
import Swal from 'sweetalert2';

const EditarCliente = (props) => {

    const clienteContext = useContext(ClienteContext);
    const {editarClienteAction,clienteSeleccionado,cliente_action,loading,error} = clienteContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    useEffect( () => {
       
    }, []);

    // const [clienteEditadoSeleccionado, setproductoEditadoSeleccionado] = useState(null)
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        
        nombre: cliente_action.nombre,
        razon:cliente_action.razon,
        rfc:cliente_action.rfc,
        direccion:cliente_action.direccion,
    } );

    const {nombre,razon,rfc,direccion} = formLoginValues;

    const id_clientes = cliente_action.id_clientes

    const submitEditarCliente = e => {
        e.preventDefault();

        let alerta = validationArticles(formLoginValues);

        if(alerta != true) {

             mostrarAlerta(alerta.msg,alerta.categoria);

             Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: alerta.msg
            })

            return;
        }

        editarClienteAction(id_clientes,formLoginValues)

        // console.log("clienteEditadoSeleccionado")
        // console.log(clienteEditadoSeleccionado)

        // if(clienteEditadoSeleccionado!=null){
        //     editarArticuloPorProvedorAction(articuloProvedorEditar.artgen_id_articulos_provedores,clienteEditadoSeleccionado)
        // }

        props.handleModalOnChange2()

    }
    
    return ( 
    <div>
        {
            cliente_action == ""
            ? 
            <div>
                <h1>No cuenta</h1>
            </div>
            :
            <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <div className="card">
                    <div className="card-body">
                        

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitEditarCliente}
                        >
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="form-group">
                                            <label>Nombre del Articulo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre Producto"
                                                name="nombre"
                                                value={nombre}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>
                                    
                                        <div className="form-group">
                                            <label>razon del Articulo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre Producto"
                                                name="razon"
                                                value={razon}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>RFC del cliente</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="RFC del cliente"
                                                name="rfc"
                                                value={rfc}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Direccion del cliente</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Direccion del cliente"
                                                name="direccion"
                                                value={direccion}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>
                                    </div>

                                </div>

                            <button 
                                className="btn btn-outline-danger font-weight-bold text-uppercase "
                            >Cancelar</button>
                            <button 
                                type="submit"
                                className="btn btn-outline-primary font-weight-bold text-uppercase "
                            >Guardar Cambios</button>
                        </div>
                        </form>
                        { loading ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                    
                </div>
            </div>
        }
        </div>
     );
}
 
export default EditarCliente;