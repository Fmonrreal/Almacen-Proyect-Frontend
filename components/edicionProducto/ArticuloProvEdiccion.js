import React, { useState, useEffect,useContext } from 'react';
import StockContext from 'context/stock/stockContext'

const ArticuloProvEdiccion = (props) => {

    const stockContext = useContext(StockContext);
    const {articuloProvedorEditar} = stockContext;

    const [precio_compra, setPreciocompra] = useState(0)
    const [precio1, setPrecioventa] = useState(0)

    useEffect(() => {
        if(articuloProvedorEditar!=null){
            setPreciocompra(articuloProvedorEditar.artgen_precio_compra)
            setPrecioventa(articuloProvedorEditar.artgen_precio1)
        }
        // props.setproductoEditadoSeleccionado({precio_compra,precio1})
    }, [articuloProvedorEditar])
    
    // const changeInValues1 = ( target ) => {
    //     if(target.value != precio1){
    //         setPrecioventa(target.value)
    //         changeInValues1(target)
    //     }
    //     props.setproductoEditadoSeleccionado({precio_compra,precio1})

    //     // setTimeout(() => {
    //     //     props.setproductoEditadoSeleccionado({precio_compra,precio1})
    //     // }, 1000);
    // }
    const setStateAsync = (state) =>{
        setPrecioventa(state)
        return state
    }

    const changeInValues1 = async ( target ) => {
        await setStateAsync(Number(target.value));
        await props.setproductoEditadoSeleccionado({precio_compra,precio1})
    }

    // const changeInValues1 = ( target ) => {
    //     this.setPrecioventa(Number(target.value), () => {
    //         this.props.callback(this.state.name)
    //     })
    //     props.setproductoEditadoSeleccionado({precio_compra,precio1})
    // }
    
    const changeInValues2 = async ( target ) => {
        setPreciocompra(Number(target.value))
        await props.setproductoEditadoSeleccionado({precio_compra,precio1})
    }


    return ( 
        <div className='row'>
            <div className="form-group">
                <label>Precio venta</label>
                    <input
                        type="number"
                        className="form-control2"
                        placeholder="Precio venta"
                        name="minimos"
                        value={precio1}
                        onChange={e=>changeInValues1(e.target)}
                    />
                <label>Precio compra</label>
                    <input
                        type="number"
                        className="form-control2"
                        placeholder="Precio compra"
                        name="maximos"
                        value={precio_compra}
                        // onChange={e=>setPreciocompra(Number(e.target.value))}
                        onChange={e=>changeInValues2(e.target)}
                    />
            </div>
        </div>
     );
}
 
export default ArticuloProvEdiccion;