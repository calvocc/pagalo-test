import React, {useEffect, useState, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import CryptoJS from 'crypto-js';

import {StylesBtnAzul, StylesBtnRojo, StylesTituloModal, StylesBodyModal, StylesFormGropu, StyledFormControl, StyledFormSelect, StyledCajaForm, StylesForm, StyledFormText} from './Styles';
import * as COLORES from '../constans/Colores';
import {CATEGORIAS} from '../constans/Utils';
import AuthContex from '../context/autenticacion/AuthContex';
import CompraContext from '../context/compras/CompraContext';

const StyledFooter = styled.footer`
    background-color: ${COLORES.AZULITO};
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const ModalPagarComponent = ({
    show,
    handleClose,
    title,
}) => {

    const authContex = useContext(AuthContex);
    const { usuario } = authContex;
    const compraContext = useContext(CompraContext);
    const {comprar, cargandocar} = compraContext;
    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if(usuario){
            reset({
                nombre: `${usuario.nombre} ${usuario.apellido}`,
                email: usuario.email,
                documento: ''
            })
        }
    }, [usuario])

    useEffect(() => {
        
    }, [cargandocar])

    const cifrar = (texto) => {
        const textoCifrado = CryptoJS.AES.encrypt(texto, 'calvocc').toString();
        return textoCifrado
    }
    const descifrar = (texto) => {
        const bytes = CryptoJS.AES.decrypt(texto, 'calvocc');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }

    const onSubmit = (data) => {
        const tarjetaUser = {
            tarjeta: cifrar(data.tarjeta),
            nombre: data.nombre,
            fecha: cifrar(data.fecha),
            codigo: cifrar(data.codigo),
            documento: cifrar(data.documento),
            email: data.email,
        }
        comprar(tarjetaUser);
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <StylesTituloModal>{title}</StylesTituloModal>
            </Modal.Header>

            <StylesBodyModal>
                <StylesForm>
                    <Row>

                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu >
                                <Form.Label>Numero de tarjeta</Form.Label>
                                <Controller
                                    name="tarjeta"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="number"
                                            placeholder="Numero de tarjeta" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.tarjeta && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu >
                                <Form.Label>Nombre y apellido</Form.Label>
                                <Controller
                                    name="nombre"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="text"
                                            placeholder="Nombre" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.nombre && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu >
                                <Form.Label>Fecha expiración</Form.Label>
                                <Controller
                                    name="fecha"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="text"
                                            placeholder="Fecha expiración" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.fecha && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu >
                                <Form.Label>Codigo de seguridad</Form.Label>
                                <Controller
                                    name="codigo"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="number"
                                            placeholder="Codigo de seguridad" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.codigo && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu >
                                <Form.Label>Documento</Form.Label>
                                <Controller
                                    name="documento"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="number"
                                            placeholder="Documento" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.documento && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu>
                                <Form.Label>Email</Form.Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ 
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="email"
                                            placeholder="Email" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.email && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                    </Row>
                </StylesForm>
            </StylesBodyModal>

            <Modal.Footer>
                <StylesBtnRojo variant="secondary" onClick={handleClose}>Cancelar</StylesBtnRojo>
                <StylesBtnAzul variant="primary" disabled={cargandocar} onClick={handleSubmit(onSubmit)}>
                    {cargandocar ? <Spinner animation="border" variant="light"/> : 'Pagar'}
                </StylesBtnAzul>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPagarComponent;

