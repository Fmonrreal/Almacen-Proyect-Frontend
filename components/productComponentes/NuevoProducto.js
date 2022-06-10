import React, { useState,useContext } from 'react';
import ProductContext from 'context/productos/productContext';
import AlertaContext from 'context/alertas/alertaContext';
import { useRouter } from 'next/router';
import CargadorImagen2 from './cargadorImagen2';
// import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
// import { crearNuevoProductoAction } from '../actions/productoActions';
// import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProductos = ({history}) => {

    const productContext = useContext(ProductContext);
    const {crearNuevoProductoAction,loading,error,cargarImagenProductoAction} = productContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const router = useRouter()

    // state del componente
    const [name, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);
    const [productImage, setproductimage] = useState(null);

    // mandar llamar el action de productoAction
    const agregarProducto = producto => ( crearNuevoProductoAction(producto) );

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // validar formulario
        if(name.trim() === '' || precio <= 0) {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                categoria: 'alert alert-danger text-center text-uppercase p3'
            }
             mostrarAlerta(alerta.msg,alerta.categoria);

            return;
        }

        // si no hay errores
        // dispatch( ocultarAlertaAction() );
        console.log(name);
        console.log(precio);
        console.log(productImage);

        // crear el nuevo producto
        agregarProducto({
            name,
            precio,
            productImage
            // productimage
        });

        

        // cargarImagenProductoAction({id: 5},{productimage})


        router.push('/almacen');
        // redireccionar
        // history.push('/');

    }

    // const [productimage, setproductimage] = useState(null);
    // const changeImage = (e) => {
    //     console.log(e.target.files);
    //     if (e.target.files[0] !== undefined) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = (e) => {
    //         e.preventDefault();
    //         setproductimage(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
    //     };
    //     }
    // };


    return ( 
        <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="name"
                                    value={name}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e =>  guardarPrecio( Number(e.target.value) )}
                                />
                            </div>

                            {/* <div>
                                    <br />
                                    <div className="image-upload-wrap">
                                    <input
                                        className="file-upload-input"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                        changeImage(e);
                                        }}
                                    />
                                    <div className="text-information">
                                        <h3>Drag and drop a file or select add Image</h3>
                                    </div>
                                    </div>

                                    <div className="center">
                                    <img
                                        src={productimage}
                                        alt=""
                                        height="150px"
                                        width="250px"
                                    />
                                    </div>
                            </div> */}

                            <CargadorImagen2 setproductimage={setproductimage}/>
                            
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { loading ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProductos;