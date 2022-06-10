import { Dropdown, DropdownToggle,DropdownMenu,DropdownItem } from "reactstrap";
import {react,useState,useContext} from 'react';
import StockContext from 'context/stock/stockContext';

const Dropdown_right = (props) => {
    const stockContext = useContext(StockContext);
    const {cambiarEstadoAction} = stockContext;
    const [dropdown,setDropdown]=useState(false);

    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown)
    }
    
    return (  
        <div className="d-flex justify-content-center p-5">
            <Dropdown
                direction="end"
                isOpen={dropdown}
                toggle={abrirCerrarDropdown}
            >
                <DropdownToggle caret>
                    Dropdown
                </DropdownToggle>
                <DropdownMenu
                    persistent={true}
                >
                    
                    <DropdownItem eventKey="Primary" onClick={() => props.guardarStatusFilter(4)}>
                        {/* <span eventKey="Primary" >Sin Stock</span> */}
                        Sin Stock
                    </DropdownItem>
                    <DropdownItem eventKey="second" onClick={() => props.guardarStatusFilter(1)}>
                        {/* <span eventKey="Second" >Bajo Stock</span> */}
                        Bajo Stock
                    </DropdownItem >
                    <DropdownItem eventKey="third" onClick={() => props.guardarStatusFilter(2)} >
                        Normal
                    </DropdownItem>
                    <DropdownItem eventKey="fourth" onClick={() => props.guardarStatusFilter(3)}>
                        Alto Stock
                    </DropdownItem>
                    
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
 
export default Dropdown_right;