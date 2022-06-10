import React,{useState} from 'react';
import Layout from "components/mainLayout/Layout";
import BodySucursales from 'components/sucursales/BodySucursales';


const Sucursales = () => {

    return(
        <div>
            <Layout>
                <BodySucursales/>
            </Layout>
        </div>
    )
}
 
export default Sucursales;