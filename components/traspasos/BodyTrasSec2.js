import React,{useState,useContext,useEffect} from 'react';
import colorContext from 'context/color/colorContext';
import TrapasoContext from 'context/traspaso/traspasoContext';
import ProductosInput from './ProductosInput';
import GuardarInput from './GuardarInput';

const BodyTrasSec2 = () => {
    const trapasoContext = useContext(TrapasoContext);
    const {cart,CargarProductosIdVenta,LimpiarCarrito} = trapasoContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;
    const [id_pedidos, SetId_pedidos] = useState("");

    const letracolor="letra"+color;

    const submitPedidoId = e => {
        e.preventDefault();
        console.log("no deberia salir esto")
        console.log("id_pedidos",id_pedidos)
        CargarProductosIdVenta(id_pedidos)
    }

    const clearCart = () => {
        SetId_pedidos("")
        LimpiarCarrito()
    }

    return ( 
        <div>
            <div>
                <span>Pedido</span>
                <button onClick={()=>clearCart()} className="derecha"><span className='sub'>cambiar de pedido</span></button>
            </div>
            { cart.length === 0 ?
            <div>
                
                <form
                    onSubmit={submitPedidoId}
                >
                        <div>
                            <div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        placeholder="Introduce el id de compras"
                                        name="id_ventas"
                                        onChange={e => SetId_pedidos(e.target.value)}
                                    />
                                </div>
                        </div>

                        <button 
                            type="submit"
                            className="btn btn-outline-primary font-weight-bold text-uppercase "
                        >Aceptar</button>
                    </div>
                </form>
            </div>
            :
            <div>
                <ProductosInput/>
                <GuardarInput/>
            </div>
            }
        </div>
        
     );
}
 
export default BodyTrasSec2;