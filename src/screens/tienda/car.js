import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FiTrash2 } from 'react-icons/fi';
import { collection, doc, setDoc, onSnapshot, query, updateDoc, orderBy } from "firebase/firestore";

import AuthContex from '../../context/autenticacion/AuthContex';
import CompraContext from '../../context/compras/CompraContext';
import {StylesTitulo, StylesBtnAzul, StyledCaja, StyledCartTitle, StyledCartTexto, StyledCajaTabla, StylesBtnAction, StyleProhibido} from '../../components/Styles';
import { db } from '../../firebase';

import ModalPagarComponent from '../../components/ModalPagar';

const CarPage = () => {
    const authContex = useContext(AuthContex);
    const comprarContex = useContext(CompraContext);
    const { usuario, cargando } = authContex;
    const { cart, cargandocar, carlenght, eliminarCart, comprar } = comprarContex;
    let valTotal = 0;

    const [modalShow, setModalShow] = useState(false);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <StyledCaja mtop="0px">
                        <StylesTitulo>Carrito de compras</StylesTitulo>
                        <StyledCajaTabla>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th width={30}></th>
                                        <th>Producto</th>
                                        <th className='text-center' width={30}>Disponibilidad</th>
                                        <th className='text-center' width={100}>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { cart ? cart.map( (item, index) => {
                                        valTotal = valTotal +Number(item.valor);
                                        return(
                                            <tr key={item.uid}>
                                                <td>
                                                    <ButtonGroup aria-label="Basic example">
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={
                                                                <Tooltip>
                                                                    Sacar del carrito
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <StylesBtnAction variant="secondary" onClick={ () => eliminarCart(item, index)}><FiTrash2 /></StylesBtnAction>
                                                        </OverlayTrigger>
                                                    </ButtonGroup>
                                                    
                                                </td>
                                                <td>
                                                    <StyledCartTitle>{item.nombre}</StyledCartTitle>
                                                    <StyledCartTexto>{item.categoria}</StyledCartTexto>
                                                </td>
                                                <td className='text-center align-middle'>{item.cantidad}</td>
                                                <td className='text-end align-middle'>{new Intl.NumberFormat("es-CO").format(item.valor)}</td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan={7}>No hay datos disponibles</td></tr>}
                                    
                                </tbody>
                            </Table>
                        </StyledCajaTabla>
                        <Row className="justify-content-end">
                            <Col xs={4} sm={8} md={8} lg={8} xl={8} className="d-flex justify-content-end align-content-end">
                                <div>
                                    <h3>Total a pagar:<span className='ps-4'>{new Intl.NumberFormat("es-CO").format(valTotal)}</span></h3>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-end mt-4">
                            <Col xs={4} sm={8} md={8} lg={8} xl={8} className="d-flex justify-content-end align-content-end">
                                <StylesBtnAzul variant="primary" onClick={ ()=> setModalShow(true)}>
                                    {cargando ? <Spinner animation="border" variant="light"/> : 'Pagar'}
                                </StylesBtnAzul>
                            </Col>
                        </Row>
                    </StyledCaja>
                </Col>
            </Row>

            <ModalPagarComponent 
                show={modalShow} 
                handleClose={ () => {setModalShow(false)}}
                title="Pagar compra"
            />

        </Container>
        
     );
}
 
export default CarPage;