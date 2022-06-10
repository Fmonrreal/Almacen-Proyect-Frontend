import React, { useState,useContext } from 'react';
import ProductContext from 'context/productos/productContext';
import AlertaContext from 'context/alertas/alertaContext';
import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
// import { crearNuevoProductoAction } from '../actions/productoActions';
// import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const CargadorImagen = () => {

    const productContext = useContext(ProductContext);
    const {crearNuevoProductoAction,loading,error,cargarImagenProductoAction} = productContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const router = useRouter()

    const [productimage, setproductimage] = useState(null);
    const [showproductimage, setshowproductimage] = useState(null);

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();
        console.log(productimage)
 
        cargarImagenProductoAction({id: 4},productimage)

        router.push('/almacen');

    }

    const imagenHandler = (event) => {

        const file =  event.target.files[0];
        console.log(file);
        const formData = new FormData()
        // const formData = new FormData(file)
        formData.append('file',file)

        // console.log(event.target.files);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
            event.preventDefault();
            setshowproductimage(event.target.result); // le damos el binario de la imagen para mostrarla en pantalla
        };

        setproductimage(formData);

    }


    return ( 
        <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Cargar Imagen
                        </h2>

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            

                            <div>
                                {/* <StyleDragArea> */}
                                    <br />
                                    <div className="image-upload-wrap">
                                    <input
                                        className="file-upload-input"
                                        type="file"
                                        accept="image/*"
                                        multiple={false}
                                        // onChange={(e) => {
                                        // changeImage(e);
                                        
                                        onChange={imagenHandler}
                                    />
                                    <div className="text-information">
                                        <h3>Drag and drop a file or select add Image</h3>
                                    </div>
                                    </div>

                                    <div className="center">
                                    <img
                                        src={showproductimage}
                                        alt=""
                                        height="150px"
                                        width="250px"
                                    />
                                    </div>
                                {/* </StyleDragArea> */}
                            </div>
                            
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
 
export default CargadorImagen;