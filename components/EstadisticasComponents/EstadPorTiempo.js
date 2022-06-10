import moment from 'moment';
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import {useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import clienteAxios2 from 'config/axios2';
import ImgFromB64 from 'helpers/ImgFromB64'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

// export const EstadPorTiempo = () => {
const EstadPorTiempo =  () => {

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [imagedata, setimagedata] = useState(null)

    useEffect(() => {
        
      }, [])

    const momentStart = moment( dateStart );
    const momentEnd = moment( dateEnd );

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        
        console.log(dateStart)
        console.log(dateEnd)

        let m = `${dateStart}`
        let n = `${dateEnd}`

        // const momentStart = dateStart;
        // const momentEnd = dateEnd;

       

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        console.log(momentStart)
        console.log(momentEnd)
        // if ( title.trim().length < 2 ) {
        //     return setTitleValid(false);
        // }

        // if ( activeEvent ) {
        //     dispatch( eventStartUpdate( formValues ) )
        // } else {
        //     dispatch( eventStartAddNew(formValues) );
        // }


        // setTitleValid(true);
        // closeModal();

        // fetch('http://127.0.0.1:5000/graphs/graphics',{dateStart,dateEnd})
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setimagedata(data)
        //     // setLoading(false)
        //   })

        // fetch('http://127.0.0.1:5000/graphs/graphics', {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify({dateStart,dateEnd}), // data can be `string` or {object}!
        //     // headers:{
        //     //     'Content-Type': 'application/json'
        //     // }
        //     }).then(res => res.json())
        //     .catch(error => console.error('Error:', error))
        //     .then(response => console.log('Success:', response));

            try {
                const respuesta = await clienteAxios2.post('/graphics', {
                    dateStart:m,
                    dateEnd:n
                });
                // const respuesta = await clienteAxios2.get('/prueba');
                console.log(respuesta)
                setimagedata(respuesta.data)
                // dispatch({
                //     type: CLIENTE_SELECCIONADO_EXITO,
                //     payload: respuesta.data
                // })
            } catch (error) {
                console.log(error);
                // dispatch({
                //     type: CLIENTE_SELECCIONADO_ERROR, 
                //     payload: true
                // })
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    // text: respuesta.message
                    text: 'Hubo un error, en graficar en esas fechas'
                })
            }
        
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
    }

    return ( 
        <div>
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group ">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={dateStart}
                        className="form-control alturaform"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control alturaform"
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
                // <img src="http://127.0.0.1:5000/graphs/graphics"/>
                <div>
                    <h1>imagen</h1>
                    <ImgFromB64
                        imagedata={imagedata}
                    />
                    {/* `${imagedata}` */}
                    {/* <img src={`${imagedata}:image/png;base64`}/> */}
                </div>
              :
              null
            }
            {/* <img src={`http://127.0.0.1:5000/graphs/graphics`}/> */}
        </div>
     );
}
 
export default EstadPorTiempo;