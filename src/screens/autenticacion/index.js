import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthContex from '../../context/autenticacion/AuthContex';
import * as ROUTES from "../../constans/Rutas";
import {StylesTitulo, StylesBtnAzul, StylesFormGropu, StyledFormControl, StyledCajaForm, StylesForm, StyledFormText} from '../../components/Styles';
import LoginForm from '../../components/LoginForm';

const LoginPage = (props) => {
    const authContext = useContext(AuthContex);
    const { autenticado, iniciarSesion } = authContext;
    let navigate = useNavigate();

    useEffect(() => {
        if(autenticado){
            navigate(ROUTES.HOME);
        }
    },[autenticado, props.history]);

    const onSubmit = ({ email, password }) => {
        iniciarSesion({ email, password });
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                    <StyledCajaForm mtop='100px'>
                        <StylesTitulo data-testid="titulo-login">Ingreso de usuarios</StylesTitulo>
                        <LoginForm onSubmit={onSubmit}/>
                    </StyledCajaForm>
                </Col>
            </Row>
        </Container>
        
     );
}
 
export default LoginPage;