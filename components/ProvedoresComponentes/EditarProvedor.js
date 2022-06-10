import React, { useState, useEffect,useContext } from 'react';
import ProvedorContext from 'context/provedor/provedorContext';
import AlertaContext from 'context/alertas/alertaContext';
// import { useRouter } from 'next/router';
import { useForm } from "/hooks/useForm";
import { validationArticles } from 'helpers/validationArticles';
import Swal from 'sweetalert2';

const EditarProvedor = (props) => {

    const provedorContext = useContext(ProvedorContext);
    const {editarProvedorAction,provedor_action,loading,error} = provedorContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    useEffect( () => {
       
    }, []);

    // const [clienteEditadoSeleccionado, setproductoEditadoSeleccionado] = useState(null)
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        
        razon:provedor_action.razon,
        email: provedor_action.email,
        telefono:provedor_action.telefono,
        direccion:provedor_action.direccion,
        sku:provedor_action.sku,
    } );

    const {email,razon,telefono,direccion,sku} = formLoginValues;

    const id_clientes = provedor_action.id_clientes

    const submitEditarProvedor = e => {
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

        editarProvedorAction(id_clientes,formLoginValues)

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
            provedor_action == ""
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
                            onSubmit={submitEditarProvedor}
                        >
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="form-group">
                                            <label>razon del Provedor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Razon del Provedor"
                                                name="razon"
                                                value={razon}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email del Provedor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email del Provedor"
                                                name="email"
                                                value={email}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>
                                    
                                        <div className="form-group">
                                            <label>Telefono del Provedor</label>
                                            <input
                                                type="Number"
                                                className="form-control"
                                                placeholder="Telefono del Provedor"
                                                name="telefono"
                                                value={telefono}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>
                                    
                                        <div className="form-group">
                                            <label>Direccion del cliente</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Direccion del Provedor"
                                                name="direccion"
                                                value={direccion}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>SKU del provedor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="SKU del Provedor"
                                                name="sku"
                                                value={sku}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>
                                    </div>

                                </div>

                            <button 
                                className="btn btn-outline-danger font-weight-bold text-uppercase "
                                type='reset'
                                onClick={()=>props.handleModalOnChange2()}
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
 
export default EditarProvedor;