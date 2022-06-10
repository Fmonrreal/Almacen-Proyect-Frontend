import React,{useContext,useEffect,useState} from 'react';
import ProductContext from 'context/productos/productContext';
import colorContext from 'context/color/colorContext';
import ComprasContext from 'context/compras/comprasContext';


const ArticuloSeleccionado = () => {

    const productContext = useContext(ProductContext);
    const {articuloSeleccionado,ArticuloActual,error,loading} = productContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;
    
    const comprasContext = useContext(ComprasContext);
    const {AgregarArticulosCarrito} = comprasContext;

    const [cantidad, setcantidad] = useState(1)

    const letracolor="letra"+color;

    useEffect( ()=> {

    
    }, [articuloSeleccionado]);
   

    return(
        
        <div className="contorno3 ponerAbajo">
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
                    <div>
                        <input id="numero" type="number" min="1" pattern="^[0-9]+" onChange={e => setcantidad(e.target.value)} value={cantidad}>
                        </input>
                        <button 
                            type="button"
                            // onClick={ () => redireccionarEdicion(producto) }
                            className="btn btn-outline-primary mr-2"
                            onClick={()=>AgregarArticulosCarrito(articuloSeleccionado,cantidad)}>
                                Agregar
                        </button>
                    </div>
                    
                </div>
            }
        </div>

    );

}
 
export default ArticuloSeleccionado;