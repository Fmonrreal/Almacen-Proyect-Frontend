import React,{useState} from 'react';
import moment from 'moment';
import ImgFromB64 from 'helpers/ImgFromB64';
import clienteAxios2 from 'config/axios2';
import Swal from 'sweetalert2';


const now = moment().format('YYYY');

const EstadPorYear = () => {
    const [ Year, setYear ] = useState(now);
    const [imagedata, setimagedata] = useState(null)

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


        // const respuesta = await clienteAxios2.post('/graphicsByYear', {
        //     Year,
        // });
        // console.log(respuesta)
        // setimagedata(respuesta.data)

        let url = 'http://127.0.0.1:5000/graphs/prueba';

        fetch(url)
        .then(res => res.json())
        .then((data) => {
        console.log(data);
        })
        .catch(err => { throw err });
          
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

    return ( 
        <div>
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
            
        </div>
     );
}
 
export default EstadPorYear;