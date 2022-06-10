import Layout from "../components/mainLayout/Layout.js";
import BlockVentas2 from "components/PosLayout/blockVentas2.js";
import BlockVentas from "components/PosLayout/blockVentas.js";
import HeaderPos from "components/PosLayout/HeaderPos.js";
import React,{useContext,useEffect,Component,useState } from 'react';
import AuthContext from 'context/autenticacion/authContext';
import ProductContext from 'context/productos/productContext';
import ArticulosCarrito from "components/CarritoComponentes/ArticulosCarrito.js";
import BtnAgregarUno_Venta from "components/CarritoComponentes/BtnAgregarUno_Venta.js";


const Home = () => {

    //extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    const productContext = useContext(ProductContext);
    const {clearProductState} = productContext;

    useEffect(() => {
      usuarioAutenticado();
    }, []);

    // state = {
    //   modal: false,
    // };
  
    // abrirModal = (e) => {
    //   this.setState({
    //     modal: true,
    //   });
    // };

    const [modal, abrirModal] = useState(false);

    // abrirModal = (e) => {
    //     this.setState({
    //       modal: true,
    //     });
    //   };

    const handleModalOnChange = () => {
      abrirModal(true)
      clearProductState();
    }

    const handleModalOnChange2 = () => {
      abrirModal(false)
    }



    return(
    <div>
      {/* <Sidebar/> */}
      <Layout>   
        <HeaderPos/>
        <div className="bodyposition">
          <BlockVentas
            handleModalOnChange={handleModalOnChange}
          />
          {/* <Topbar/> */}
          <BlockVentas2/>
        </div>
        
      </Layout>
      
      { modal == true ? 
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={handleModalOnChange2}>X</button>
            <ArticulosCarrito>
              <BtnAgregarUno_Venta
                  />
            </ArticulosCarrito>
          </div>
        </div> 
        : null}
     
      
      
        {/* <h1>Inicio</h1> */}
    </div>
    )
  }


export default Home;