import React, {useState, useContext, useEffect} from 'react';
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
import { FiEdit2, FiSun, FiMoon } from 'react-icons/fi';
import { collection, doc, setDoc, onSnapshot, query, updateDoc, orderBy } from "firebase/firestore";

import AuthContex from '../../context/autenticacion/AuthContex';
import {StylesTitulo, StylesBtnAzul, StyledCaja, StyledFormControl, StyledCajaTabla, StylesBtnAction, StyleProhibido} from '../../components/Styles';
import { db } from '../../firebase';

import ModalCreateComponent from '../../components/ModalCreate';

const InventarioPage = () => {
    const authContex = useContext(AuthContex);
    const { usuario, cargando } = authContex;

    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(null);
    const [itemsF, setItemsF] = useState(null);
    const [action, setAction] = useState(null);
    const [itemSelect, setItemSelect] = useState(null);
    const [errorUser, setErrorUser] = useState(null);
	const [buscar, setBuscar] = useState()

    useEffect(() => {
        if(usuario?.rol !== '1'){
            setErrorUser(true);
            return
        }

        const q = query(collection(db, "Productos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setItems(items);
            setItemsF(items);
         });
        return () => {
            unsub()
        }
    }, [usuario])

    useEffect(() => {
    }, []);

    const onSubmit = async(data) => {
        setLoading(true);
        try {
            if(action === 1){
                const newCityRef = doc(collection(db, "Productos"));
                await setDoc(newCityRef, {...data, cantidad: parseInt(data.cantidad), estado: true, uid: newCityRef.id});
            } 
            if(action === 2){
                const updateRef = doc(db, "Productos", itemSelect.uid);
                await updateDoc(updateRef, {
                    ...data,
                    estado: itemSelect.estado
                });
            }
            toast.success(`Producto ${action === 1 ? 'registrado' : 'actualizado'} exitosamente...`);
        } catch (error) {
            toast.error("Algo salio mal intentealo nuevamente...");
        } finally {
            setLoading(false);
            setModalShow(false);
            setItemSelect(null);
        }
    }

    const editarItem = (item) => {
        setAction(2);
        setItemSelect(item);
        setModalShow(true);
    }

    const buscador = (e) => {
		const busqueda = e.target.value;
		const array = items;
		const filtrados = array.filter( (item) =>
			(item.nombre && item.nombre.toString().toLowerCase().search(busqueda.toLowerCase()) > -1) || 
			(item.categoria && item.categoria.toLowerCase().search(busqueda.toLowerCase()) > -1) ||
			(item.cantidad && item.cantidad.toString().toLowerCase().search(busqueda.toLowerCase()) > -1) || 
			(item.descripcion && item.descripcion.toString().search(busqueda.toLowerCase()) > -1) || 
			(item.valor && item.valor.toString().toLowerCase().search(busqueda.toLowerCase()) > -1)
		)
		setItemsF(filtrados)
	}

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    { errorUser ?
                        <StyleProhibido>
                            <h2>Lo siento.<br/>No tienes permisos para acceder a esta pantalla</h2>
                        </StyleProhibido>
                        :
                        <StyledCaja mtop="0px">
                            <StylesTitulo>Inventario</StylesTitulo>

                            <Row className="justify-content-between">
                                <Col xs={8} sm={4} md={4} lg={4} xl={4}>
                                    <StyledFormControl
                                        type="text"
                                        placeholder="Buscar..."
                                        value={buscar}
                                        onChange={buscador}
                                    />
                                </Col>
                                <Col xs={4} sm={8} md={8} lg={8} xl={8} className="d-flex justify-content-end align-content-end">
                                    <StylesBtnAzul variant="primary" onClick={ ()=> {setModalShow(true); setAction(1)}}>
                                        {cargando ? <Spinner animation="border" variant="light"/> : 'Crear Producto'}
                                    </StylesBtnAzul>
                                </Col>
                            </Row>
                            <StyledCajaTabla>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th>Categoria</th>
                                            <th>Cantidad</th>
                                            <th>Valor</th>
                                            <th>Descripción</th>
                                            <th width={30}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsF ? itemsF.map( (item, index) => {
                                            return(
                                                <tr key={item.uid}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.categoria}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{new Intl.NumberFormat("es-CO").format(item.valor)}</td>
                                                    <td>{item.descripcion}</td>
                                                    <td>
                                                        <ButtonGroup aria-label="Basic example">
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={
                                                                    <Tooltip>
                                                                        Editar producto
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <StylesBtnAction variant="secondary" onClick={ () => editarItem(item)}><FiEdit2 /></StylesBtnAction>
                                                            </OverlayTrigger>
                                                            
                                                        </ButtonGroup>
                                                        
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr><td colSpan={7}>No hay datos disponibles</td></tr>}
                                        
                                    </tbody>
                                </Table>
                            </StyledCajaTabla>
                        </StyledCaja>
                    }
                </Col>
            </Row>

            <ModalCreateComponent 
                show={modalShow} 
                handleClose={ () => {setModalShow(false); setItemSelect(null); setAction(null);}}
                title={action === 1 ? "Crear producto" : "Editar producto"}
                onSubmit={onSubmit}
                cargando={loading}
                action={action}
                itemSelect={itemSelect}
            />
        </Container>
        
     );
}
 
export default InventarioPage;