import Traspasos_sel_sucursal from './traspasos_sel_sucursal'
import React,{useState,useContext,useEffect} from 'react';
import colorContext from 'context/color/colorContext';
import Modal from 'helpers/modal';
import ArticulosCarrito from 'components/CarritoComponentes/ArticulosCarrito'
import BtnAgregarUno_Venta from "components/CarritoComponentes/BtnAgregarUno_Venta.js";
import ProductosTransfCar from './ProductosTransfCar'
import GuardarTransf from './GuardarTransf';

const BodyTrasSec1 = () => {

    const ColorContext = useContext(colorContext);
    const {color} = ColorContext;
    const [modal, abrirModal] = useState(0);

    const letracolor="letra"+color;

    const handleModalOnChange1 = () => {
        abrirModal(1)
      }
  
    const handleModalOnChange2 = () => {
    abrirModal(0)
    }
    return ( 
        <div>
            <Traspasos_sel_sucursal/>
            <div className="row">
                <div className="col-6">
                       
                </div>
                <div className="col-6">
                    <button 
                        className={`${letracolor} borderButton positionButton`}
                        onClick={()=>handleModalOnChange1()}
                    >Agregar Articulo</button>
                </div> 
            </div>
            <ProductosTransfCar/>
            <GuardarTransf/>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <ArticulosCarrito>
                    <BtnAgregarUno_Venta
                        />
                </ArticulosCarrito>
            </Modal>
            :
            null
        }
        </div>
        
     );
}
 
export default BodyTrasSec1;