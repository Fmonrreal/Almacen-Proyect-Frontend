import React, { useState, useEffect,useContext } from 'react';
import ProductContext from 'context/productos/productContext';
import AlertaContext from 'context/alertas/alertaContext';
import { useRouter } from 'next/router';
import { useForm } from "/hooks/useForm";
import DragArea from './DragArea';

const EditarProducto = () => {

    const productContext = useContext(ProductContext);
    const {editarProductoAction,productoeditar,loading,error} = productContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const router = useRouter()

    // nuevo state de producto
    // const [ producto, guardarProducto] = useState({
    //     productoeditar
    // })

    useEffect( () => {
       
    }, [productoeditar]);


    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        id: productoeditar.id,
        name: productoeditar.name,
        precio: productoeditar.precio
    } );

    const {id,name,precio} = formLoginValues;

    // producto a editar
    // const productoeditar = producto => (  );
  
    // llenar el state automaticamente
    // useEffect( () => {
    //     guardarProducto(productoeditar);
    // }, [productoeditar]);

    // useEffect( () => {
    //     guardarProducto(producto);
    // }, [producto]);

    // Leer los datos del formulario
    // const onChangeFormulario = e => {
    //     guardarProducto({
    //         ...producto,
    //         [e.target.name] : e.target.value
    //     })
    // }


    // const { name, precio} = producto;

    const submitEditarProducto = e => {
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

        // editarProductoAction(producto)
        editarProductoAction({id},{ name, precio })
        

        router.push('/almacen');

    }

    const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
    const changeImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
    }
    
    return ( 
        <div className="row justify-content-center">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null } */}

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="name"
                                    value={name}
                                    // onChange={onChangeFormulario}
                                    onChange={handleLoginInputChange}
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
                                    // onChange={onChangeFormulario}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            
                            {/* <DragArea/> */}

                            <div>
                                {/* <StyleDragArea> */}
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
                                        src={ImageSelectedPrevious}
                                        alt=""
                                        height="150px"
                                        width="250px"
                                    />
                                    </div>
                                {/* </StyleDragArea> */}
                            </div>

                            <button 
                                className="btn btn-outline-danger font-weight-bold text-uppercase "
                            >Cancelar</button>
                            <button 
                                type="submit"
                                className="btn btn-outline-primary font-weight-bold text-uppercase "
                            >Guardar Cambios</button>
                        </form>
                        { loading ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;