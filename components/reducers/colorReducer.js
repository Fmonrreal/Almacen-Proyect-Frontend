import {TYPES} from "../actions/colorActions";

export const  colorInitialState = { color: "white"};

export function colorReducer(state,action){
    switch(action.type){
        case TYPES.COLOR_CHANGE:
            return{color: "black"}
        default:
            return state;
    }
}