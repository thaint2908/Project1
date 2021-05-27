import React from "react";
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";

const Spinner = () => {
	return (
		<MDBContainer className="text-center my-5 py-5">
			<MDBRow>
				<MDBCol>
					<MDBSpinner big crazy className="mb-5"/>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default Spinner;