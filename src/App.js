import React, { Fragment } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import LoginPage from "./screens/autenticacion";
import RegistroPage from "./screens/autenticacion/registro";
import TiendaPage from "./screens/tienda";
import InventarioPage from "./screens/inventario";
import CarPage from './screens/tienda/car';

import * as ROUTES from "./constans/Rutas";

import AuthState from "./context/autenticacion/AuthState";
import CompraState from "./context/compras/CompraState";
import RutaPrivada from "./components/RutaPrivada";
import HeaderComponent from "./components/Header";
import FooterComponen from "./components/Footer";

function App() {

    return (
		<Fragment>
			<Router>
				<AuthState>
					<CompraState>
						<HeaderComponent />
						<Routes>
							<Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
							<Route exact path={ROUTES.REGISTRO} element={<RegistroPage />} />
							<Route exact path='/' element={<RutaPrivada/>}>
								<Route exact path={ROUTES.INVENTARIO} element={<InventarioPage/>}/>
								<Route exact path={ROUTES.HOME} element={<TiendaPage/>}/>
								<Route exact path={ROUTES.CARITO} element={<CarPage />} />
							</Route>
						</Routes>
					</CompraState>
					<FooterComponen />
				</AuthState>
			</Router>
			<ToastContainer />
		</Fragment>
	);
}

export default App;
