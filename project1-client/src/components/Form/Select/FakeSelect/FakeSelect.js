import React, { Component } from "react";
import {MDBCol, MDBSelect} from "mdbreact";

import "../Select.css";

class FakeSelect extends Component {
	state = {
		options: [
			{
				text: "Giá cao",
				value: "1"
			},
			{
				text: "Giá thấp",
				value: "2"
			},
			{
				text: "Đánh giá sao cao",
				value: "3"
			},
			{
				text: "Đánh giá sao thấp",
				value: "4"
			}
		]
	};
	
	render() {
		return (
			<MDBCol md="4">
				<MDBSelect
					className="d-flex w-60-100"
					options={this.state.options}
					selected="Lựa chọn"
					label="Sắp xếp theo"
				/>
			</MDBCol>
		);
	}
}

export default FakeSelect;