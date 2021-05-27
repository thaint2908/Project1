import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../store/actions/index";
import {withRouter} from "react-router-dom";

const withLoadCategories = (WrappedComponent) => {
	class LoadCategories extends Component {
		
		render() {
			return (
				<WrappedComponent
					{...this.props}
				/>
			);
		}
	}
	
	const mapStateToProps = state => {
		return {
			allCategories: state.categoriesReducer.allCategories
		};
	};
	
	const mapDispatchToProps = dispatch => {
		return {
			onGetAllCategories: () => dispatch(actions.getAllCategories()),
			onLogout: () => dispatch(actions.logoutAuth())
		};
	};	
	
	return withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadCategories));
};

export default withLoadCategories;
