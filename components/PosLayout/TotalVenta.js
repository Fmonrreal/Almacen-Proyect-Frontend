import React,{useContext,useEffect} from 'react';
import ComprasContext from 'context/compras/comprasContext';
import colorContext from 'context/color/colorContext';
import SucursalContext from 'context/sucursal/sucursalContext';
import clienteContext from 'context/cliente/clienteContext';
import Swal from 'sweetalert2';

const TotalVenta = () => {
    const comprasContext = useContext(ComprasContext)
    const {cart,ObtenerTotales,CantidadTotal,GuardarIdCompra,GuardarVenta,totalItems} = comprasContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;

    const sucursalContext = useContext(SucursalContext);
    const {sucursal_seleccionada} = sucursalContext;

    const ClienteContext = useContext(clienteContext);
    const {clienteSeleccionado} = ClienteContext;

    const letracolor="letra"+color;

    useEffect( ()=> {

        ObtenerTotales();

    }, [cart]);
    
    const iva = Number(CantidadTotal*0.16)

    const guardarIdCompra = id => {
        const id_sucursales = sucursal_seleccionada.id_sucursales
        const id_clientes = clienteSeleccionado.id_clientes
        const articulos = []
        if(cart[0] == null){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Agrega un producto al carrito'
            })
            return
        }else{
        let mapeo = cart.map((item) =>
                // articulo = {
                //     id_articulos_provedores:{item.item2.artprov_id_articulos_provedores},
                //     precio_compra={item.item2.artprov_precio_compra},
                //     precio_compra={item.quantity}
                // },
                // count = articulos.push(articulo)
                articulos.push({
                    id_articulos_provedores:item.item2.artprov_id_articulos_provedores,
                    precio:item.item2.artprov_precio1,
                    cantidad:item.quantity,
                    descuento:"ninguno"
                })
                );       
        console.log(articulos);
        var f = new Date();
        // let fecha = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
        let fecha = f.getFullYear() + "-"+ f.getMonth()+ "-" +f.getDate();
        // GuardarIdCompra({fecha}); // Fijar un producto
        GuardarVenta(fecha,articulos,id_sucursales,id_clientes); // Fijar un producto
        }
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
                            <h5>$ {CantidadTotal}.00</h5>
                        </div>
                </div>
                <div className="row">
                        <div className="col-6">
                            <h4>IVA </h4>
                        </div>
                        <div className="col-6">
                            <h5>$ {iva}.00 </h5>
                        </div>
                </div>
                <div className='totalPropiedades'>
                    <span>Total:</span>
                    <span>$ {CantidadTotal + iva}.00</span>
                </div>
                <div>
                    <button className='guardar2' onClick={()=>guardarIdCompra()}>Guardar</button>
                </div>
        </div>
     );
    
}
 
export default TotalVenta;