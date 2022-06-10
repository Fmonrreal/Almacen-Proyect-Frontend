import { 
        AUTH_CHECKING,
        AUTH_CHECKING_FINISH,
        AUTH_START_LOGIN,
        AUTH_LOGIN,
        AUTH_START_REGISTER,
        AUTH_START_TOKEN_RENEW,
        AUTH_LOGOUT
    } from 'types';

export default (state,action) => {
    switch(action.type){
        // case COLOR_SELECCIONADO:
        //     return{
        //         ...state,
        //         color: action.payload,
        //     }
        default: 
            return state;
    }
}