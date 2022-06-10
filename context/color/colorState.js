import React,{useReducer} from 'react';
import colorContext from './colorContext';
import colorReducer from './colorReducer';

import { COLOR_SELECCIONADO } from 'types';

const ColorState = ({children}) => {

    //State inicial
    const initialState = {
        color: 'red'
    }

    //Reducer
    const [state,dispatch] = useReducer(colorReducer,initialState)

    //Elegir color
    const elegircolor =  nombre => {
        dispatch({
            type: COLOR_SELECCIONADO,
            payload: nombre
        })
    }

    return (
        <colorContext.Provider
            value={{
                color: state.color,
                elegircolor
            }}
        >
         {children}
        </colorContext.Provider>
    )
}

export default ColorState;