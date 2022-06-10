import React,{useState} from 'react';
import Layout from "components/mainLayout/Layout";
import BodyClientes from 'components/clientesComponentes/BodyClientes';


const Clientes = () => {

    return(
        <div>
            <Layout>
                <BodyClientes/>
            </Layout>
        </div>
    )
}
 
export default Clientes;