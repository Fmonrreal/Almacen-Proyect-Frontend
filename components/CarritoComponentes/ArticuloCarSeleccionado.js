import React,{useContext,useEffect,useState} from 'react';
import ProductContext from 'context/productos/productContext';
import colorContext from 'context/color/colorContext';



const ArticuloCarSeleccionado = (props) => {

    const productContext = useContext(ProductContext);
    const {articuloSeleccionado,ArticuloActual,error,loading} = productContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;

    const letracolor="letra"+color;

    useEffect( ()=> {

    
    }, [articuloSeleccionado]);
   

    return(
        
        <div className="contorno ponerAbajo">
            {articuloSeleccionado == null ?
                <div>
                    <h1 className={letracolor}>Detalles del articulo</h1>
                    <br/>
                    
                    <h2>Selecciona un articulo para ver sus detalles</h2>
                </div>
            : 
                <div>
                    <h1 className={letracolor}>Detalles del articulo</h1>
                    <br/>
                    {articuloSeleccionado.artgen_productImage === null ? null :
                    <a>
                        <img 
                        src={`${articuloSeleccionado.artgen_productImage}`}
           
                        alt="new"
                        />
                    </a>
                    }
                    <h2>{articuloSeleccionado.artgen_nombre}</h2>
                    <h2>{articuloSeleccionado.artgen_descripcion}</h2>
                    <h2>Inventario </h2><span>{articuloSeleccionado.sum}</span>
                    <h2>Precio </h2><span>{articuloSeleccionado.artprov_precio_compra}</span>
                    
                    {props.children}
                    
                </div>
            }
        </div>

    );

}
 
export default ArticuloCarSeleccionado;