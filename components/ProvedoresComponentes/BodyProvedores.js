import React, { useState, useEffect,useContext } from 'react';
import Paginate_Provedores from './Paginate_Provedores'
import AgregarProvedor from './AgregarProvedor'
import Modal from 'helpers/modal';

const BodyProvedores = () => {
     const [modal, abrirModal] = useState(0);

    const handleModalOnChange1 = () => {
      abrirModal(1)
    }

    const handleModalOnChange3 = () => {
      abrirModal(2)
    }

    const handleModalOnChange2 = () => {
      abrirModal(0)
    }

    useEffect(() => {
      
    }, [modal])
    
    return ( 
        <div>
            <div>
                <span>Provedores</span>
                <button onClick={()=>handleModalOnChange1()} className="derecha"><span className='sub'>crear provedor</span></button>
            </div>
            <div>
                <Paginate_Provedores/>
            </div>
            { modal == 1 ?
            <Modal
            handleModalOnChange2={handleModalOnChange2}
            >
                <AgregarProvedor/>
            </Modal>
            :
            null
        }
        </div>
     );
}
 
export default BodyProvedores;