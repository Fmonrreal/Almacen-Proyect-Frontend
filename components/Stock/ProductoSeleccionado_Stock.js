import React,{useContext,useEffect} from 'react';
import Producto_Stock from './Producto_Stock';
import colorContext from 'context/color/colorContext';
import StockContext from 'context/stock/stockContext';
import ComprasContext from 'context/compras/comprasContext';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';


const ProductosSeleccionados_Stock = () => {

    const stockContext = useContext(StockContext);
    const {productoSeleccionado,productoActual,error,loading} = stockContext;

    const comprasContext = useContext(ComprasContext);
    const {SolicitudStock} = comprasContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;

    const router = useRouter()

    let producto2;
    let provedor2;
    

    const letracolor="letra"+color;
    const fondocolor="fondo"+color;
    let direccion="http://localhost:4000/products/product-image/"
    
    useEffect( ()=> {

        // const {producto,provedores} = productoSeleccionado
        // if(productoSeleccionado != null){
        //     console.log(productoSeleccionado)
        //     const {producto,provedor} = productoSeleccionado;
        //     producto2 = producto
        //     provedor2 = provedor
        //     console.log(producto2)
        // }
        if(productoSeleccionado != null){
        const {producto,provedor} = productoSeleccionado;
        }
    
    }, [productoSeleccionado]);

   
    const SolicitarOrden = productoSolicitado => {
         // Fijar un producto
         const estado = true;
         router.push('/cotizacion');
         SolicitudStock(productoSolicitado,estado);
    }

    return(
        
        <div className="contorno2 ponerAbajo">
            {productoSeleccionado == null ?
                <div>
                    <h1 className={letracolor}>Detalles del articulo</h1>
                    <br/>
                    
                    <h2>Selecciona un articulo para ver sus detalles</h2>
                </div>
            : 
                <div>
                    <h1 className={letracolor}>Detalles del articulo</h1>
                    <br/>
                    {productoSeleccionado.producto.n_productImage === null ? null :
                    <a>
                        <img 
                        src={`${productoSeleccionado.producto.n_productImage}`}
           
                        alt="new"
                        />
                    </a>
                    }
                    {/* <h2>direccion </h2><span>{productoSeleccionado.producto.n_productImage}</span> */}
                    <h2>Id </h2><span>{productoSeleccionado.producto.n_id_articulos}</span>
                    <h2>Nombre </h2><span>{productoSeleccionado.producto.n_nombre}</span>
                    <h2>imagen </h2><span>{productoSeleccionado.producto.n_productImage}</span>
                    <h2>cantidad </h2><span>{productoSeleccionado.producto.sum}</span>
                    <h2>Precio de compra</h2>
                    {productoSeleccionado.provedores.length == 0 
                        ?
                        null
                        :
                        
                    (productoSeleccionado.provedores.map(provedor => 
                    (<div>
                        
                        <h1>{provedor.sup_razon}</h1>
                        <h1>{provedor.artprov_precio_compra}</h1>
                    </div>))
                        )
                    }
                    <Button className={color} onClick={() =>SolicitarOrden(productoSeleccionado.producto.n_nombre)}>Solicitar</Button>
                </div>
            }
        </div>
    

    );

}
 
export default ProductosSeleccionados_Stock;