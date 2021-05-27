import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Pagination from "react-js-pagination";
import {Helmet} from "react-helmet";

import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import Search from "../../components/Form/Search/Search";
import Select from "../../components/Form/Select/Select";
import Sidebar from "../../components/Sidebar/Sidebar";
import Item from "../../components/Item/Item";
import NavBar from "../../components/Navigation/NavBar/NavBar";
import Spinner from "../../components/Spinner/Spinner";
import withLoadProds from "../../hoc/withLoadProds/withLoadProds";
import FakeSelect from "../../components/Form/Select/FakeSelect/FakeSelect";

class SearchPage extends Component {
	render() {
		let productList = <Spinner/>;
		if (!this.props.loading && this.props.products) {
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
		
		let categoryTitle = null;
		
		for (let key in this.props.categories) {
			if (this.props.categories.hasOwnProperty(key)) {
				if (this.props.category) {
					categoryTitle = key;
					break;
				}
			}
		}
		
		return (
			<>
				<Helmet>
					<title>Kết quả tìm kiếm</title>
				</Helmet>
				<header>
					<NavBar isFixed="top"/>
				</header>
				<Jumbotron title="Kết quả tìm kiếm" classname="jumbotron-img"/>
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
								Kết quả tìm kiếm cho: "{this.props.queryTitle}"
								{this.props.category && categoryTitle
									? <span>, trong: {categoryTitle}</span>
									: null
								}
							</h3>
							<MDBRow className="mt-5">
								<Sidebar
									search={true}
									handleClickStar={this.props.onHandleClickStar}
									count={this.props.totalDocs}
									handleChangeCategory={this.props.onHandleChangeCategory}
									minVal={this.props.onHandleChangeMin}
									maxVal={this.props.onHandleChangeMax}
									displayMinVal={this.props.displayMinPrice}
									displayMaxVal={this.props.displayMaxPrice}
									handleSubmit={this.props.onHandleSubmitPrice}
									categories={this.props.categories}
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

export default withLoadProds(SearchPage);