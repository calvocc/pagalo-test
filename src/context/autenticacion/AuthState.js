import React, { useEffect, useReducer } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

import authReducers from "./AuthReducers";
import authContext from "./AuthContex";
import * as ROUTES from '../../constans/Rutas';
import { auth, db } from "../../firebase";

import { CARGANDO, ACTUALIZAR_USUARIO, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, REGISTRO_EXITOSO, REGISTRO_ERROR, CERRAR_SESION } from "../../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        cargando: false 
    }

    let navigate = useNavigate();
    const [ state, dispatch ] = useReducer(authReducers, initialState);

    const registrarUsuario = async datos => {
        dispatch({
            type: CARGANDO
        })
        const usuario = {
            nombre: datos.nombre, 
            apellido: datos.apellido, 
            email: datos.email, 
            rol: datos.rol
        }
        let user;
        try {
            const respuesta = await createUserWithEmailAndPassword(auth, datos.email, datos.password);
            if(respuesta.user){
                const resUser = await setDoc(doc(db, 'Usuarios', respuesta.user.uid), {
                    ...usuario,
                    id: respuesta.user.uid,
                });
                user = resUser;
            }
            toast.success("Usuario registrado exitosamente...")
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.user.uid
            })

            // obtener usuarios
            usuarioAutenticado();
        } catch (error) {
            toast.error("Algo salio mal intentealo nuevamente...")
            dispatch({
                type: REGISTRO_ERROR
            })
        }
    }

    const actualizarUsuario = async data => {
        dispatch({
            type: ACTUALIZAR_USUARIO,
            payload: data
        })
    }

    const usuarioAutenticado = () => {
        onAuthStateChanged(auth, async(userAuth) => {
            if(userAuth){
                const docRef = doc(db, "Usuarios", userAuth.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    const user = docSnap.data();
                    dispatch({
                        type: OBTENER_USUARIO,
                        payload: user
                    })
                    return
                }
                dispatch({
                    type: LOGIN_ERROR,
                })
                return
            }
        });
    }

    const iniciarSesion = async ({ email, password }) => {
        dispatch({
            type: CARGANDO
        })
        try {
            const login = await signInWithEmailAndPassword(auth, email, password )
            dispatch({
                type: LOGIN_EXITOSO,
                payload: 'FIREBASE'
            })

            // obtener usuarios
            usuarioAutenticado();
        } catch (error) {
            toast.success(error.message);
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CARGANDO
        })
        signOut(auth).then( ()=>{
            dispatch({
                type: CERRAR_SESION
            })
        }).catch( (error) => {
            toast.success(error.message);
            dispatch({
                type: LOGIN_ERROR
            })
        });
    }

    return(
        <authContext.Provider value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            cargando: state.cargando,
            registrarUsuario,
            usuarioAutenticado,
            iniciarSesion,
            cerrarSesion,
            actualizarUsuario,
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;