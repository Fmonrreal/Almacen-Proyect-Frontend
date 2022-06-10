import React,{useContext,useState} from 'react';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ProductContext from 'context/productos/productContext';
import StockContext from 'context/stock/stockContext';


// Redux
// import { useDispatch } from 'react-redux';
// import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto_Stock = ({producto,props}) => {
    const stockContext = useContext(StockContext);
    const {borrarProductoAction,productoActual,obtenerProductoEditar,cambiarModal,obtenerArticuloEditar,obtenerProductosProvedorAction} = stockContext;
    const { n_nombre, n_minimos, n_maximos,sum, n_id_articulos} = producto;

    const router = useRouter()

    // const [modal, abrirModal] = useState(false);

    // const handleModalOnChange = () => {
    //   abrirModal(true)
    // //   clearProductState();
    // }

    // const handleModalOnChange2 = () => {
    //   abrirModal(false)
    // }


    // const dispatch = useDispatch();
    // const history = useHistory(); // habilitar history para redirección

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = n_id_articulos => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( borrarProductoAction(n_id_articulos) );
            }
        });
    }

    // función que redirige de forma programada
    // const redireccionarEdicion = producto => {
    //     obtenerArticuloEditar(producto);
    //     router.push('/updateProducto');
    // }

    const seleccionProducto_Stock = n_id_articulos => {
        // console.log(n_id_articulos)
        productoActual(n_id_articulos,producto); // Fijar un producto
    }

    const Producto_a_editar = producto => {
        let id_articulos = n_id_articulos
        console.log(id_articulos)
        obtenerArticuloEditar(producto);
        obtenerProductosProvedorAction(id_articulos)
        cambiarModal(true);
    }

    let Status = "";
    let Statuscolor = "Bajo_Stock";

    if(sum==0)
    {
        Status = "Sin Stock"
        Statuscolor = "Sin_Stock"
    }else{
        if(sum>=n_minimos && sum<=n_maximos){
            Status = "Normal"
            Statuscolor = "Normal"
        }else{
            if(sum>n_maximos){
                Status = "Alto Stock"
                Statuscolor = "Alto_Stock"
            }else{
                Status = "Bajo Stock"
                Statuscolor = "Bajo_Stock";
            }
        }
    }
        

    return ( 
        // <div>

            <tr onClick={ () => seleccionProducto_Stock(n_id_articulos)} onDoubleClick={()=>Producto_a_editar(producto)}>
                <td>{n_nombre}</td>
                <td>{n_minimos}</td>
                <td>{n_maximos}</td>
                {
                    sum == null ? <td>{0}</td> : <td>{sum}</td>
                }
                <td className={`${Statuscolor}`}>{Status}</td>
                
            </tr>
  
        
     );
}
 
export default Producto_Stock;