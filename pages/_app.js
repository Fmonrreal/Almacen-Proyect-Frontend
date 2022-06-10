import { useState, useEffect,useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserContext } from "context/user";
import scopesValidation from "utils/scopeValidation";
import Loading from "components/Loading";
import ColorState from "context/color/colorState";
// import 'bootstrap/dist/css/bootstrap.css';
// import '../styles.css'

import "../styles/globals.css";
import '../public/DateTimePicker.css'
import '../public/Calendar.css'
import '../public/Clock.css'
// import "../styles/login.css";
import Layout from "components/layout/Sidebar";
import userContext from "context/user/userContext";
import userReducer from "context/user/userReducer";
import AlertaState from "context/alertas/alertaState";
import AuthState from "context/autenticacion/authState";
import ProductState from "context/productos/productState";
import ShoppingState from "context/shopping/shoppingState";
import StockState from "context/stock/StockState";
import tokenAuth from "config/token";
import ComprasState from "context/compras/comprasState";
import SucursalState from "context/sucursal/sucursalState";
import ClienteState from "context/cliente/clienteState";
import TraspasoState from "context/traspaso/traspasoState";
import ProvedorState from "context/provedor/provedorState";

//Revisar si tenemos un token
const token = typeof window !== 'undefined' ? localStorage.getItem('accesstoken') : null;
if(token){
  tokenAuth(token);
}

function MyApp({ Component, pageProps }) {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setUser({
  //       name: "Alex",
  //       permissions: [["test1", 1]],
  //     });
  //   }, 2000);
  // }, []);

  // const [queryClient] = useState(() => new QueryClient());

  // if (pageProps.permissions?.length > 0 && !user) {
  //   return <Loading />;
  // }

  // if (
  //   user &&
  //   pageProps.permissions &&
  //   !scopesValidation(pageProps.permissions)
  // ) {
  //   return <h1>Sorry, you don&apos;t have access</h1>;
  // }

  //State inicial
    const initialState = {
        email: '',
        password: ''
    }

    //Reducer
    const [state,dispatch] = useReducer(userReducer,initialState)

    // console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    // <Layout>
    // <UserContext.Provider value={user}> 
    <AlertaState>
      <AuthState>
      <userContext.Provider value={{ state, dispatch }}>
        {/* <QueryClientProvider client={queryClient}> */}
        <SucursalState>
          <ClienteState>
            <ProvedorState>
              <StockState>
                <ProductState>
                  <ComprasState>
                    <TraspasoState>
                      <ShoppingState>
                        <ColorState>
                          <Component {...pageProps} />
                        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                        </ColorState>
                      </ShoppingState>
                    </TraspasoState>
                  </ComprasState>
                </ProductState>
              </StockState>
            </ProvedorState>
          </ClienteState>
        </SucursalState>
          {/* </QueryClientProvider> */}
      </userContext.Provider>
      </AuthState>
    </AlertaState>
    // </UserContext.Provider>
    // </Layout>
  );
}

export default MyApp;
