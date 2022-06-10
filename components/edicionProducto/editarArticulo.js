import React, { useState, useEffect,useContext } from 'react';
import ProductContext from 'context/productos/productContext';
import StockContext from 'context/stock/stockContext';
import AlertaContext from 'context/alertas/alertaContext';
import { useRouter } from 'next/router';
import { useForm } from "/hooks/useForm";
import DragArea from 'components/productComponentes/DragArea';
import { validationArticles } from 'helpers/validationArticles';
import EditarArticuloProv from './editarArticuloProv';

import Swal from 'sweetalert2';
import ArticuloProvEdiccion from './ArticuloProvEdiccion';

const EditarArticulo = () => {

    const stockContext = useContext(StockContext);
    const {productoeditar,loading,error,cambiarModal,articulosProvedor,articuloProvedorEditar} = stockContext;

    const productContext = useContext(ProductContext);
    const {editarArticuloAction,editarArticuloPorProvedorAction} = productContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const router = useRouter()

    useEffect( () => {
        setImageSelectedPrevious(productoeditar.n_productImage)
    }, [productoeditar]);

    const [productoEditadoSeleccionado, setproductoEditadoSeleccionado] = useState(null)
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        
        nombre: productoeditar.n_nombre,
        codigo:productoeditar.n_codigo,
        descripcion:productoeditar.n_descripcion,
        maximos:productoeditar.n_maximos,
        minimos:productoeditar.n_minimos,
        productImage:productoeditar.n_productImage,
        // sum:productoeditar.sum
    } );


    // const handleLoginInputChangeInt= (name,value) => {
    //     name=parseInt(value)
    //     handleLoginInputChange(name)
    // }

    const {nombre,descripcion,maximos,minimos,productImage,sum} = formLoginValues;

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

        // let maximos2 = formLoginValues.maximos;
        // let minimos2 = formLoginValues.minimos;

        const formLoginValues2 =({
            ...formLoginValues,
            maximos: Number(formLoginValues.maximos),
            minimos: Number(formLoginValues.minimos)
        })

        // editarArticuloAction(productoeditar.n_id_articulos,formLoginValues)
        editarArticuloAction(productoeditar.n_id_articulos,formLoginValues2)

        console.log("productoEditadoSeleccionado")
        console.log(productoEditadoSeleccionado)

        if(productoEditadoSeleccionado!=null){
            editarArticuloPorProvedorAction(articuloProvedorEditar.artgen_id_articulos_provedores,productoEditadoSeleccionado)
        }

        cambiarModal(false)
        

        // router.push('/almacen');

    }

    const changeToInt = ({ target }) => {
       let target2 = ({
            ...target,
            [target.value]: parseInt(target.value)
        })
        handleLoginInputChange({target2})
    }

    const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
    // 
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
    <div>
        {
            productoeditar == ""
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
                            onSubmit={submitEditarProducto}
                        >
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-6'>
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
                                            <label>Descripcion del Articulo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre Producto"
                                                name="descripcion"
                                                value={descripcion}
                                                // onChange={onChangeFormulario}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <label>Sucursales donde se venden</label>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        {
                                            articuloProvedorEditar == null ? null
                                            :
                                            <ArticuloProvEdiccion
                                                setproductoEditadoSeleccionado={setproductoEditadoSeleccionado}
                                            />
                                        }
                                        <div className='row'>
                                            <div className="form-group">
                                                <label>Minimo</label>
                                                    <input
                                                        type="number"
                                                        className="form-control2"
                                                        placeholder="Min"
                                                        name="minimos"
                                                        value={parseInt(minimos)}
                                                        // value="5"
                                                        // onChange={onChangeFormulario}
                                                        // onChange={handleLoginInputChange}
                                                        onChange={handleLoginInputChange}
                                                        // onChange={changeToInt}
                                                    />
                                                <label>Maximo</label>
                                                    <input
                                                        type="number"
                                                        className="form-control2"
                                                        placeholder="Max"
                                                        name="maximos"
                                                        value={Number(maximos)}
                                                        // onChange={onChangeFormulario}
                                                        onChange={handleLoginInputChange}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <label>Provedores</label>
                                        { articulosProvedor.length === 0 ? 'No hay conexion' : (
                                            articulosProvedor.map(articulo => (
                                                <EditarArticuloProv
                                                        key={articulo.artgen_id_articulos_provedores}
                                                        articulo={articulo}
                                                />
                                            ))
                                        ) }
                                    </div>
                                </div>
                            

                                <div className='row'>
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
 
export default EditarArticulo;