import React, { useState, useEffect,useContext } from 'react';
import StockContext from 'context/stock/stockContext';

const EditarArticuloProv = ({articulo}) => {

    const stockContext = useContext(StockContext);
    const {EditarArticuloProvedorAction} = stockContext;

    const { artgen_precio1,provider_razon} = articulo;

    const Producto_a_editar = articulo => {
        console.log("deberia editar producto")
        EditarArticuloProvedorAction(articulo)
    }

    return ( 

        <div className="row" onClick={()=>Producto_a_editar(articulo)}>
            <div className="col-9">
                <h1>{provider_razon}</h1>
            </div>
            <div className="col-3">
                <h1>{artgen_precio1}</h1>
            </div>
        </div>
        
     );
}
 
export default EditarArticuloProv;