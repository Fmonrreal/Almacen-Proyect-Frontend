import { Dropdown, DropdownToggle,DropdownMenu,DropdownItem } from "reactstrap";
import {useState,useContext} from 'react';
import BodyTrasSec1 from './BodyTrasSec1'
import BodyTrasSec2 from './BodyTrasSec2'
import colorContext from 'context/color/colorContext';


const Body_traspasos = () => {
    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;
    const [dropdown,setDropdown]=useState(false);
    const [section, Setsection] = useState(0)
    const letracolor="letra"+color;
    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown)
    };

    return ( 
        <div>
            <div className="row">
                <div className="col-6">
                    <label className={`letra featureheader ${letracolor}`} >Movimiento</label>
                    <Dropdown
                        direction="down"
                        isOpen={dropdown}
                        toggle={abrirCerrarDropdown}
                    >
                        {section == 0 ?
                            <DropdownToggle caret>
                                Entrada Articulos Provedor
                            </DropdownToggle>
                        :
                            <DropdownToggle caret>
                                Transferir entre Sucursales
                            </DropdownToggle>
                        }
                        <DropdownMenu
                            persistent={true}
                        >
                            <DropdownItem onClick={() =>Setsection(0)}
                                    >
                                Entrada Articulos Provedor
                            </DropdownItem>
                            <DropdownItem onClick={() =>Setsection(1)}
                                    >
                                Transferir entre Sucursales
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {section == 0 ?
                <BodyTrasSec2/>
            :
            <BodyTrasSec1/>
            }
        </div>
     );
}
 
export default Body_traspasos;