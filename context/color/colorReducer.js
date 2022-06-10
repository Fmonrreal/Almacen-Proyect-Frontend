import { COLOR_SELECCIONADO } from 'types';

export default (state,action) => {
    switch(action.type){
        case COLOR_SELECCIONADO:
            return{
                ...state,
                color: action.payload,
            }
        default: 
            return state;
    }
}