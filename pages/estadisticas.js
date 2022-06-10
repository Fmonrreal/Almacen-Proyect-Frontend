import React,{useState} from 'react';
import Layout from "components/mainLayout/Layout";
import BodyEstadisticas from 'components/EstadisticasComponents/BodyEstadisticas';


const Estadisticas = () => {

    return(
        <div>
            <Layout>
                <BodyEstadisticas/>
            </Layout>
        </div>
    )
}
 
export default Estadisticas;