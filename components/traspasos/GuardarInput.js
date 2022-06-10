import React,{useContext,useEffect} from 'react';
import TraspasoContext from 'context/traspaso/traspasoContext';
import colorContext from 'context/color/colorContext';
import SucursalContext from 'context/sucursal/sucursalContext';
import clienteContext from 'context/cliente/clienteContext';
import Swal from 'sweetalert2';

const GuardarInput = () => {
    const traspasoContext = useContext(TraspasoContext)
    const {cart,ObtenerTotales,CantidadTotal,GuardarInput,totalItems} = traspasoContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;

    const sucursalContext = useContext(SucursalContext);
    const {sucursal_seleccionada,sucursal_destino} = sucursalContext;

    const ClienteContext = useContext(clienteContext);
    const {clienteSeleccionado} = ClienteContext;

    const letracolor="letra"+color;

    useEffect( ()=> {

        ObtenerTotales();

    }, [cart]);
    
    const iva = Number(CantidadTotal*0.16)

    const guardarIdCompra = id => {
        const id_sucursales = sucursal_seleccionada.id_sucursales
        // const id_clientes = clienteSeleccionado.id_clientes     
        console.log(cart);
        GuardarInput(cart,id_sucursales); // Fijar un producto
        }
    

    return ( 
        <div>
            <div className="row">
                        <div className="col-6">
                            <h4>Articulos </h4>
                        </div>
                        <div className="col-6">
                            <h5>{totalItems}</h5>
                        </div>
                </div>
                <div className="row">
                        <div className="col-6">
                            <h4>Subtotal </h4>
                        </div>
                        <div className="col-6">
                            <h5>$ {CantidadTotal}</h5>
                        </div>
                </div>
                <div className="row">
                        <div className="col-6">
                            <h4>IVA </h4>
                        </div>
                        <div className="col-6">
                            <h5>$ {iva}</h5>
                        </div>
                </div>
                <div className='totalPropiedades'>
                    <span>Total:</span>
                    <span>$ {CantidadTotal + iva}</span>
                </div>
                <div>
                    <button className='guardar2' onClick={()=>guardarIdCompra()}>Guardar</button>
                </div>
        </div>
     );
    
}
 
export default GuardarInput;