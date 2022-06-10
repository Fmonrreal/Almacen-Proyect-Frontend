import React,{useContext,useEffect} from 'react';
import ProductContext from 'context/productos/productContext';
import colorContext from 'context/color/colorContext';


const Productos = () => {

    const productContext = useContext(ProductContext);
    const {productoSeleccionado,productoActual,error,loading} = productContext;

    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    

    const letracolor="letra"+color;
    // const {id,name,precio,productImage} = productoSeleccionado;
    // const ImagenName = "casco2b2aa9bd-f630-4e45-a0c7-b1d865fba355.jfif";
    // const ImagenName = "casco2b2aa9bd-f630-4e45-a0c7-b1d865fba355.jfif"

    // if(productoSeleccionado===null){
    //     let direccion="http://localhost:4000/products/product-image/casco2b2aa9bd-f630-4e45-a0c7-b1d865fba355.jfif"
    // }else{
    //     let direccion=`http://localhost:4000/products/product-image/${productoSeleccionado.productImage }`
    // }
    // const direccion=`http://localhost:4000/products/product-image/${productoSeleccionado.productImage}`
    // let direccion="http://localhost:4000/products/product-image/casco2b2aa9bd-f630-4e45-a0c7-b1d865fba355.jfif"
    let direccion="http://localhost:4000/products/product-image/"
    
    useEffect( ()=> {

        if(productoSeleccionado!==null){
            direccion= `http://localhost:4000/products/product-image/`;
            // direccion= `http://localhost:4000/products/product-image/${productoSeleccionado.productImage}`;
            // ImagenName={productoSeleccionado.productImage};
            // direccion=`http://localhost:4000/products/product-image/${ImagenName}`;
        //    direccion="http://localhost:4000/products/product-image/casco2b2aa9bd-f630-4e45-a0c7-b1d865fba355.jfif"
        }
        
    
    }, [productoSeleccionado]);

    return(
        
        <div className="contorno3 ponerAbajo">
            {productoSeleccionado === null ?
                <div>
                    <h1 className={letracolor}>Detalles del articulo</h1>
                    <br/>
                    
                    <h2>Selecciona un articulo para ver sus detalles</h2>
                </div>
            : 
                <div>
                    <h1 className={letracolor}>Detalles del articulo</h1>
                    <br/>
                    {productoSeleccionado.productImage === null ? null :
                    <a>
                        <img 
                        // src=`${productoSeleccionado.productImage}`
                        // // src={direccion}
                        // src={direccion+productoSeleccionado.productImage}
                        // src={`http://localhost:4000/products/product-image/${productoSeleccionado.productImage}`}
                        src={`${productoSeleccionado.productImage}`}
           
                        alt="new"
                        />
                    </a>
                    }
                    <h2>direccion </h2><span>{direccion+productoSeleccionado.productImage}</span>
                    <h2>Id </h2><span>{productoSeleccionado.id}</span>
                    <h2>Nombre </h2><span>{productoSeleccionado.name}</span>
                    <h2>Precio </h2><span>{productoSeleccionado.precio}</span>
                    <h2>imagen </h2><span>{productoSeleccionado.productImage}</span>

                </div>
            }
        </div>

    );

}
 
export default Productos;