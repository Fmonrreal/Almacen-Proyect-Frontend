import React,{useState,useContext,useEffect} from 'react';
import colorContext from 'context/color/colorContext';
import ProductosCarritoVenta from './ProductosCarrito_Ventas';
import TotalCompra from './TotalCompra';
import ComprasContext from 'context/compras/comprasContext';


const BodyVentas = (props) => {
    
    const comprasContext = useContext(ComprasContext);
    const {cart,error,loading,SolicitudDesdeStock} = comprasContext;
    const [provedor, setprovedor] = useState(0)
    let curr = new Date();
    curr.setDate(curr.getDate());
    let fecha = curr.toISOString().substr(0,10);
    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    const letracolor="letra"+color;

    return ( 
        <div>
            <ProductosCarritoVenta/>
            {/* <TotalCompra/> */}
        </div>
        
    );
}
 
export default BodyVentas;