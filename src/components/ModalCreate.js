import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useForm, Controller } from "react-hook-form";

import {StylesBtnAzul, StylesBtnRojo, StylesTituloModal, StylesBodyModal, StylesFormGropu, StyledFormControl, StyledFormSelect, StyledCajaForm, StylesForm, StyledFormText} from './Styles';
import * as COLORES from '../constans/Colores';
import {CATEGORIAS} from '../constans/Utils';

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

const ModalCreateComponent = ({
    show,
    handleClose,
    title,
    onSubmit,
    cargando,
    action,
    itemSelect
}) => {

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if(itemSelect){
            reset({
                nombre: itemSelect.nombre,
                categoria: itemSelect.categoria,
                cantidad: itemSelect.cantidad,
                valor: itemSelect.valor,
                descripcion: itemSelect.descripcion,
            })
        }
        if(!itemSelect){
            reset({
                nombre: '',
                categoria: '',
                cantidad: '',
                valor: '',
                descripcion: '',
            })
        }
    }, [action])

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
                                <Form.Label>Nombre</Form.Label>
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
                            <StylesFormGropu>
                                <Form.Label>Categoria</Form.Label>
                                <Controller
                                    name="categoria"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormSelect
                                            aria-label="Categoria"
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        >
                                            <option>Seleccione una categoria</option>
                                            {CATEGORIAS.map( ({value, label}) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </StyledFormSelect>
                                    )}
                                />
                                {errors.categoria && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu>
                                <Form.Label>Cantidad en Stock</Form.Label>
                                <Controller
                                    name="cantidad"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="number"
                                            placeholder="Cantidad" 
                                            min="0"
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.cantidad && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                            <StylesFormGropu>
                                <Form.Label>Valor</Form.Label>
                                <Controller
                                    name="valor"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="number"
                                            placeholder="Valor" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.valor && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <StylesFormGropu>
                                <Form.Label>Descripcion</Form.Label>
                                <Controller
                                    name="descripcion"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="text"
                                            placeholder="Descripcion" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.descripcion && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>
                        </Col>
                    </Row>
                </StylesForm>
            </StylesBodyModal>

            <Modal.Footer>
                <StylesBtnRojo variant="secondary" onClick={handleClose}>Cancelar</StylesBtnRojo>
                <StylesBtnAzul variant="primary" disabled={cargando} onClick={handleSubmit(onSubmit)}>
                    {cargando ? <Spinner animation="border" variant="light"/> : `${action === 1 ? 'Crear' : 'Editar'} producto`}
                </StylesBtnAzul>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateComponent;

