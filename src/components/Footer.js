import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import * as COLORES from '../constans/Colores';

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

const StyledCopi = styled.p`
    color: ${COLORES.BLANCO};
    font-size: 14px;
    text-align: center;
    margin-bottom: 0px;
`;

const footerComponent = () => {
    return (
        <StyledFooter>
            <Container>
                <Row>
                    <Col>
                        <StyledCopi>©2021 Todo1 - Todos los derechos reservados</StyledCopi>
                    </Col>
                </Row>
            </Container>
        </StyledFooter>
    );
};

export default footerComponent;