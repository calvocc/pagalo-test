import React, {useContext} from 'react';
import { useForm, Controller } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import AuthContex from '../context/autenticacion/AuthContex';
import {StylesBtnAzul, StylesFormGropu, StyledFormControl, StyledCajaForm, StylesForm, StyledFormText} from './Styles';


const LoginForm = ({onSubmit}) => {
    const authContext = useContext(AuthContex);
    const { cargando } = authContext;
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return ( 
        <StylesForm onSubmit={handleSubmit(onSubmit)} >
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
                            data-testid="campo-email"
                        />
                    )}
                />
                {errors.email && <StyledFormText id="passwordHelpBlock" className="error" data-testid="error-email">El campo es obligatorio</StyledFormText>}
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
                            data-testid="campo-pass"
                        />
                    )}
                />
                {errors.password && <StyledFormText id="passwordHelpBlock" className="error" data-testid="error-pass">El campo es obligatorio</StyledFormText>}
            </StylesFormGropu>

            <StylesBtnAzul variant="primary" type="submit" disabled={cargando ? true : false} data-testid="btn-submit">
                {cargando ? <Spinner animation="border" variant="light"/> : 'Iniciar sesión'}
            </StylesBtnAzul>
        </StylesForm>
    );
}
 
export default LoginForm;