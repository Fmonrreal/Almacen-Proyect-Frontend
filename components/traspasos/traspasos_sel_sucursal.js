import { Dropdown, DropdownToggle,DropdownMenu,DropdownItem } from "reactstrap";
import {useContext,useState,useEffect} from 'react';
import SucursalContext from 'context/sucursal/sucursalContext';

const Traspasos_sel_sucursal = () => {
    const sucursalContext = useContext(SucursalContext);
    const {sucursales,sucursal_seleccionada,sucursalATransferir,obtenerSucursalesAction,sucursal_destino} = sucursalContext;

    const [dropdown,setDropdown]=useState(false);

    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown)
    };

    const sucursales_disponibles = sucursales.filter(sucursal => sucursal.id_sucursales !=  sucursal_seleccionada.id_sucursales)

    useEffect(() => {
        obtenerSucursalesAction()
        if(sucursal_destino==null){
            sucursalATransferir(sucursales_disponibles[0])
        }
    }, [sucursales_disponibles])
    

    return ( 
        <div>
            {sucursal_destino != null ? 
            <Dropdown
                direction="end"
                isOpen={dropdown}
                toggle={abrirCerrarDropdown}
            >
                <DropdownToggle caret>
                    {sucursal_destino.nombre}
                </DropdownToggle>
                <DropdownMenu
                    persistent={true}
                >

                { sucursales.length === 0 ? 
                    'No hay sucursales' : 
                (
                    sucursales_disponibles.map(sucursal => (
                            <DropdownItem  onClick={() =>sucursalATransferir(sucursal)}
                                key={sucursal.id}
                            >
                                {sucursal.nombre}
                            </DropdownItem>
                            // <h1>Hey</h1>
                        )
                        )
                ) }
                    
                </DropdownMenu>
            </Dropdown>
            :
            null
            }
        </div>
     );
}
 
export default Traspasos_sel_sucursal;