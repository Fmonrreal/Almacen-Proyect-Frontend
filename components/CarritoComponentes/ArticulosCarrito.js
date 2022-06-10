import React, { Fragment, useEffect,useContext,useState } from 'react';
import ArticuloCarrito from './ArticuloCarrito';
import ProductContext from 'context/productos/productContext';
import ComprasContext from 'context/compras/comprasContext';
import SucursalContext from 'context/sucursal/sucursalContext';
import ArticuloCarSeleccionado from './ArticuloCarSeleccionado';
import BtnAgregarMany_Venta from './BtnAgregarMany_Venta'
import BtnAgregarUno_Venta from './BtnAgregarUno_Venta';
import { useForm } from "/hooks/useForm";

const ArticulosCarrito = (props) => {

    const productContext = useContext(ProductContext);
    const {articuloSeleccionado,filtrarArticulosAction,articulos,error,loading,clearProductState,ArticuloActual,LimpiarArticulosAction} = productContext;
    
    const comprasContext = useContext(ComprasContext)
    const {cart,SolicitudDesdeStock,nombreProducto,SolicitudStock} = comprasContext;

    const sucursalContext = useContext(SucursalContext);
    const {sucursal_seleccionada} = sucursalContext

    // clearProductState();
    const [id_supplier, setid_supplier] = useState(0)
    const [name, guardarNombreBus] = useState('');

    const id_sucursales = sucursal_seleccionada.id_sucursales

    let mostrarproductoActual =  false;

    // useEffect( ()=> {

    //     if(cart.length == 1){
    //         let n = cart[0]
    //         setid_supplier(n.item2.artprov_id_provedores)
    //         filtrarArticulosAction({name,id_supplier,id_sucursales})
    //         console.log(cart.length)
    //         console.log(n)
    //         console.log("name es igual a",name)
    //         console.log("id_supplier es igual a",id_supplier)
    //         console.log("se agrego un articulo a cart")  
    //     }

    //     if(SolicitudDesdeStock==true){
    //         guardarNombreBus(nombreProducto)
    //         console.log(name)
    //         SolicitudStock('',false)
    //     }else{
    //         // filtrarArticulosAction({name,id_supplier})
    //     }

    // }, [cart,id_supplier,SolicitudDesdeStock,SolicitudStock]);

    return ( 
       <div className='row'>
           <div className='col-12'>
                <div className="container login-container">
                        <div className="row">
                            <div className="col-md-12 login-form-1">
                                    <div className="form-group">
                                        <button 
                                            onClick={() => filtrarArticulosAction({name,id_supplier,id_sucursales})}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                          </svg></button>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            placeholder="Coloca el nombre para busqueda"
                                            name="name"
                                            value={name}
                                            onChange={e => guardarNombreBus(e.target.value)}
                                        />
                                    </div>
                            </div>
                        </div>
                    </div>

            

                
                  
            </div>
            <div className='row'>
                <div className='col'>
                    <div><button onClick={() => guardarNombreBus("bl")}></button></div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                        { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                         { loading ? <p className="text-center">Cargando....</p> : null }

                        { articulos.length === 0 ? 'No hay productos' : (
                            articulos.map(articulo => (
                                <ArticuloCarrito
                                        key={articulo.artprov_id_articleprov}
                                        articulo={articulo}
                                >
                                   {props.children} 
                                </ArticuloCarrito>
                            ))
                        ) }
                </div>
                {/* {articuloSeleccionado != null ? */}
                    <div className='col'>
                        <ArticuloCarSeleccionado>
                            <BtnAgregarMany_Venta/>
                        </ArticuloCarSeleccionado>
                    </div>
                {/* :null
                } */}
            </div>
       </div>
     );
}
 
export default ArticulosCarrito;