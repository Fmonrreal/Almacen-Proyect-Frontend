import { Dropdown, DropdownToggle,DropdownMenu,DropdownItem } from "reactstrap";
import {react,useState,useContext,useEffect} from 'react';
import SucursalContext from 'context/sucursal/sucursalContext';
import ComprasContext from 'context/compras/comprasContext';
import StockContext from 'context/stock/stockContext';

const Seleccion_sucursal = () => {
    const sucursalContext = useContext(SucursalContext);
    const {sucursales,sucursal_seleccionada,sucursalActual,obtenerSucursalesAction,sucursalATransferir} = sucursalContext;
    const comprasContext = useContext(ComprasContext)
    const {LimpiarCarrito} = comprasContext;
    const stockContext = useContext(StockContext);
    const {LimpiarProductoActual} = stockContext;
    const [dropdown,setDropdown]=useState(false);

    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown)
    };

    useEffect(() => {
        obtenerSucursalesAction()
    }, [])
    

    // obtenerSucursalesAction();

    const ActivarSucursalActual=(sucursal)=>{
        sucursalActual(sucursal)
        LimpiarCarrito();
        LimpiarProductoActual();
        sucursalATransferir(null);
    };

    // let nm;
    
    return (  
        <div>
        {/* <div className="d-flex justify-content-center p-5"> */}
            <Dropdown
                direction="end"
                isOpen={dropdown}
                toggle={abrirCerrarDropdown}
            >
                <DropdownToggle caret>
                {sucursal_seleccionada.nombre}
                </DropdownToggle>
                <DropdownMenu
                    persistent={true}
                >

                { sucursales.length === 0 ? 
                    'No hay productos' : 
                (
                        sucursales.map(sucursal => (
                            <DropdownItem  onClick={() =>ActivarSucursalActual(sucursal)}>
                                {sucursal.nombre}
                            </DropdownItem>
                       
                        )
                        )
                ) }
      
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
 
export default Seleccion_sucursal;