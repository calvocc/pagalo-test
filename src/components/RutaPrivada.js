import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContex from '../context/autenticacion/AuthContex';

import * as ROUTES from "../constans/Rutas";

const RutaPrivada = ({ component: Component, ...props }) => {
    const authContex = useContext(AuthContex);
    const { autenticado, cargando, usuarioAutenticado } = authContex;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return !autenticado && !cargando ? <Navigate to={ROUTES.LOGIN} /> : <Outlet />
    
}
 
export default RutaPrivada;