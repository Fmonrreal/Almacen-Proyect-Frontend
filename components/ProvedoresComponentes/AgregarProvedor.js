import { useContext } from 'react';
import AlertaContext from 'context/alertas/alertaContext';
import { useForm } from "/hooks/useForm";
import provedorContext from 'context/provedor/provedorContext';

const AgregarProvedor = () => {

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const ClienteContext = useContext(provedorContext);
    const {crearNuevoProvedorAction} = ClienteContext;

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        razon: "",
        email: "",
        telefono: "",
        direccion: "",
        sku: ""
    } );

    // const {nombre,razon,rfc,direccion} = formLoginValues;

    const submitCrearCliente = e => {
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
        crearNuevoProvedorAction(formLoginValues)

    }

    // const {id,name,precio} = formLoginValues;

    return ( 
        <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo cliente
                        </h2>

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitCrearCliente}
                        >
                            <div className="form-group">
                                <label>Nombre del cliente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del cliente"
                                    name="nombre"
                                    // value={nombre}
                                    // onChange={onChangeFormulario}
                                    onChange={handleLoginInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Razon del cliente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Razon del cliente"
                                    name="razon"
                                    // value={razon}
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
                                    // value={rfc}
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
                                    // value={direccion}
                                    // onChange={onChangeFormulario}
                                    onChange={handleLoginInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>SKU del cliente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="SKU del cliente"
                                    name="sku"
                                    // value={direccion}
                                    // onChange={onChangeFormulario}
                                    onChange={handleLoginInputChange}
                                />
                            </div>

                            <button 
                                className="btn btn-outline-danger font-weight-bold text-uppercase "
                            >Cancelar</button>
                            <button 
                                type="submit"
                                className="btn btn-outline-primary font-weight-bold text-uppercase "
                            >Guardar Cambios</button>
                        </form>
                        {/* { loading ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null } */}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AgregarProvedor;