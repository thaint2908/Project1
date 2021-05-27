import React from "react";
import {MagnifierContainer, SideBySideMagnifier} from "react-image-magnifiers";
import {MDBCol, MDBIcon, MDBRow} from "mdbreact";
import {url} from '../../axios-server';

const ProductImage = (props) => {
	return (
		<>
			<MDBCol size="12" className="mb-0 pr-5 pl-5">
				<MagnifierContainer>
					<SideBySideMagnifier
						className="mb-2"
						alwaysInPlace
						cursorStyle="zoom-in"
						imageSrc={url + '/' + props.smallImg}
						largeImageSrc={url + '/' + props.mainImg}
						imageAlt=""
					/>
					<MDBRow center>
						<MDBCol size="12">
							<MDBIcon icon="search-plus" size="xs"/>
							<span className="font-small">Chạm vào hình ảnh để phóng to</span>
						</MDBCol>
					</MDBRow>
				</MagnifierContainer>
			</MDBCol>
		</>
	);
};

export default ProductImage;
