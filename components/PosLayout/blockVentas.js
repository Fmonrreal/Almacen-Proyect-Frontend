import { useContext, useEffect } from "react";
import colorContext from "context/color/colorContext";
import ProductosCarrito from "./ProductosCarrito";
import Seleccion_sucursal from "./SeleccionSurcursal";
import BodyVentas from "/components/VentasComponentes/Body_Ventas"

const BlockVentas = (props) => {
    //Acediendo al state color
    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    console.log(color);

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         elegircolor('Rojo');
    //     },3000);
    // },[]);

    useEffect(()=>{
        console.log('color cambio')
    },[color]);

    const handleInputChange = ({target}) => {

        elegircolor(
            target.value
        )
    }

    return ( 
        <div className="divAbove">
            {/* <div className="row acomodoRow">
            <div className="col-6">
                <h5>Nombre de la tienda</h5>
                <h6>Punto de venta | Sucursal Nombre chido</h6>
            </div>
            <div className="col-6">
                <h5>Jesus Gerrado Saucedo Gonzalez</h5>
                <h6>Punto de venta | Sucursal Nombre chdo</h6>
            </div>          
            </div> */}
            <div className="divmargin">
                
                <button className="butonFeatures">Añadir</button>
                <button className="butonFeatures" onClick={props.handleModalOnChange}>Buscar Articulo</button>
                <button  className={`${color} butonFeatures`} onClick={handleInputChange} value="blue">Color azul</button>
                <button className={`${color} butonFeatures`} onClick={handleInputChange} value="purple">Color morado</button>
                <hr/>
                {/* <h1>Articulos en esta compra</h1> */}
                <div className="width100">
                    {/* <ProductosCarrito/> */}
                    <BodyVentas/>
                </div>
                
            </div>
            <div>
                
            </div>
        </div>
     );
}
 
export default BlockVentas;