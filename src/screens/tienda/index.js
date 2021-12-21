import React, {useState, useContext, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { collection, query, where, getDocs } from "firebase/firestore";
import { run as runHolder } from 'holderjs/holder';

import CompraContext from '../../context/compras/CompraContext';
import {StylesTitulo, StylesBtnAzul, StyledCaja, StyledFormControl, StyledCard, StyledCardTitle, StyledCardTexto, StyledContainerSpin} from '../../components/Styles';
import { db } from '../../firebase';

const TiendaPage = () => {
    const location = useLocation();
    const compraContext = useContext(CompraContext);
    const { cargandocar, addCart } = compraContext;

    const querytab = new URLSearchParams(location.search);
    const refCurrenTab = useRef(querytab.get('tab') ? querytab.get('tab') : 'todos')

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(null);
    const [itemsF, setItemsF] = useState(null);
	const [buscar, setBuscar] = useState()

    const myImage = document.getElementById('myImage');

    useEffect(() => {
        runHolder('image-class-name');
    });

    useEffect(() => {
        const querytab = new URLSearchParams(location.search);
        const curretTab = querytab.get('tab') ? querytab.get('tab') : 'todos';
        refCurrenTab.current = curretTab;
        consultarItems(curretTab);
    }, [location.search]);

    const consultarItems = async (curretTab) => {
        setLoading(true);
        try {
            const ProductosRef = collection(db, "Productos");
            const q = curretTab === 'todos' ? query(ProductosRef) :  query(ProductosRef, where("categoria", "==", curretTab));
            const querySnapshot = await getDocs(q);
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setItems(items.length > 0 ? items : null);
            setItemsF(items.length > 0 ? items : null);
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
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

    const agregarItem = (item) =>{
        addCart(item);
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <StyledCaja mtop="0px">
                        <StylesTitulo data-testid="titulo">Tienda de empleados Todo 1</StylesTitulo>
                        <Row className="justify-content-between">
                            <Col xs={8} sm={4} md={4} lg={4} xl={4}>
                                <StyledFormControl
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={buscar}
                                    onChange={buscador}
                                />
                            </Col>
                        </Row>
                        <Row className="justify-content-start mt-4 position-relative">
                            { loading && <StyledContainerSpin><Spinner animation="border" variant="info"/></StyledContainerSpin> }
                            {itemsF ? itemsF.map( (item) => (
                                <Col xs={12} sm={4} md={4} lg={3} xl={3} key={item.uid}>
                                    <StyledCard>
                                        <Card.Img variant="top" src="holder.js/100px170" />
                                        <Card.Body>
                                            <StyledCardTitle>{item.nombre}</StyledCardTitle>
                                            <StyledCardTexto miheight="16px" maheight="16px" mbottom="10px">Categoria: <strong>{item.categoria}</strong></StyledCardTexto>
                                            <StyledCardTexto>{item.descripcion}</StyledCardTexto>
                                            <StylesBtnAzul className="block" onClick={() => agregarItem(item)} disabled={cargandocar || item.cantidad <= 0}>
                                                {cargandocar ? <Spinner animation="border" variant="light"/> : item.cantidad <= 0 ? 'No hay stock' : 'Agregar al carrito'}
                                            </StylesBtnAzul>
                                        </Card.Body>
                                    </StyledCard>
                                </Col>
                            )) : <div>No hay productos en stock</div>
                            }
                        </Row>
                    </StyledCaja>
                </Col>
            </Row>
        </Container>
        
     );
}
 
export default TiendaPage;