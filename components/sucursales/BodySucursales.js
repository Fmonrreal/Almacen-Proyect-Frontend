import React,{useState,useContext,useEffect} from 'react';
import colorContext from 'context/color/colorContext';
import Modal from 'helpers/modal';
import AgregarSucursal from './AgregarSucursal';
import Paginate_Sucursales from './Paginate_Sucursales' ;

const BodySucursales = () => {

    const [modal, abrirModal] = useState(0);

    const handleModalOnChange1 = () => {
        abrirModal(1)
    }

    const handleModalOnChange2 = () => {
    abrirModal(0)
    }

    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    const letracolor="letra"+color;

    return ( 
        <div>
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
            <Paginate_Sucursales/>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <AgregarSucursal
                    handleModalOnChange2={handleModalOnChange2}
                />
            </Modal>
            :
            null
        }
        </div>
     );
}
 
export default BodySucursales;