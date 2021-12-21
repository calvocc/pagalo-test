import React, { useEffect, useReducer } from "react";
import { toast } from 'react-toastify';
import { writeBatch, doc, updateDoc, increment } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import compraReducers from "./CompraReducers";
import compraContext from "./CompraContext";
import * as ROUTES from '../../constans/Rutas';

import {AGREGADO_EXITO, AGREGADO_ERROR, ACTUALIZAR_EXITO, ACTUALIZAR_ERROR, ELIMINADO_EXITO, ELIMINADO_ERROR, COMPRAR_EXITO, COMPRAR_ERROR, CARGANDO} from "../../types";
import { db } from "../../firebase";

const CompraState = props => {
    const initialState = {
        cargando: false,
        cart: localStorage.getItem('caruser') ? JSON.parse(localStorage.getItem('caruser')) : [],
        carlenght: 0,
    }

    let navigate = useNavigate();
    const [state, dispatch] = useReducer(compraReducers, initialState);

    const addCart = async item => {
        dispatch({
            type: CARGANDO
        });
        try {
            if(item.cantidad <= 0){
                dispatch({
                    type: AGREGADO_ERROR
                })
            }
            const array = state.cart;
            const unico = await array.filter( (elem) => elem.uid === item.uid);
            if(unico.length === 0){
                array.push(item);
                await localStorage.setItem('caruser', JSON.stringify(array));
                toast.success("El producto se ha agregado al carrito...")
            } else {
                toast.error("El producto ya esta en el carrito...")
            }
            dispatch({
                type: AGREGADO_EXITO,
                payload: array
            })
        } catch (error) {
            toast.error("Algo salio mal intentealo nuevamente...")
            dispatch({
                type: AGREGADO_ERROR
            })
        }
    }

    const actializarCart = () =>{
        try {
            const cartuser = localStorage.getItem('caruser') || [];
            dispatch({
                type: ACTUALIZAR_EXITO,
                payload: JSON.parse(cartuser)
            })
        } catch (error) {
            dispatch({
                type: ACTUALIZAR_ERROR
            })
        }
    }

    const eliminarCart = async (item, index) => {
        try {
            const array = state.cart;
            array.splice(index, 1);
            await localStorage.setItem('caruser', JSON.stringify(array)); 
            
            dispatch({
                type: ELIMINADO_EXITO,
                payload: array,
            });
            toast.success("El producto se ha eliminado del carrito...")
        } catch (error) {
            dispatch({
                type: ELIMINADO_ERROR
            });
            toast.error("Algo salio mal intentealo nuevamente...")
        }
    }

    const comprar = async (datosuser) => {
        dispatch({
            type: CARGANDO
        });
        try {
            const batch = writeBatch(db);

            await Promise.all(state.cart.map(async (file) => {
                const itemRef = doc(db, "Productos", file.uid);
                batch.update(itemRef, {cantidad: increment(-1)})
            }));

            await batch.commit();
            await localStorage.removeItem('caruser');
            dispatch({
                type: COMPRAR_EXITO,
                payload: []
            })
            toast.success("Compra exitosa...")
            navigate(ROUTES.HOME);
        } catch (error) {  
            dispatch({
                type: COMPRAR_ERROR,
            }) 
            toast.error("Algo salio mal intentealo nuevamente...")
        }
    }

    return(
        <compraContext.Provider value={{
            cart: state.cart,
            carlenght: state.carlenght,
            cargandocar: state.cargando,
            addCart,
            actializarCart,
            eliminarCart,
            comprar
        }}>
            {props.children}
        </compraContext.Provider>
    )
}

export default CompraState;