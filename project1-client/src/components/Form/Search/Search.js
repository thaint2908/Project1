import React from "react";
import {MDBCol, MDBBtn, MDBFormInline} from "mdbreact";
import {connect} from "react-redux";

import "./Search.css";

const Search = (props) => {
	const data = [];
	if (props.suggestProducts) {
		props.suggestProducts.forEach(p => {
			data.push(p.name);
		});
	}
	
	return (
		<MDBCol md="8">
			<MDBFormInline
				autoComplete="off"
				className="md-form"
				onSubmit={props.handleSubmit}
			>
				<input
					id="input"
					value={props.value}
					className="mr-sm-2 w-60"
					type="text"
					placeholder="Tìm kiếm sản phẩm"
					aria-label="Search"
					onChange={props.handleChange}
				/>
				
				<MDBBtn
					gradient="aqua"
					rounded
					size="sm"
					type="submit"
					className="mr-auto"
				>
					Tìm kiếm
				</MDBBtn>
			</MDBFormInline>
		</MDBCol>
	);
};

const mapStateToProps = state => {
	return {
		suggestProducts: state.productsReducer.suggestProducts
	}
};

export default connect(mapStateToProps)(Search);