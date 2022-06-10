import React,{useState} from 'react';
import Layout from "components/mainLayout/Layout";
import BodyProvedores from 'components/ProvedoresComponentes/BodyProvedores';


const Provedores = () => {

    return(
        <div>
            <Layout>
                <BodyProvedores/>
            </Layout>
        </div>
    )
}
 
export default Provedores;