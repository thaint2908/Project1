import React, {Component, lazy, Suspense} from 'react';
import {Route, Switch} from "react-router";
import {MDBContainer} from "mdbreact";
import _ from "lodash";

import withLoadCategories from "./hoc/withLoadCategories/withLoadCategories";
import {nonAccentVietnamese} from "./utils/utilities";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Layout/UI/Footer/Footer";
import NavBar from "./components/Navigation/NavBar/NavBar";
import Jumbotron from "./components/Layout/UI/Jumbotron/Jumbotron";
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import AddProduct from './pages/AddProduct/AddProduct';
import RoleRoute from './routes/RoleRoute';
import Cart from './pages/Cart/Cart';
import PrivateRoute from './routes/PrivateRoute';

const Home = lazy(() => {
	return import("./pages/Home/Home");
});

const Products = lazy(() => {
	return import("./pages/Products/Products");
});

const SearchPage = lazy(() => {
	return import("./pages/SearchPage/SearchPage");
});

const Product = lazy(() => {
	return import("./pages/SingleProduct/Product");
});

const Category = lazy(() => {
	return import("./pages/SingleCategory/Category/Category");
});

class App extends Component {
	async componentDidMount() {
		if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/sign-up') {
			await this.props.onGetAllCategories();
		}
	}
	
	render() {
		let categories = [];
		if (this.props.allCategories) {
			categories = this.props.allCategories.map(c => {
				return _.kebabCase(_.lowerCase(nonAccentVietnamese(c)));
			});
		}
		
		const fallbackContent = (
			<>
				<NavBar isFixed="top"/>
				<Jumbotron
					title={
						<MDBContainer className="text-center">
							<div className="dot-windmill d-inline-block"/>
						</MDBContainer>}
					classname="jumbotron-img"
				/>
			</>
		);
		
		return (
			<Suspense fallback={fallbackContent}>
				<Switch>
					<Route path="/" exact component={Home}/>
					<Route path="/login" exact component={Login}/>
					<Route path="/sign-up" exact component={Signup}/>
					<Route path="/products" exact component={Products}/>
					<RoleRoute path="/add-product" exact component={AddProduct} role='admin'/>
					<Route path="/search" exact component={SearchPage}/>
					<Route path="/contact" exact component={Contact}/>
					<PrivateRoute path="/cart" exact component={Cart}/>
					<Route path="/products/:product_id" exact component={Product}/>
					<Route path={`/:category(${categories.join("|")})`} exact component={Category}/>
					<Route render={categories.length === 0 ? null : NotFound}/>
				</Switch>
				{categories.length > 0 ?
					<Footer/>
					: null
				}
			</Suspense>
		);
	}
}

export default withLoadCategories(App);
