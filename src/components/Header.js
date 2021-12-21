import React, { useContext, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';

import AuthContex from '../context/autenticacion/AuthContex';
import CompraContext from '../context/compras/CompraContext';
import * as ROUTES from '../constans/Rutas';
import * as COLORES from '../constans/Colores';
import { StylesBtnNavBar } from './Styles';

import Logo from '../asses/img/logo.png';
import Logo2x from '../asses/img/logo@2x.png';
import Logo3x from '../asses/img/logo@3x.png';
import { CARGANDO } from '../types';

const StyledNavbar = styled(Navbar)`
    background-color: ${COLORES.AZULITO};
`;

const StylesNavLink = styled(NavLink)`
    color: ${COLORES.BLANCO};
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 40px;
    &:hover{
        color: ${COLORES.NEGRO}
    }
    &.active {
        color: ${COLORES.NEGRO};
        &.current{
            color: ${COLORES.NEGRO};
        }
        &.normal{
            color: ${COLORES.BLANCO};
        }
    }
    &.conbadge{
        position: relative;
        font-size: 18px;
    }
`
const StyledBadge = styled(Badge)`
    background-color: ${COLORES.ROJO} !important;
    position: absolute;
    top: 3px;
    right: 0px;
    font-size: 9px;
    line-height: 9px;
    height: 15px;
    width: 15px;
    padding: 3px 0px;
`;

const HeaderComponent = () => {
    const authContex = useContext(AuthContex);
    const compraContext = useContext(CompraContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContex;
    const { carlenght, actializarCart } = compraContext;
    const location = useLocation();

    const querytab = new URLSearchParams(location.search);

    const [currentTab, setcurrentTab] = useState(querytab.get('tab') ? querytab.get('tab') : 'todos')


    useEffect(() => {
        actializarCart();
        usuarioAutenticado();
    }, [])

    useEffect(() => {
        const querytab = new URLSearchParams(location.search);
        const curretTab = querytab.get('tab') ? querytab.get('tab') : 'todos';
        setcurrentTab(curretTab);
    }, [location.search])

    return (
        <StyledNavbar expand="md" >
            <Container>
                <NavLink  
                    to={ROUTES.HOME} 
                    className="navbar-brand">
                        <img 
                            data-testid="logo"
                            src={Logo}
                            srcSet={`${Logo2x} 2x, ${Logo3x} 3x`}
                            alt="Logo Todo 1"
                        />
                </NavLink>
                <Navbar.Collapse className='d-flex justify-content-start' id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <StylesNavLink  
                            to={`${ROUTES.HOME}?tab=Camisetas`} 
                            className={currentTab === 'Camisetas' ? "current" : "normal"}
                        >
                            Camisetas
                        </StylesNavLink> 
                        <StylesNavLink  
                            to={`${ROUTES.HOME}?tab=Vasos`}
                            className={currentTab === 'Vasos' ? "current" : "normal"}
                        >
                            Vasos
                        </StylesNavLink>
                        <StylesNavLink  
                            to={`${ROUTES.HOME}?tab=Comics`}
                            className={currentTab === 'Comics' ? "current" : "normal"}
                        >
                            Comics
                        </StylesNavLink>
                        <StylesNavLink  
                            to={`${ROUTES.HOME}?tab=Juguetes`}
                            className={currentTab === 'Juguetes' ? "current" : "normal"}
                        >
                            Juguetes
                        </StylesNavLink>
                        <StylesNavLink  
                            to={`${ROUTES.HOME}?tab=Accesorios`}
                            className={currentTab === 'Accesorios' ? "current" : "normal"}
                        >
                            Accesorios
                        </StylesNavLink>
                        <StylesNavLink  
                            to={ROUTES.HOME}
                            className={currentTab === 'todos' ? "current" : "normal"}
                        >
                            Todos
                        </StylesNavLink>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='d-flex justify-content-end align-content-center' id="basic-navbar-nav">
                    <Nav className="mr-auto d-flex align-content-center">
                        {usuario?.rol === '1' &&
                            <StylesNavLink  
                                to={ROUTES.INVENTARIO} >
                                Inventario
                            </StylesNavLink> 
                        }

                        {usuario ?
                            <>
                                <StylesNavLink
                                className="conbadge"
                                to={ROUTES.CARITO} >
                                    <FiShoppingCart />
                                    {carlenght > 0 && <StyledBadge pill >{carlenght}</StyledBadge> }
                                </StylesNavLink>
                                <StylesBtnNavBar
                                    onClick={()=> cerrarSesion()} >
                                    <FiLogOut />
                                </StylesBtnNavBar>
                            </>
                            :
                            <>
                                <StylesNavLink to={ROUTES.LOGIN}>
                                    Login
                                </StylesNavLink>
                                <StylesNavLink
                                    to={ROUTES.REGISTRO} >
                                    Registro
                                </StylesNavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                    
                
            </Container>
        </StyledNavbar>
        
    );
};

export default HeaderComponent;