import React from "react";
import {MDBDropdownItem} from "mdbreact";
import {Link} from "react-router-dom";
import _ from "lodash";

import {nonAccentVietnamese} from "../../utils/utilities";

const DropdownItem = (props) => {
	return (
		<MDBDropdownItem className="mb-1">
			<Link to={`/${_.kebabCase(nonAccentVietnamese(props.name))}`}>
				{props.name}
			</Link>
		</MDBDropdownItem>
	);
};

export default DropdownItem;
