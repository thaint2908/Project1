import React from "react";
import {MDBCardBody, MDBCol, MDBContainer, MDBRow,} from "mdbreact";
import {Helmet} from "react-helmet";

import NavBar from "../../components/Navigation/NavBar/NavBar";
import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import Person from "./Person/Person";

import ThaiImg from "../../assets/images/Thai.png";


const Contact = () => {
	return (
		<>
			<Helmet>
				<title>Đội ngũ hỗ trợ</title>
			</Helmet>
			<header>
				<NavBar isFixed="top"/>
			</header>
			<Jumbotron title="Hỗ trợ" classname="jumbotron-img"/>
			<main>
				<MDBContainer className="px-1 text-center">
					<MDBCardBody>
						<h2 className="h1-responsive font-weight-bold mt-5">
							Nguyễn Thành Thái
						</h2>
						<h5 className="grey-text w-responsive mx-auto mb-5">
							BTL Project I
						</h5>
						<MDBRow>
							<Person/>
							<Person
								md="4"
								name="Thái"
								img={ThaiImg}
								role="Admin"
								hasFacebook={true}
								hasTwitter={false}
								hasGithub={false}
								facebook="https://www.facebook.com/profile.php?id=100010107604217"
							/>
							<Person/>
						</MDBRow>
					</MDBCardBody>
				</MDBContainer>
			</main>
		</>
	);
};

export default Contact;