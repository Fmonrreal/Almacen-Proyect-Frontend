import React,{useState} from 'react';
import moment from 'moment';
import ImgFromB64 from 'helpers/ImgFromB64';
import clienteAxios2 from 'config/axios2';
import Swal from 'sweetalert2';
import Modal from 'helpers/modal'
import ArticulosCarrito from "components/CarritoComponentes/ArticulosCarrito"
import BtnAgregarUno_Venta from'./BtnAgregarUno_Venta'

const now = moment().format('YYYY');

const EstadPorProd = () => {
    const [ Year, setYear ] = useState(now);
    const [ id_articulos_provedores, setArt ] = useState(1);
    const [imagedata, setimagedata] = useState(null)
    const [modal, abrirModal] = useState(false);

    const handleModalOnChange = () => {
        abrirModal(true)
      }
  
      const handleModalOnChange2 = () => {
        abrirModal(false)
      }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        

        try {
            // const respuesta = await fetch('http://127.0.0.1:5000/graphs/graphicsByYear',{
            //         method: 'POST', // or 'PUT'
            //         body: JSON.stringify({Year}), // data can be `string` or {object}!
            //         headers:{
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //         }
            //         })
        //   .then((res) => 
        //             console.log(res)
        //   )
        //   .catch(error => console.error('Error:', error))
        //   .then((data) => {
        //     setimagedata(data)
        //   })
            // const data = await respuesta.json();
            // return data;
            // console.log(data)
            // setimagedata(respuesta.data)


        const respuesta = await clienteAxios2.post('/graphicsByYearProd', {
            Year,
            id_articulos_provedores
        });
        console.log(respuesta)
        setimagedata(respuesta.data)

        // let url = 'http://127.0.0.1:5000/graphs/prueba';

        // fetch(url)
        // .then(res => res.json())
        // .then((data) => {
        // console.log(data);
        // })
        // .catch(err => { throw err });
          
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, en graficar en esas fechas'
            })
        }
    }

    const handleStartDateChange = ( e ) => {
        setYear(e.target.value)
    }
    
    const handleIdArt = ( e ) => {
        setArt(e.target.value)
    }

    return ( 
        <div>
            <div className='row'>
                <div className='col-6'>
                    <div className="form-group">
                        <label>Id Arituculo provedor</label>
                            <input
                                type="number"
                                className="form-control2"
                                placeholder="Coloca el id del articulo"
                                name="id"
                                value={id_articulos_provedores}
                                min="1"
                                onChange={handleIdArt}
                            />
                    </div>
                </div>
                <div className='col-6'>
                    <button className="butonFeatures" onClick={handleModalOnChange}>Buscar Id producto</button>
                </div>
            </div>
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >   
                <div className="form-group">
                <label>Año</label>
                    <input
                        type="number"
                        className="form-control2"
                        placeholder="Max"
                        name="maximos"
                        value={Year}
                        min="2022"
                        onChange={handleStartDateChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>

            {
              imagedata !== null 
              ?
                <div>
                    <h1>imagen</h1>
                    <ImgFromB64
                        imagedata={imagedata}
                    />
                </div>
              :
              null
            }
            { modal == true ? 
                <Modal
                handleModalOnChange2={handleModalOnChange2}
                >
                    <ArticulosCarrito>
                        <BtnAgregarUno_Venta
                            setArt={setArt}
                        />
                    </ArticulosCarrito>
                </Modal>
            : null}
        </div>
     );
}
 
export default EstadPorProd;