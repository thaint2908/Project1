import React, {Component} from "react";
import {MDBBtn, MDBContainer, MDBRow} from "mdbreact";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import queryString from "query-string";

import NavBar from "../../components/Navigation/NavBar/NavBar";
import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import Search from "../../components/Form/Search/Search";
import * as actions from "../../store/actions/index";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";

class Home extends Component {
	state = {
		input: ""
	}
	
	async componentDidMount() {
		await this.props.onGetProducts({
			params: {
				star: 4.8
			}
		});
	}
	
	onHandleInputSearchChange = (e) => {
		e.preventDefault();
		this.setState({
			input: e.target.value
		});
	};
	
	onHandleSubmitSearch = (e) => {
		e.preventDefault();
		if (this.state.input !== "") {
			this.props.history.push({
				pathname: "/search",
				query: {
					q: this.state.input
				},
				search: queryString.stringify({
					q: this.state.input
				})
			});
		}
	}
	
	render() {
		let highRatingProds = <Spinner/>;
		if (!this.props.loading && this.props.products) {
			highRatingProds = (
				<MDBRow>
					{this.props.products.map(product => {
						return (
							<Card
								key={product._id}
								imageUrl={product.image_url}
								name={product.name}
								rating={product.rating_average}
								price={product.price}
								list_price={product.list_price}
								id={product._id}
								isProductsPage={false}
							/>
						);
					})}
				</MDBRow>
			);
		}
		
		return (
			<>
				<Helmet>
					<title>Trang chủ</title>
				</Helmet>
				<header>
					<NavBar isFixed="top"/>
				</header>
				<Jumbotron title="Trang chủ" classname="jumbotron-img"/>
				<main>
					<MDBContainer>
						<section>
							<MDBRow center>
								<Search
									value={this.state.input}
									handleChange={this.onHandleInputSearchChange}
									handleSubmit={this.onHandleSubmitSearch}
								/>
							</MDBRow>
						</section>
						<section>
							<h3 className="text-center mt-4 mb-5">Sản phẩm nổi bật</h3>
							<MDBContainer>
								{highRatingProds}
							</MDBContainer>
						</section>
						{!this.props.loading && this.props.products ?
							<section className="mt-3 mb-3">
								<MDBContainer className="text-center">
									<Link to="/products">
										<MDBBtn color="primary">
											Xem thêm các sản phẩm khác
										</MDBBtn>
									</Link>
								</MDBContainer>
							</section>
							: null
						}
					</MDBContainer>
				</main>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.productsReducer.products,
		loading: state.productsReducer.loading,
		error: state.productsReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProducts: (config) => dispatch(actions.getProducts(config))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
