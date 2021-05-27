import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "three-dots/dist/three-dots.min.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import productsReducer from "./store/reducers/products";
import productReducer from "./store/reducers/product";
import categoriesReducer from "./store/reducers/categories";
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const rootReducer = combineReducers({
	productsReducer,
	productReducer,
	categoriesReducer,
	authReducer,
	cartReducer,
	orderReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ScrollToTop/>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
