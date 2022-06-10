import React,{useContext} from 'react';
import ComprasContext from 'context/compras/comprasContext';
import ArticulosCarrito from "./ArticulosCarrito";

const FiltradorPorProv = () => {

    const comprasContext = useContext(ComprasContext)
    const {cart,SolicitudDesdeStock,nombreProducto,SolicitudStock} = comprasContext;

    useEffect( ()=> {

        if(cart.length == 1){
            let n = cart[0]
            setid_supplier(n.item2.artprov_id_provedores)
            filtrarArticulosAction({name,id_supplier,id_sucursales})
            console.log(cart.length)
            console.log(n)
            console.log("name es igual a",name)
            console.log("id_supplier es igual a",id_supplier)
            console.log("se agrego un articulo a cart")  
        }

        if(SolicitudDesdeStock==true){
            guardarNombreBus(nombreProducto)
            console.log(name)
            SolicitudStock('',false)
        }else{
            // filtrarArticulosAction({name,id_supplier})
        }

    }, [cart,id_supplier,SolicitudDesdeStock,SolicitudStock]);

    return (  
        <div>
            <ArticulosCarrito/>
        </div>
    );
}
 
export default FiltradorPorProv;