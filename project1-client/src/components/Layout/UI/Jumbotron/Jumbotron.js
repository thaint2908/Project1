import React from "react";
import {MDBJumbotron, MDBContainer, MDBMask} from "mdbreact";

import "./Jumbotron.css";

const Jumbotron = (props) => {
	const classes = ["text-center rgba-grey-light p-0 mb-0", props.classname];
	
	return (
		<>
			<MDBJumbotron className={classes.join(" ")}>
				<MDBMask className="rgba-grey-light d-flex align-items-center h-100">
					<MDBContainer className="text-center white-text py-5">
						<h1 className="mb-0 text-uppercase" style={{fontSize: "50px"}}>{props.title}</h1>
					</MDBContainer>
				</MDBMask>
			</MDBJumbotron>
		</>
	);
};

export default Jumbotron;