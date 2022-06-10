import React,{useState} from 'react';
import Layout from "components/mainLayout/Layout";
import BodyCompras from "components/ComprasComponentes/Body_compras";
import ArticulosShopping from 'components/ComprasComponentes/ArticulosShopping';


const Stock = () => {
    const [modal, abrirModal] = useState(false);

    const handleModalOnChange = () => {
      abrirModal(true)
    //   clearProductState();
    }

    const handleModalOnChange2 = () => {
      abrirModal(false)
    }

    return(
        <div>
            <Layout>
                <BodyCompras
                    handleModalOnChange={handleModalOnChange}
                />
                
            </Layout>
            { modal == true 
            ? 
                <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={handleModalOnChange2}>X</button>
                    {/* <ProductosShopping/> */}
                    <ArticulosShopping/>
                </div>
                </div> 
            : null
            }
        </div>
    )
}
 
export default Stock;