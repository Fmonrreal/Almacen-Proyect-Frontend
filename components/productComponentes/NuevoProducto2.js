import React, { useState,useContext,useEffect } from 'react';
import ProductContext from 'context/productos/productContext';
import AlertaContext from 'context/alertas/alertaContext';
import { useRouter } from 'next/router';
import CargadorImagen2 from './cargadorImagen2';
import { fileUpload } from 'helpers/fileUpload';


// import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
// import { crearNuevoProductoAction } from '../actions/productoActions';
// import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProductos2 = ({history}) => {

    const productContext = useContext(ProductContext);
    const {crearNuevoProductoAction,loading,error,cargarImagenProductoAction} = productContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const router = useRouter()

    // state del componente
    const [name, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);
    const [productImage, setproductimage] = useState(null);
    const [showproductimage, setshowproductimage] = useState(null);
    const [productImage2, setproductimage2] = useState(null);

    // mandar llamar el action de productoAction
    const agregarProducto = async producto => await crearNuevoProductoAction(producto);

    useEffect(() => {
        async function fetchMyAPI() {
        //   let response = await fetch('api/data')
          const fileUrl = await fileUpload(productImage2);
          console.log(fileUrl)
        //   response = await response.json()
          setproductimage(fileUrl)
        //   dataSet(response)
        }
    
        fetchMyAPI()
      }, [])

    // cuando el usuario haga submit
    const submitNuevoProducto = async e => {
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
        // console.log(name);
        // console.log(precio);
        // console.log(productImage);

        // try{
        //     const fileUrl = await fileUpload(productImage2);
        //     console.log(productImage2)
        //     setproductimage(fileUrl)
        // }catch{
        //     console.error;
        // }



        

        // funcionImage(fileUrl);
        // const funcionImage = async (fileUrl) => ( await setproductimage(fileUrl) )

        // crear el nuevo producto
        

        // while(productImage==null){
        //     setproductimage(fileUrl)
        // }
       
        

        
        if(productImage!=null){
            await crearNuevoProductoAction({
                name,
                precio,
                productImage
                // productimage
            });
        }else{
            console.log(productImage)
        }
        
        

        // console.log(productImage)
        // agregarProducto({
        //     name,
        //     precio,
        //     productImage
        //     // productimage
        // });

        

        // cargarImagenProductoAction({id: 5},{productimage})

        


        router.push('/almacen');
    

    }

    const funcionImage = async (fileUrl) => ( await setproductimage(fileUrl) );

    const imagenHandler = (event) => {

        const file =  event.target.files[0];
        console.log(file);

        // console.log(event.target.files);
        const reader = new FileReader();


        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
            event.preventDefault();
            setshowproductimage(event.target.result); // le damos el binario de la imagen para mostrarla en pantalla
        };

        // funcionImage(fileUrl);

        // funcionImage = fileUrl => {
        //     const HelloReact = ({ props.setproductimage }) => fileUrl;
        // }

        
        
        setproductimage2(file);

    }



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
                                                
                                                {/* <button 
                                                    type="submit"
                                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                                >Agregar</button> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
 
export default NuevoProductos2;