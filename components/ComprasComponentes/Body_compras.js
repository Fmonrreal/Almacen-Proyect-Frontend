import React,{useState,useContext,useEffect} from 'react';
import colorContext from 'context/color/colorContext';
import ProductosCarritoCompra from './ProductosCarrito_Compras';
import TotalCompra from './TotalCompra';
import ComprasContext from 'context/compras/comprasContext';


const BodyCompras = (props) => {
    
    const comprasContext = useContext(ComprasContext);
    const {cart,error,loading,SolicitudDesdeStock} = comprasContext;
    const [provedor, setprovedor] = useState(0)
    let curr = new Date();
    curr.setDate(curr.getDate());
    let fecha = curr.toISOString().substr(0,10);
    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    const letracolor="letra"+color;
    let nm;
    // fecha.setDate(fecha.getDate());
    // fecha.getDate();


    useEffect(() => {
      
        if(SolicitudDesdeStock==true){
            props.handleModalOnChange()
        }
        
      }
    , [SolicitudDesdeStock]);
    

    return ( 
        <div>
            <h2 className={`${letracolor} "text-center mb-4 featureheader`}>
                Orden de compra
            </h2>
            <div className="row">
                <div className="col-6">
                    <label>Lugar de Entrega</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre Producto"
                        name="name"
                        value="Sucursal 1"
                        // onChange={e => guardarNombre(e.target.value)}
                    />
                </div>
                <div className="col-6">
                <label>fecha</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre Producto"
                        name="fecha"
                        value={fecha}
                        // onChange={e => guardarNombre(e.target.value)}
                    />
                </div> 
            </div>
            <div className="row">
                <div className="col-6">
                    {cart.length == 0 
                        ?
                        null
                        :
                        (
                         nm = cart.find(producto => producto != undefined),
                        <div>
                            <label>provedor</label>
                            <h1>{nm.item2.artprov_id_provedores}</h1>
                        </div>
                        )
                    }     
                </div>
                <div className="col-6">
                    <button 
                        className={`${letracolor} borderButton positionButton`}
                        onClick={props.handleModalOnChange}
                    >Agregar Articulo</button>
                </div> 
            </div>
            <ProductosCarritoCompra/>
            <TotalCompra/>

        </div>
        
    );
}
 
export default BodyCompras;