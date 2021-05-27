import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import _ from "lodash";
import {Helmet} from "react-helmet";

import Search from "../../../components/Form/Search/Search";
import Select from "../../../components/Form/Select/Select";
import Jumbotron from "../../../components/Layout/UI/Jumbotron/Jumbotron";
import Item from "../../../components/Item/Item";
import Sidebar from "../../../components/Sidebar/Sidebar";
import NavBar from "../../../components/Navigation/NavBar/NavBar";
import withLoadProds from "../../../hoc/withLoadProds/withLoadProds";
import Spinner from "../../../components/Spinner/Spinner";
import Pagination from "react-js-pagination";
import FakeSelect from "../../../components/Form/Select/FakeSelect/FakeSelect";
import {nonAccentVietnamese} from "../../../utils/utilities";

class Category extends Component {
	
	render() {
		let productList = <Spinner/>;
		let categoryTitle = null;
		if (!this.props.loading && this.props.products) {
			this.props.allCategories.forEach(c => {
				if (_.lowerCase(nonAccentVietnamese(c)) === _.lowerCase(this.props.categoryTitle)) {
					categoryTitle = c;
				}
			});
			
			productList = (
				this.props.products.map(product => {
					return (
						<Item
							key={product._id}
							id={product._id}
							imageUrl={product.image_url}
							name={product.name}
							price={product.price}
							list_price={product.list_price}
							rating={product.rating_average}
							review_count={product.review_count}
						/>
					);
				})
			);
		}
		
		return (
			<>
				<Helmet>
					<title>{categoryTitle ? categoryTitle : null}</title>
				</Helmet>
				<header>
					<NavBar isFixed="top"/>
				</header>
				<Jumbotron
					title={categoryTitle
						? categoryTitle
						:
						<MDBContainer
							className="text-center">
							<div className="dot-windmill d-inline-block"/>
						</MDBContainer>
					}
					classname="jumbotron-img"
				/>
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
							<h3 className="text-center mt-4 mb-5">
								{categoryTitle}
							</h3>
							<MDBRow className="mt-5">
								<Sidebar
									search={false}
									handleClickStar={this.props.onHandleClickStar}
									count={this.props.totalDocs}
									minVal={this.props.onHandleChangeMin}
									maxVal={this.props.onHandleChangeMax}
									displayMinVal={this.props.displayMinPrice}
									displayMaxVal={this.props.displayMaxPrice}
									handleSubmit={this.props.onHandleSubmitPrice}
									handleInputSearchSidebar={this.props.onHandleInputSearchSidebar}
									handleSubmitSearchSidebar={this.props.onHandleSubmitSearchSidebar}
									category={categoryTitle}
									star={this.props.star}
								/>
								<MDBCol md="8" className="mb-4">
									<section>
										<MDBRow>
											{productList}
										</MDBRow>
									</section>
								</MDBCol>
							</MDBRow>
						</section>
						<section>
							{this.props.loading || !this.props.products ? null :
								<MDBRow end>
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
							}
						</section>
					</MDBContainer>
				</main>
			</>
		);
	}
}

export default withLoadProds(Category);