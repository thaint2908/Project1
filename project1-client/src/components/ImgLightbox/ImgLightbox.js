import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Lightbox from "react-image-lightbox";
import "./ImgLightbox.css";

class ImgLightbox extends React.Component {
	state = {
		photoIndex: 0,
		isOpen: false,
		images: this.props.images
	}
	
	renderImages = () => {
		let photoIndex = -1;
		const {images} = this.state;
		
		return images.map(imageSrc => {
			photoIndex++;
			const privateKey = photoIndex;
			
			return (
				<MDBCol lg="3" md="4" sm="6" key={photoIndex} className="pr-lg-0 pb-0">
					<div style={{cursor: "pointer", backgroundImage: `url(${imageSrc.replace("/ts/", "/cache/280x280/ts/")})`}} className="center-cropped">
						<img
							src={imageSrc}
							alt=""
							onClick={() => this.setState({photoIndex: privateKey, isOpen: true})
						}
						/>
					</div>
				</MDBCol>
			);
		})
	}
	
	render() {
		const {photoIndex, isOpen, images} = this.state;
		return (
			<MDBContainer className="mt-0">
				<div className="mdb-lightbox">
					<MDBRow>
						{this.renderImages()}
					</MDBRow>
				</div>
				{isOpen && (
					<Lightbox
						mainSrc={images[photoIndex]}
						nextSrc={images[(photoIndex + 1) % images.length]}
						prevSrc={images[(photoIndex + images.length - 1) % images.length]}
						imageTitle={photoIndex + 1 + "/" + images.length}
						onCloseRequest={() => {
							this.setState({isOpen: false});
							this.props.onClosed();
						}}
						onMovePrevRequest={() =>
							this.setState({
								photoIndex: (photoIndex + images.length - 1) % images.length
							})
						}
						onMoveNextRequest={() =>
							this.setState({
								photoIndex: (photoIndex + 1) % images.length
							})
						}
						onAfterOpen={this.props.afterOpened}
					/>
				)}
			</MDBContainer>
		);
	}
}

export default ImgLightbox;
