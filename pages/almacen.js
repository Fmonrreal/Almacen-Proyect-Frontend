// function Almacen(){
//     return <h1>Almacen</h1>
// }

// export default Almacen

import Layout from "components/mainLayout/Layout";
import Productos from "components/productComponentes/Productos";
import HeaderAlmacen from "components/productComponentes/HeaderAlmacen";
import ProductoSeleccionado from "components/productComponentes/ProductoSeleccionado";
import NuevoProductos from "components/productComponentes/NuevoProducto";
import FormBusqueda from "components/productComponentes/FormBusqueda";
const Almacen = () => (
    <div>   
        <Layout>
            <HeaderAlmacen/>
            <Productos/>
            <ProductoSeleccionado/>
        </Layout>
    </div>
)
 
export default Almacen;