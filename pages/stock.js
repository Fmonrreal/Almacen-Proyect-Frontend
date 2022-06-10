import React,{useContext,useState,useEffect} from 'react';
import Layout from "components/mainLayout/Layout";
import Productos_Stock from "components/Stock/Productos_Stock";
import Paginate_Productos_Stock from "components/Stock/Paginate_Productos_Stock";
import ProductosSeleccionados_Stock from "components/Stock/ProductoSeleccionado_Stock";
import StockContext from 'context/stock/stockContext';
import EditarArticulo from 'components/edicionProducto/editarArticulo'
import colorContext from 'context/color/colorContext';

const Stock = () => {
    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    const stockContext = useContext(StockContext);
    const {cambiarModal,modal,EditarArticuloProvedorAction} = stockContext;

    const letracolor="letra"+color;

    // const [modal, abrirModal] = useState(false);
    const [modal2, abrirModal2] = useState(0);

    const handleModalOnChange2 = () => {
      abrirModal2(0)
      cambiarModal(false)
      EditarArticuloProvedorAction(null)
    }
    useEffect(() => {
        // abrirModal2(true)
        if(modal==true){
            abrirModal2(1)
        }
    }, [modal])
    

    return( 
    <div>   
        <Layout>
            {/* <Productos_Stock/> */}
            <h2 className={`letra featureheader ${letracolor}`} >Listado de Productos en Stock</h2>
            <div className="row">
                <div className="col-9">
                    <Paginate_Productos_Stock
                    // handleModalOnChange={handleModalOnChange}
                        />
                </div>
                <div className="col-3">
                    <ProductosSeleccionados_Stock/>
                </div>
            </div>
            
            
        </Layout>
        { modal2 == 1 
                ? 
                    <div className="popup">
                        <div className="popup-inner">
                            <button className="close-btn" onClick={()=>handleModalOnChange2()}>X</button>
                            {/* <ProductosShopping/> */}
                            <EditarArticulo/>
                        </div>
                    </div> 
                : null
        }
    </div>
    );
}
 
export default Stock;