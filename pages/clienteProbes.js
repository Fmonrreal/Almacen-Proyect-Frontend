import AgregarCliente from "components/ClienteComponente/AgregarCliente";
import BuscarCliente from "components/ClienteComponente/buscarCliente";
import Layout from "components/mainLayout/Layout";

const ClienteProbes = () => {
    return ( 
        <div>
            <Layout>
                {/* <AgregarCliente/> */}
                <BuscarCliente/>
            </Layout>
        </div>
     );
}
 
export default ClienteProbes;