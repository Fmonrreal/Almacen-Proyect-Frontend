import React,{useReducer} from 'react';
import userContext from './userContext';
import userReducer from './userReducer';

import { COLOR_SELECCIONADO } from 'types';

const UserState = ({children}) => {

    //State inicial
    const initialState = {
        email: '',
        password: ''
    }

    //Reducer
    const [state,dispatch] = useReducer(userReducer,initialState)

    //Elegir color
    // const elegircolor =  nombre => {
    //     dispatch({
    //         type: COLOR_SELECCIONADO,
    //         payload: nombre
    //     })
    // }

    return (
        <userContext.Provider
        >
         {children}
        </userContext.Provider>
    )
}

export default UserState;