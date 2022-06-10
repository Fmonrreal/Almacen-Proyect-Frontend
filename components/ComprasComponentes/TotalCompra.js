import React,{useContext,useEffect} from 'react';
import ComprasContext from 'context/compras/comprasContext';
import colorContext from 'context/color/colorContext';
import SucursalContext from 'context/sucursal/sucursalContext';
import Swal from 'sweetalert2';

const TotalCompra = () => {
    const comprasContext = useContext(ComprasContext)
    const {cart,ObtenerTotales,CantidadTotal,GuardarIdCompra,GuardarCompra} = comprasContext;

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;

    const sucursalContext = useContext(SucursalContext);
    const {sucursal_seleccionada} = sucursalContext

    const letracolor="letra"+color;

    useEffect( ()=> {

        ObtenerTotales();

    }, [cart]);
    
    const iva = Number(CantidadTotal*0.16)

    const guardarIdCompra = id => {
        const id_sucursales = sucursal_seleccionada.id_sucursales
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
                    precio_compra:item.item2.artprov_precio_compra,
                    cantidad:item.quantity,
                    pendientes:item.quantity,
                })
                );       
        console.log(articulos);
        var f = new Date();
        // let fecha = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
        let fecha = f.getFullYear() + "-"+ f.getMonth()+ "-" +f.getDate();
        // GuardarIdCompra({fecha}); // Fijar un producto
        let total = CantidadTotal + iva
        GuardarCompra(fecha,articulos,id_sucursales,total); // Fijar un producto
        }
    }

    return ( 
        <div className='totalCompra'>
            <div className='total'>
                {/* <span><h1>Subtotal</h1><span className='subtotal'>{CantidadTotal}</span></span>
                <span><h1>IVA</h1><span className='iva'>{iva}</span></span>
                <span><h1>Total</h1><span className='total1'>{CantidadTotal + iva}</span></span> */}

                <table>
                    <tbody>
                        <tr>
                            <th scope="row">Subtotal</th>
                            <td className='cantidad'>{CantidadTotal}</td>
                        </tr>
                        <tr>
                            <th scope="row">IVA</th>
                            <td className='iva'>{iva}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total</th>
                            <td className='total1'>{CantidadTotal + iva}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className="guardar" onClick={()=>guardarIdCompra()}>Guardar</button>
        </div>
     );
    
}
 
export default TotalCompra;