import { Dropdown, DropdownToggle,DropdownMenu,DropdownItem } from "reactstrap";
import {useState,useContext} from 'react';
// import {EstadPorTiempo} from "./EstadPorTiempo";
import EstadPorTiempo from "./EstadPorTiempo";
import EstadPorMes from "./EstadPorMes";
import EstadPorYear from "./EstadPorYear";
import EstadPorProd from "./EstadPorProd";
import colorContext from 'context/color/colorContext';



const BodyEstadisticas = () => {
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
                                Estadisticas por tiempo
                            </DropdownToggle>
                        :
                            section == 1 ?
                            <DropdownToggle caret>
                                Estadisticas por Mes
                            </DropdownToggle>
                            :
                            <DropdownToggle caret>
                                Estadisticas por Año
                            </DropdownToggle>
                        }
                        <DropdownMenu
                            persistent={true}
                        >
                            <DropdownItem onClick={() =>Setsection(0)}
                                    >
                                Estadisticas por tiempo
                            </DropdownItem>
                            <DropdownItem onClick={() =>Setsection(1)}
                                    >
                                Estadisticas por Mes
                            </DropdownItem>
                            <DropdownItem onClick={() =>Setsection(2)}
                                    >
                                Estadisticas por Año
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {section == 0 ?
                <EstadPorTiempo/>
            :
               section == 1 ?
                    <EstadPorProd/>
                :
                <EstadPorYear/>
            }
        </div>
     );
}
 
export default BodyEstadisticas;