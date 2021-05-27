import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput} from "mdbreact";
import {Rating} from "@material-ui/lab";
import _ from "lodash";

import "./Sidebar.css";
import {nonAccentVietnamese} from "../../utils/utilities";

const Sidebar = (props) => {
	const categories = [];
	
	for (let key in props.categories) {
		if (props.categories.hasOwnProperty(key)) {
			categories.push(
				<li key={key} className="list-unstyled">
					<div className="mb-3">
						<p onClick={() => props.handleChangeCategory(_.lowerCase(nonAccentVietnamese(key.toString())))} style={{cursor: "pointer"}}>
							{key} ({props.categories[key]})
						</p>
					</div>
				</li>
			);
		}
	}
	
	const searchResult = (
		<>
			<h5>Kết quả tìm kiếm</h5>
			<div className="text-muted small text-uppercase mb-5">
				<p className="mb-4 font-weight-bold">{props.count} {props.count >= 0 ? "sản phẩm" : null}</p>
				{categories}
			</div>
		</>
	);
	
	const categoryResult = (
		<>
			<section className="mb-4">
				<form className="form-inline mt-4 mb-4 active-primary" onSubmit={props.handleSubmitSearchSidebar}>
					<MDBIcon icon="search"/>
					<input
						onChange={props.handleInputSearchSidebar}
						className="form-control form-control-sm w-75 ml-3"
						type="text"
						placeholder="Tìm trong trang này"
						aria-label="Search"
					/>
				</form>
			</section>
		</>
	);
	
	return (
		<MDBCol md="4" className="mb-4">
			<section>
				<section>
					{props.search ?
						searchResult :
						<h5 className="mb-5">
							{props.count >= 0 ? `Có ${props.count} sản phẩm trong ${_.capitalize(props.category)}` : null}
						</h5>
					}
					<section>
						<h5 className="pt-2 mb-4">Bộ lọc</h5>
						{!props.search ? categoryResult : null}
						<section className="mb-4">
							<h6 className="font-weight-bold mb-3">Đánh giá trung bình</h6>
							<div
								style={{cursor: "pointer"}}
								onClick={() => props.handleClickStar(4.8)}
								className="d-flex d-inline-block mb-2"
								title="5 stars"
							>
								<Rating defaultValue={5} readOnly/>
								<span
									style={props.star === "4.8" ? {color: "blue"} : null}
									className="text-uppercase px-2 font-small"
								>
									(5 sao)
								</span>
							</div>
							<div
								style={{cursor: "pointer"}}
								onClick={() => props.handleClickStar(4)}
								className="d-flex d-inline-block mb-2"
								title="4 stars up"
							>
								<Rating defaultValue={4} readOnly/>
								<span
									style={props.star === "4" ? {color: "blue"} : null}
									className="text-uppercase px-2 font-small"
								>
									(4 sao)
								</span>
							</div>
							<div
								style={{cursor: "pointer"}}
								onClick={() => props.handleClickStar(3)}
								className="d-flex d-inline-block mb-2"
								title="3 stars up"
							>
								<Rating defaultValue={3} readOnly/>
								<span
									style={props.star === "3" ? {color: "blue"} : null}
									className="text-uppercase px-2 font-small"
								>
									(3 sao)
								</span>
							</div>
						</section>
						<section className="mb-4">
							<h6 className="font-weight-bold mb-0">Lọc theo giá</h6>
							<form onSubmit={props.handleSubmit}>
								<div className="d-flex align-items-center">
									<MDBInput type="number" className="mb-0" label="Min" outline getValue={props.minVal} value={props.displayMinVal}/>
									<p className="px-2 mb-0 text-muted">-</p>
									<MDBInput type="number" className="mb-0" label="Max" outline getValue={props.maxVal} value={props.displayMaxVal}/>
								</div>
								<MDBContainer className="text-center">
									<MDBBtn
										type="submit"
										size="sm"
										outline
										color="primary"
										rounded
									>
										Ok
									</MDBBtn>
								</MDBContainer>
							</form>
						</section>
					</section>
				</section>
			</section>
		</MDBCol>
	);
};

export default Sidebar;