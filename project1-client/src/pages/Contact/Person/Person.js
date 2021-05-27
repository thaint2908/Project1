import React from "react";
import {MDBAvatar, MDBCol, MDBIcon} from "mdbreact";

const Person = (props) => {
	return (
		<MDBCol md={props.md} className="mb-5">
			<MDBAvatar
				tag="img"
				src={props.img}
				className="rounded-circle z-depth-1-half img-fluid"
				alt=""
			/>
			<h4 className="font-weight-bold dark-grey-text my-4">
				{props.name}
			</h4>
			<h6 className="text-uppercase grey-text mb-3">
				{props.role}
			</h6>
			{props.hasFacebook ?
				<a href={props.facebook}
				   className="p-2 fa-lg fb-ic" target="_blank" rel="noopener noreferrer">
					<MDBIcon size="lg" fab icon="facebook-f"/>
				</a>
				: null
			}
			{props.hasTwitter ?
				<a href={props.twitter} className="p-2 fa-lg tw-ic"
				   target="_blank" rel="noopener noreferrer">
					<MDBIcon size="lg" fab icon="twitter"/>
				</a>
				: null
			}
			{props.hasGithub ?
				<a href={props.github} className="p-2 fa-lg git-ic"
				   target="_blank" rel="noopener noreferrer">
					<MDBIcon size="lg" fab icon="github"/>
				</a>
				: null
			}
		</MDBCol>
	);
};

export default Person;