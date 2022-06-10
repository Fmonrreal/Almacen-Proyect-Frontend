
import ShoppingContext from 'context/shopping/shoppingContext';
import ComprasContext from 'context/compras/comprasContext';
import { useEffect,useContext } from 'react';
import SeleccionCliente from 'components/ClienteComponente/SeleccionCliente';
import TotalVenta from './TotalVenta';

const BlockVentas2 = () => {

    // const shoppingContext = useContext(ShoppingContext);
    // const {cart,ObtenerTotales,totalItems,CantidadTotal} = shoppingContext;

    const comprasContext = useContext(ComprasContext)
    const {CantidadTotal,totalItems} = comprasContext;

    const iva = CantidadTotal*0.16

    // useEffect( ()=> {

    //     ObtenerTotales();

    // }, [cart]);
    

    return ( 
        <div>
        <div className="row borde divAbove">
            <div className="col-4">
                <SeleccionCliente/>
            </div>
            <div className="col-4">
                <h6>Comentarios</h6>
                <form>
                    <div className="form-group">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </form>
                <div className="row">
                    <div className="col-8">
                        <h5>Descuento total: </h5>
                        <h5>Ahorras en esta compra: </h5>
                        <h5>Total antes de descuentos: </h5>
                    </div>
                    <div className="col-4">
                        <h5>$00,000.00 </h5>
                        <h5>$00,000.00</h5>
                        <h5>$00,000.00 </h5>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <TotalVenta/>
            </div>          
        </div>
        </div>
     );
}
 
export default BlockVentas2;