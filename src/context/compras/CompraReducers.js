import {AGREGADO_EXITO, AGREGADO_ERROR, ELIMINADO_EXITO, ELIMINADO_ERROR, COMPRAR_EXITO, COMPRAR_ERROR, ACTUALIZAR_EXITO, ACTUALIZAR_ERROR, CARGANDO} from "../../types";

export default (state, action) => {
    switch (action.type){
        case CARGANDO:
            return({
                ...state,
                cargando: true
            })
        case ACTUALIZAR_EXITO:
        case AGREGADO_EXITO:
        case ELIMINADO_EXITO:
            return({
                ...state,
                cargando: false,
                cart: action.payload,
                carlenght: action.payload.length
            })
        case ACTUALIZAR_ERROR:
        case AGREGADO_ERROR:
        case ELIMINADO_ERROR:
            return({
                ...state,
                cargando: false
            })
        case COMPRAR_EXITO:
            return({
                ...state,
                cargando: false,
                cart: action.payload,
                carlenght: action.payload.length
            })
        case COMPRAR_ERROR:
            return({
                ...state,
                cargando: false,
            })
        default:
            return state;
    }
}