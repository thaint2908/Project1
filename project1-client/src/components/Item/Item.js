import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MDBBadge, MDBCol, MDBMask, MDBView} from "mdbreact";
import {Rating} from "@material-ui/lab";

import {formatNumber} from "../../utils/utilities";
import "./Item.css";
import {url} from '../../axios-server';

const Item = (props) => {
	const [isSale, setIsSale] = useState(false);
	const [salePer, setSalePer] = useState('0');
	
	useEffect(() => {
		if (props.price < props.list_price) {
			setIsSale(true);
			setSalePer((100 - props.price / props.list_price * 100).toPrecision(2));
		}
	}, [props.list_price, props.price]);
	
	const img = url + '/' + props.imageUrl;
	
	return (
		<MDBCol lg="3" sm="6" className="mb-5">
			<MDBView zoom hover className="z-depth-2">
				<img
					className="img-fluid w-100"
					src={img}
					alt={props.name}
				/>
				{isSale ? <h6 className="mb-0">
					<MDBBadge className="badge-news" pill color="danger">-{salePer}%</MDBBadge>
				</h6> : null}
				<Link to={`/products/${props.id}`}>
					<MDBMask>
						<img
							className="img-fluid w-100"
							src={img}
							alt={props.name}
						/>
						<MDBMask/>
					</MDBMask>
				</Link>
			</MDBView>
			<div className="text-center pt-4 pb-0">
				<Link to={`/products/${props.id}`}>
					<h5 title={props.name} style={{height: "50px"}} className="scale-item">
						{props.name}
					</h5>
				</Link>
				<p className="pt-2 mb-1" style={{height: "60px"}}>
					<strong className="h5">{formatNumber(props.price)} đ̲</strong>
					{isSale ? <span style={{textDecoration: "line-through"}} className="d-block">{formatNumber(props.list_price)} đ̲</span> : null}
				</p>
			</div>
			<div className="d-flex d-lg-inline-block mb-2">
				<p className="mb-0">
					<Rating size="small" value={props.rating} precision={0.1} readOnly/>
				</p>
				<p className="black-text px-1 font-small">({props.review_count ?? 0} nhận xét)</p>
			</div>
		</MDBCol>
	);
};

export default Item;
