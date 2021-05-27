import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import queryString from "query-string";
import _ from "lodash";

import {nonAccentVietnamese, updateObject} from "../../utils/utilities";
import * as actions from "../../store/actions";

const withLoadProds = (WrappedComponent) => {
	class LoadPost extends Component {
		pageRef = React.createRef();
		state = {
			config: {},
			queryTitle: "",
			query: {},
			current: 1,
			value: null,
			star: null,
			minPrice: "",
			maxPrice: "",
			submitted: false,
			input: "",
			categoryTitle: "",
			category: null,
			displayMaxVal: "",
			displayMinVal: "",
			inputSidebar: ""
		}
		
		async componentDidMount() {
			await this.loadProducts();
		}
		
		async componentDidUpdate(prevProps, prevState, snapshot) {
			if (prevProps.location !== this.props.location) {
				await this.loadProducts();
			}
		}
		
		updateState = (queryField, stateField, paramsField, updateValueState, updateValue) => {
			this.setState(prevState => {
				return {
					query: updateObject(prevState.query, {
						[queryField]: updateValueState
					}),
					[stateField]: updateValueState,
					config: updateObject(prevState.config, {
						params: updateObject(prevState.config.params, {
							[paramsField]: updateValue
						})
					})
				};
			});
		};
		
		updatePriceState = (updateMinPrice, updateMaxPrice, updateValue) => {
			this.setState(prevState => {
				return {
					query: updateObject(prevState.query, {
						price: updateValue
					}),
					minPrice: updateMinPrice,
					maxPrice: updateMaxPrice,
					config: updateObject(prevState.config, {
						params: updateObject(prevState.config.params, {
							price: updateValue
						})
					})
				};
			});
		};
		
		handleQuery = async () => {
			const {q, sortBy, page, price, starUp, category} = await queryString.parse(this.props.location.search);
			if (q) {
				await this.updateState("q", "queryTitle", "search", q.toString(), q.toString());
			} else {
				if (this.props.location.pathname === "/search") {
					this.props.history.push("/");
				}
			}
			
			if (price) {
				const [minPrice, maxPrice] = price.split(",");
				if (!isNaN(minPrice) && !isNaN(maxPrice)) {
					await this.updatePriceState(minPrice, maxPrice, `${minPrice},${maxPrice}`);
				}
			} else {
				await this.updatePriceState("", "", null);
			}
			
			if (starUp && starUp >= 3 && starUp <= 5 && !isNaN(starUp)) {
				await this.updateState("starUp", "star", "star", starUp, starUp);
			} else {
				await this.updateState("starUp", "star", "star", null, null);
			}
			
			if (page && !isNaN(page)) {
				await this.updateState("page", "current", "page", Number(page), Number(page));
			} else {
				await this.updateState("page", "current", "page", 1, null);
			}
			
			if (sortBy) {
				await this.updateState("sortBy", "value", "sort", sortBy, sortBy);
			} else {
				await this.updateState("sortBy", "value", "sort", null, null);
			}
			
			if (this.props.location.pathname === "/search") {
				if (category) {
					await this.updateState("category", "category", "category", _.lowerCase(nonAccentVietnamese(category)), _.lowerCase(nonAccentVietnamese(category)));
				} else {
					await this.updateState("category", "category", "category", null, null);
				}
			}
		}
		
		loadProducts = async () => {
			const categoryPath = this.props.match.params.category;
			if (categoryPath) {
				await this.setState({
					query: {},
					config: {}
				});
				await this.setState(prevState => {
					return {
						categoryTitle: categoryPath,
						config: updateObject(prevState.config, {
							params: updateObject(prevState.config.params, {
								category: _.lowerCase(categoryPath)
							})
						})
					};
				});
				await this.handleQuery();
			}
			
			await this.handleQuery();
			
			await this.props.onGetProducts(this.state.config);
		};
		
		pushHistory = (prevState, field, updateValue) => {
			let prevQuery = {};
			for (let key in prevState.query) {
				if (prevState.query.hasOwnProperty(key)) {
					if (prevState.query[key]) {
						prevQuery = updateObject(prevQuery, {
							[key]: prevState.query[key]
						})
					}
				}
			}
			this.props.history.push({
				pathname: this.props.location.pathname,
				query: updateObject(prevState.query, {
					[field]: updateValue
				}),
				search: queryString.stringify(
					updateObject(prevQuery, {
						[field]: updateValue
					}), {sort: false}
				)
			});
		}
		
		pushMultiHistory = (prevState, field1, field2, updateValue1, updateValue2) => {
			let prevQuery = {};
			for (let key in prevState.query) {
				if (prevState.query.hasOwnProperty(key)) {
					if (prevState.query[key]) {
						prevQuery = updateObject(prevQuery, {
							[key]: prevState.query[key]
						})
					}
				}
			}
			this.props.history.push({
				pathname: this.props.location.pathname,
				query: updateObject(prevState.query, {
					[field1]: updateValue1,
					[field2]: updateValue2
				}),
				search: queryString.stringify(
					updateObject(prevQuery, {
						[field1]: updateValue1,
						[field2]: updateValue2
					}), {sort: false}
				)
			});
		}
		
		onHandlePageChange = (pageNumber) => {
			this.setState(prevState => {
				if (prevState.current === pageNumber) {
					return;
				}
				
				this.pushHistory(prevState, "page", pageNumber);
				
				window.scrollTo(0, this.pageRef.current.offsetTop);
				
				return {
					current: pageNumber
				};
			});
		};
		
		onHandleSelectChange = (value) => {
			this.setState(prevState => {
				let option;
				switch (value[0]) {
					case "1":
						option = "price|desc";
						break;
					case "2":
						option = "price|ascd";
						break;
					case "3":
						option = "rating_average|desc";
						break;
					case "4":
						option = "rating_average|ascd";
						break;
					default:
						if (prevState.value) {
							option = prevState.value;
						}
				}
				
				this.pushHistory(prevState, "sortBy", option);
				
				return {
					value: option
				};
			});
		};
		
		onHandleClickStar = (star) => {
			this.setState(prevState => {
				this.pushMultiHistory(prevState, "starUp", "page", star, 1);
				
				window.scrollTo(0, this.pageRef.current.offsetTop)
				return {
					star: star
				};
			});
		};
		
		onHandleChangeMin = (value) => {
			this.setState({
				minPrice: value,
				displayMinVal: value
			});
		};
		
		onHandleChangeMax = (value) => {
			this.setState({
				maxPrice: value,
				displayMaxVal: value
			});
		};
		
		onHandleSubmitPrice = (e) => {
			e.preventDefault();
			if (this.state.minPrice && this.state.maxPrice) {
				this.setState(prevState => {
					this.pushMultiHistory(prevState, "price", "page", `${this.state.minPrice},${this.state.maxPrice}`, 1);
					
					window.scrollTo(0, this.pageRef.current.offsetTop);
					
					return {
						displayMaxVal: "",
						displayMinVal: "",
						submitted: true
					};
				});
			}
		};
		
		onHandleChangeCategory = (category) => {
			this.setState(prevState => {
				this.pushMultiHistory(prevState, "category", "page", category, 1);
				
				return {
					category: category
				};
			});
		};
		
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
		
		onHandleInputSearchSidebar = (e) => {
			e.preventDefault();
			this.setState({
				inputSidebar: e.target.value
			});
		}
		
		onHandleSubmitSearchSidebar = (e) => {
			e.preventDefault();
			if (this.state.inputSidebar !== "") {
				this.props.history.push({
					pathname: `/${this.state.categoryTitle}`,
					query: {
						q: this.state.inputSidebar
					},
					search: queryString.stringify({
						q: this.state.inputSidebar
					})
				});
			}
		}
		
		render() {
			return (
				<WrappedComponent
					onHandleSelectChange={this.onHandleSelectChange}
					pageRef={this.pageRef}
					queryTitle={this.state.queryTitle}
					onHandleClickStar={this.onHandleClickStar}
					onHandleChangeMin={this.onHandleChangeMin}
					onHandleChangeMax={this.onHandleChangeMax}
					onHandleSubmitPrice={this.onHandleSubmitPrice}
					current={this.state.current}
					onHandlePageChange={this.onHandlePageChange}
					onHandleChangeCategory={this.onHandleChangeCategory}
					input={this.state.input}
					onHandleInputSearchChange={this.onHandleInputSearchChange}
					onHandleSubmitSearch={this.onHandleSubmitSearch}
					history={this.props.history}
					categoryTitle={this.state.categoryTitle}
					category={this.state.category}
					star={this.state.star}
					displayMinPrice={this.state.displayMinVal}
					displayMaxPrice={this.state.displayMaxVal}
					query={this.state.query}
					config={this.state.config}
					onHandleInputSearchSidebar={this.onHandleInputSearchSidebar}
					onHandleSubmitSearchSidebar={this.onHandleSubmitSearchSidebar}
					{...this.props}
				/>
			);
		}
	}
	
	const mapStateToProps = state => {
		return {
			products: state.productsReducer.products,
			error: state.productsReducer.error,
			loading: state.productsReducer.loading,
			totalDocs: state.productsReducer.totalDocs,
			categories: state.productsReducer.categories,
			allCategories: state.categoriesReducer.allCategories
		};
	};
	
	const mapDispatchToProps = dispatch => {
		return {
			onGetProducts: (config) => dispatch(actions.getProducts(config))
		};
	};
	
	return withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadPost));
};

export default withLoadProds;