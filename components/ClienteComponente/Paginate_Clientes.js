import React, { Fragment, useEffect,useContext,useState,useCallback,useMemo } from 'react';
// import Producto from './Stock';
import ReactPaginate from "react-paginate";
import StockContext from 'context/stock/stockContext';
import ClienteContext from 'context/cliente/clienteContext';
import Cliente_Row from './Cliente_Row';

const Paginate_Clientes = (props) => {
    const clienteContext = useContext(ClienteContext);
    // const {obtenerSucursalesAction,filtrarSucursalesAction,sucursales_Busq,error,loading,borrarSucursalAction} = clienteContext;
    const {obtenerclientesAction,borrarClienteAction,clientes,error,loading} = clienteContext;
    
    const [pageNumber, setPageNumber] = useState(0);
    const [nombre, guardarNombreBus] = useState('');
    // const [statusFilter, guardarStatusFilter] = useState(0);

    // const descarga = useCallback(
    //     () => {
    //         obtenerclientesAction({nombre}) 
    //     },
    //     [],
    //   )
      
    //   useEffect( ()=> {
    //       // obtenerclientesAction({nombre}) 
    //       descarga()
    //   }, [descarga]);

    const memoNombre = useMemo(()=>obtenerclientesAction({nombre}),[nombre])
    

    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;
  
    const displayUsers = clientes
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map(cliente => (
            <Cliente_Row
                    key={cliente.id_clientes}
                    cliente={cliente}
            />
            
        ));
    
  
    const pageCount = Math.ceil(clientes.length / usersPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
    return (
        <div className='row'>
           <div className='col-12'>
                <div className="container login-container">
                        <div className="row">
                            <div className="col-md-9 login-form-1">
                                    <div className="form-group">
                                        <button></button>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            placeholder="Coloca el nombre para busqueda"
                                            name="nombre"
                                            value={nombre}
                                            onChange={e => guardarNombreBus(e.target.value)}
                                        />
                                    </div>
                            </div>
                            <div className="col-md-3">
                            </div>
                        </div>
                    </div>

            

                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
                
                { loading ? <p className="text-center">Cargando....</p> : null }

                <div className="App">
                    <table className="table table-striped">
                                <thead className="bg-primary table-dark">
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Razon</th>
                                            <th scope="col">RFC</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {displayUsers}
                                </tbody>
                    </table>
                            <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                    />
                </div>
            </div>
            
       </div>
    );

}
 
export default Paginate_Clientes;