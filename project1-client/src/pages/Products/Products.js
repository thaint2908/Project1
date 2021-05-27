import React, {Component} from "react";
import {MDBContainer, MDBRow} from "mdbreact";
import Pagination from "react-js-pagination";
import {Helmet} from "react-helmet";

import Search from "../../components/Form/Search/Search";
import Select from "../../components/Form/Select/Select";
import "../../components/Card/Card.css";
import Card from "../../components/Card/Card";
import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import NavBar from "../../components/Navigation/NavBar/NavBar";
import Spinner from "../../components/Spinner/Spinner";
import "./Products.css";
import withLoadProds from "../../hoc/withLoadProds/withLoadProds";
import FakeSelect from "../../components/Form/Select/FakeSelect/FakeSelect";

class Products extends Component {
	render() {
		let productList = <Spinner/>;
		
		if (!this.props.loading && this.props.products) {
			productList = (
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
								isProductsPage={true}
							/>
						);
					})}
				</MDBRow>
			);
		}
		
		return (
			<>
				<Helmet>
					<title>Tổng hợp sản phẩm</title>
				</Helmet>
				<header>
					<NavBar isFixed="top"/>
				</header>
				<Jumbotron title="Tổng hợp sản phẩm" classname="jumbotron-img"/>
				<main>
					<MDBContainer>
						<section>
							<MDBRow>
								<Search
									value={this.props.input}
									handleChange={this.props.onHandleInputSearchChange}
									handleSubmit={this.props.onHandleSubmitSearch}
								/>
								{this.props.loading || !this.props.products ? <FakeSelect/> :
									<Select handleSelectChange={this.props.onHandleSelectChange}/>
								}
							</MDBRow>
						</section>
						<section ref={this.props.pageRef}>
							<h3 className="text-center mt-4 mb-5">Danh sách sản phẩm</h3>
							<MDBContainer>
								{productList}
							</MDBContainer>
						</section>
						{this.props.loading || !this.props.products
							?
							null
							:
							<section>
								<MDBRow center>
									<Pagination
										activePage={this.props.current}
										itemsCountPerPage={8}
										totalItemsCount={this.props.totalDocs ? this.props.totalDocs : 0}
										pageRangeDisplayed={3}
										onChange={this.props.onHandlePageChange}
										itemClass="page-item"
										linkClass="page-link"
										nextPageText="Tiếp"
										prevPageText="Trước"
										hideDisabled
									/>
								</MDBRow>
							</section>
						}
					</MDBContainer>
				</main>
			</>
		);
	}
}

export default withLoadProds(Products);
