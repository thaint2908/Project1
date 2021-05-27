import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

import NavBar from "../../components/Navigation/NavBar/NavBar";
import error404 from "../../assets/images/404.png";


const NotFound = () => {
	return (
		<>
			<Helmet>
				<title>Không tìm thấy trang yêu cầu</title>
			</Helmet>
			<header>
				<NavBar isFixed="top"/>
			</header>
			<main>
				<MDBContainer className="d-flex justify-content-center mx-auto h-100 align-items-center">
					<div className="mt-5 pt-5">
						<MDBRow>
							<MDBCol md="12" className="text-center float-md-none mx-auto">
								<img
									src={error404}
									alt="404 error"
									className="img-fluid"
								/>
							</MDBCol>
						</MDBRow>
						
						<MDBRow className="mt-5">
							<MDBCol className="md-12 text-center mb-5">
								<h2
									className="h2-responsive mb-4"
									style={{fontWeight: "500"}}
								>
									Oops! Chúng tôi không thể tìm thấy trang này.
								</h2>
								<p style={{fontSize: "1.3rem"}}>Hãy chắc chắn rằng liên kết bạn nhấn vào là chính xác.</p>
								<p style={{fontSize: "1.25rem"}}>Trở về trang chủ hoặc liên hệ với chúng tôi để được giúp đỡ.</p>
								<div className="mt-4">
									<Link to="/"><span style={{marginRight: "10px"}}>Trang chủ</span></Link>
									<Link to="/contact">Hỗ trợ</Link>
								</div>
							</MDBCol>
						</MDBRow>
					</div>
				</MDBContainer>
			</main>
		</>
	);
};

export default NotFound;