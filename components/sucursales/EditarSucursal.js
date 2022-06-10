import React, { useState, useEffect,useContext } from 'react';
import AlertaContext from 'context/alertas/alertaContext';
import { useForm } from "/hooks/useForm";
import { validationArticles } from 'helpers/validationArticles';
import Swal from 'sweetalert2';
import SucursalContext from 'context/sucursal/sucursalContext';
import { Fragment } from 'react/cjs/react.production.min';

const EditarSucursal = (props) => {
    const sucursalContext = useContext(SucursalContext);
    const {sucursal_actions,editarSucursalAction,error,loading} = sucursalContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const [productoEditadoSeleccionado, setproductoEditadoSeleccionado] = useState(null)
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        nombre: sucursal_actions.nombre,
        direccion:sucursal_actions.direccion,
        telefono:sucursal_actions.telefono,
    } );

    const {nombre,direccion,telefono} = formLoginValues;

    const id_sucursales = sucursal_actions.id_sucursales

    const submitEditarProducto = e => {
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

        // // editarArticuloAction(productoeditar.n_id_articulos,formLoginValues)
        editarSucursalAction(id_sucursales,formLoginValues)

        props.handleModalOnChange2()

    }
    
    return ( 
    // <div>
    <>
        {
            sucursal_actions == ""
            ? 
            <div>
                <h1>No cuenta</h1>
            </div>
            :
            <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Sucursal
                        </h2>

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Sucursal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Sucursal"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleLoginInputChange}
                                />
                            
                                <label>Direccion Sucursal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Direccion Sucursal"
                                    name="direccion"
                                    value={direccion}
                                    onChange={handleLoginInputChange}
                                />

                                <label>Direccion Sucursal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Direccion Sucursal"
                                    name="telefono"
                                    value={telefono}
                                    onChange={handleLoginInputChange}
                                />

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
        </>
        // </div>
     );
}
 
export default EditarSucursal;