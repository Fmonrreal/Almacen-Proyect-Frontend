import { useContext } from 'react';
import AlertaContext from 'context/alertas/alertaContext';
import { useForm } from "/hooks/useForm";
import sucursalContext from 'context/sucursal/sucursalContext';

const AgregarSucursal = props => {

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const SucursalContext = useContext(sucursalContext);
    const {crearNuevaSucursal} = SucursalContext;

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        nombre: "",
        direccion: "",
        telefono:""
    } );

    const submitCrearSucursal = e => {
        e.preventDefault();

        if(formLoginValues.nombre.trim() === '') {

            const alerta = {
                msg: 'Nombre no debe estar vacio',
                categoria: 'alert alert-danger text-center text-uppercase p3'
            }
             mostrarAlerta(alerta.msg,alerta.categoria);

            return;
        }

        crearNuevaSucursal(formLoginValues)

        props.handleModalOnChange2()

    }

    const prueba = () =>{
        props.handleModalOnChange2()
        console.log("Deberia jalar")
    }

    return ( 
        <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Sucursal
                        </h2>

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitCrearSucursal}
                        >
                            <div className="form-group">
                                <label>Nombre de la sucursal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de la sucursal"
                                    name="nombre"
                                    onChange={handleLoginInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Direccion de la sucursal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Direccion de la sucursal"
                                    name="direccion"
                                    onChange={handleLoginInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Telefono de la sucursal</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Telefono de la sucursal"
                                    name="telefono"
                                    onChange={handleLoginInputChange}
                                />
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
                        </form>
                        {/* { loading ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null } */}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AgregarSucursal;