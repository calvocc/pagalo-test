import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useForm, Controller } from "react-hook-form";

import AuthContex from '../../context/autenticacion/AuthContex';
import {StylesTitulo, StylesBtnAzul, StylesFormGropu, StyledFormControl, StyledFormSelect, StyledCajaForm, StylesForm, StyledFormText} from '../../components/Styles';

const RegistroPage = (props) => {
    const authContext = useContext(AuthContex);
    const { cargando, autenticado, registrarUsuario } = authContext;
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        registrarUsuario(data);
        reset({
            nombre: '',
            apellido: '',
            rol: '',
            email: '',
            password: '',
        })
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                    
                    <StyledCajaForm>
                        <StylesTitulo>Registro de usuario</StylesTitulo>
                        <StylesForm onSubmit={handleSubmit(onSubmit)}>
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

                            <StylesFormGropu>
                                <Form.Label>Apellido</Form.Label>
                                <Controller
                                    name="apellido"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="text"
                                            placeholder="Apellido" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.apellido && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>

                            <StylesFormGropu>
                                <Form.Label>Rol</Form.Label>
                                <Controller
                                    name="rol"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormSelect
                                            aria-label="Valor de la recarga"
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                        >
                                            <option>Seleccione rol</option>
                                            <option value="1">Administrador</option>
                                            <option value="2">Usuario</option>
                                        </StyledFormSelect>
                                    )}
                                />
                                {errors.rol && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>

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

                            <StylesFormGropu>
                                <Form.Label>Contraseña</Form.Label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledFormControl
                                            type="password"
                                            placeholder="Contraseña" 
                                            onBlur={onBlur}
                                            onChange={value => onChange(value)}
                                            value={value}
                                            autoComplete="off"
                                        />
                                    )}
                                />
                                {errors.password && <StyledFormText id="passwordHelpBlock" className="error">El campo es obligatorio</StyledFormText>}
                            </StylesFormGropu>

                            <StylesBtnAzul variant="primary" type="submit" disabled={cargando}>
                                {cargando ? <Spinner animation="border" variant="light"/> : 'Enviar'}
                            </StylesBtnAzul>
                        </StylesForm>
                    </StyledCajaForm>
                </Col>
            </Row>
        </Container>
        
     );
}
 
export default RegistroPage;