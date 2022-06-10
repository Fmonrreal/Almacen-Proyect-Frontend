import React,{useContext} from 'react';
import Link from 'next/link';
import colorContext from 'context/color/colorContext';


const HeaderAlmacen = () => {
    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    const letracolor="letra"+color;

    return(
        <div className="row acomodoRow Altura10 ponerArriba">
            <div className="col-6">
                <h1 className={`${letracolor} featureheader`}>Lista de articulos</h1>
            </div>
            <div className="col-6">
                <Link href="/updateProductImage"><button className={`${letracolor} borderButton positionButton`}>Imagen</button></Link>
                <Link href="/agregarProducto"><button className={`${letracolor} borderButton positionButton`}>Crear Articulo</button></Link>
            </div>          
        </div>
    )
}
 
export default HeaderAlmacen;