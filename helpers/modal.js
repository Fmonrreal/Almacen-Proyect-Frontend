import {useState} from 'react';


const Modal = (props) => {
// const Modal = (children,props) => {
    // const [modal, abrirModal] = useState(false);

    // const handleModalOnChange = () => {
    //   abrirModal(true)
    // }

    // const handleModalOnChange2 = () => {
    //   abrirModal(false)
    // }

    return ( 
        <div>
            <div className="modal2">
                <div className="modal2-inner">
                    {/* <button className="close-btn">X</button> */}
                    <button className="close-btn" onClick={props.handleModalOnChange2}>X</button>
                    {props.children}  
                </div>
            </div> 
        </div>
     );
}
 
export default Modal;