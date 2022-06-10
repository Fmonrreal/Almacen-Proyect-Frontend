import Seleccion_sucursal from "./SeleccionSurcursal";

const HeaderPos = () => {
return(
    <div className="row acomodoRow headerposition">
        <div className="col-6">
            <h5>Nombre de la tienda</h5>
            
            {/* <h6>Punto de venta | Sucursal Nombre chido</h6> */}
            <Seleccion_sucursal/>
        </div>
        <div className="col-6">
            <h5>Jesus Gerrado Saucedo Gonzalez</h5>
            <h6>Punto de venta | Sucursal Nombre chdo</h6>
        </div>          
    </div>
)
}

export default HeaderPos;
