import {Sidebar} from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import Head from 'next/head';
import {Global,css} from '@emotion/react';
import colorContext from 'context/color/colorContext';
import React,{useContext} from 'react';
import Wave from "../layout/Wave";





const Layout = (props) => {

    const ColorContext = useContext(colorContext);
    const {elegircolor,color} = ColorContext;

    return ( 
        <div className="totalheight">
            <Global
                styles={css`
                    li{
                        list-style: none;
                    }

                    aside{
                        list-style:none;
                    }
                `}
            />

            <Head>
                {/* <html lang="es"/> */}
                <title>Almacen frontend</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
                <link href="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></link>
            </Head>
            <Sidebar/>  
           
            <section >
                {/* <Topbar/> */}
                <main>
                    {props.children}
                </main>
            </section>
            <section>
                {/* <svg width="1439" height="351" viewBox="0 0 1439 351" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.9" d="M-1 150.5L39 170.55C79 190.6 159 230.7 239 257.461C319 283.894 399 297.806 479 250.75C559 203.694 639 97.3062 719 83.6395C799 70.3001 879 150.5 959 203.939C1039 257.706 1119 283.894 1199 257.461C1279 230.7 1359 150.5 1439 143.79C1519 137.406 1599 203.694 1679 237.411C1759 270.8 1839 270.8 1919 230.7C1999 190.6 2079 110.4 2159 103.689C2239 97.3062 2319 163.594 2399 190.6C2479 217.606 2559 203.694 2639 177.261C2719 150.5 2799 110.4 2879 70.3001C2959 30.2001 3039 -9.89989 3119 3.4395C3199 17.1062 3279 83.394 3359 103.689C3439 123.494 3519 97.3062 3599 123.74C3679 150.5 3759 230.7 3839 230.7C3919 230.7 3999 150.5 4079 110.4C4159 70.3001 4239 70.3001 4319 56.9607C4399 43.294 4479 17.1062 4559 50.2501C4639 83.394 4719 177.506 4799 190.6C4879 203.694 4959 137.406 5039 130.45C5119 123.494 5199 177.506 5279 170.55C5359 163.594 5439 97.3062 5519 90.3501C5599 83.394 5679 137.406 5719 163.839L5759 190.6V351H5719C5679 351 5599 351 5519 351C5439 351 5359 351 5279 351C5199 351 5119 351 5039 351C4959 351 4879 351 4799 351C4719 351 4639 351 4559 351C4479 351 4399 351 4319 351C4239 351 4159 351 4079 351C3999 351 3919 351 3839 351C3759 351 3679 351 3599 351C3519 351 3439 351 3359 351C3279 351 3199 351 3119 351C3039 351 2959 351 2879 351C2799 351 2719 351 2639 351C2559 351 2479 351 2399 351C2319 351 2239 351 2159 351C2079 351 1999 351 1919 351C1839 351 1759 351 1679 351C1599 351 1519 351 1439 351C1359 351 1279 351 1199 351C1119 351 1039 351 959 351C879 351 799 351 719 351C639 351 559 351 479 351C399 351 319 351 239 351C159 351 79 351 39 351H-1V150.5Z" fill={color}/> */}
{/* <defs>
<linearGradient id="paint0_linear_25_2309" x1="-1" y1="351" x2="-1" y2="0.827148" gradientUnits="userSpaceOnUse">
<stop stop-color="#2E698A"/>
<stop offset="1" stop-color="#BBD5E3"/>
</linearGradient>
</defs> */}
{/* </svg> */}

                {/* <div className="curve"></div> */}
                 
            </section>
            <Wave/>
            
        </div>  
     );
}
 
export default Layout;