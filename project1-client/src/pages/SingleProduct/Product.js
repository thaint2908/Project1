import React, {Component} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {Rating} from "@material-ui/lab";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import parse from "html-react-parser";
import {Helmet} from "react-helmet";
import Cookies from 'js-cookie';

import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import Search from "../../components/Form/Search/Search";
import "./Product.css";
import ProductImage from "../../components/ProductImage/ProductImage";
import NavBar from "../../components/Navigation/NavBar/NavBar";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Spinner/Spinner";
import {formatNumber} from "../../utils/utilities";
import openBox from "../../assets/images/open-box.jpg";
import queryString from "query-string";
import InputNumber from '../../components/InputNumber/InputNumber';

class Product extends Component {
    descRef = React.createRef();
    state = {
        isOpen: false,
        btnTitle: "Xem thêm",
        fixed: "top",
        input: "",
        descHeight: null,
        quantity: 1
    };
    
    async componentDidMount() {
        const prodId = this.props.match.params.product_id;
        await this.props.onGetProduct(prodId);
        setTimeout(() => {
            if (this.descRef && this.descRef.current && this.descRef.current.offsetHeight) {
                this.setState({
                    descHeight: this.descRef.current.offsetHeight
                });
            }
        }, 2500);
    }
    
    onHandleCollapse = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen,
                btnTitle: !prevState.isOpen ? "Thu gọn" : "Xem thêm"
            };
        });
        if (this.state.isOpen) {
            window.scrollTo(0, this.descRef.current.offsetParent.offsetTop);
        }
    };
    
    onHandleOpenLightbox = () => {
        this.setState({
            fixed: ""
        });
    };
    
    onHandleCloseLightbox = () => {
        this.setState({
            fixed: "top"
        });
    };
    
    onHandleInputSearchChange = (e) => {
        e.preventDefault();
        this.setState({
            input: e.target.value
        });
    };
    
    onHandleSubmitSearch = (e) => {
        e.preventDefault();
        if (this.state.input !== "") {
            this.props.history.push({
                pathname: "/search",
                query: {
                    q: this.state.input
                },
                search: queryString.stringify({
                    q: this.state.input
                })
            });
        }
    }
    
    onChangeQuantity = (e) => {
        this.setState({
            quantity: e.target.value
        });
    }
    
    onHandleAddToCart = () => {
        const addToCartDto = {
            item: {
                id: this.props.product._id,
                quantity: this.state.quantity
            },
            totalPrice: +this.props.product.price * +this.state.quantity
        };
        this.props.onAddToCart(addToCartDto);
        this.props.history.push('/cart');
    }
    
    render() {
        let descStyle = {
            maxHeight: "500px"
        };
        
        let prodDesc = null;
        
        if (this.state.isOpen) {
            descStyle.maxHeight = "none";
        }
        
        let foundProductSection = <Spinner/>;
        let desc = null;
        
        if (!this.props.loading && this.props.error && this.props.status && !this.props.product) {
            if (this.props.status === 404) {
                foundProductSection = (
                    <div className="product-not-exist">
                        <div className="not-exist-content">
                            <img src={openBox} alt="product not found" width="125" height="125"
                                 className="border-0 mb-2"/>
                            <p>Không tìm thấy sản phẩm này</p>
                        </div>
                    </div>
                );
            }
        }
        
        if (!this.props.loading && this.props.product) {
            prodDesc = this.props.product.description;
            
            desc = (
                <div
                    ref={this.descRef}
                >
                    {parse(prodDesc)}
                </div>
            );
            
            foundProductSection = (
                <>
                    <section className="mb-5">
                        <MDBRow>
                            <MDBCol md="6" className="mb-4 mb-md-0">
                                <MDBRow className="text-center">
                                    <ProductImage
                                        smallImg={this.props.product.image_url}
                                        mainImg={this.props.product.image_url}
                                    />
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md="6">
                                <h3 className="font-weight-bold"
                                    style={{wordWrap: "break-word"}}>{this.props.product.name}</h3>
                                <p className="mb-2 text-muted text-uppercase">{this.props.product.category}</p>
                                <Rating value={this.props.product.rating_average} precision={0.1} readOnly/>
                                <p>
                                    Giá sản phẩm: <span
                                    className="mr-1 red-text h4"><strong>{formatNumber(this.props.product.price)} đ̲</strong></span>
                                </p>
                                {this.props.product.price < this.props.product.list_price ?
                                    <>
                                        <p className="mb-0">
                                            Tiết
                                            kiệm: {(100 - this.props.product.price / this.props.product.list_price * 100).toPrecision(2)}%
                                            ({formatNumber(this.props.product.list_price - this.props.product.price)}đ)
                                        </p>
                                        <p>Giá trên thị trường: {formatNumber(this.props.product.list_price)}đ</p>
                                    </>
                                    : null
                                }
                                
                                {this.props.product.summary_description ?
                                    <MDBRow>
                                        <MDBCol size="8" className="border-bottom border-top">
                                            {parse(this.props.product.summary_description)}
                                        </MDBCol>
                                    </MDBRow>
                                    : null
                                }
                                <div className='text-left mt-2' style={{width: 'fit-content'}}>
                                    <p>Số lượng</p>
                                    <InputNumber
                                        style={{marginBottom: 20}}
                                        onChange={this.onChangeQuantity}
                                        value={this.state.quantity}
                                        increase={() => this.setState({quantity: this.state.quantity + 1})}
                                        decrease={() => this.setState({quantity: this.state.quantity - 1})}
                                    />
                                </div>
                                <MDBBtn
                                    color="primary"
                                    onClick={this.onHandleAddToCart}
                                    disabled={!Cookies.get('token')}
                                >
                                    <MDBIcon className="mr-2" icon="shopping-cart"/>
                                    {Cookies.get('token') ?
                                        <span>Mua ngay</span>
                                        : <span>Đăng nhập để mua</span>
                                    }
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </section>
                    
                    <section className="mb-5">
                        <h4 className="mb-4 text-uppercase">Mô tả sản phẩm</h4>
                        <MDBContainer className="bg-light p-2 iframe-container overflow-hidden" style={descStyle}>
                            {desc}
                        </MDBContainer>
                        {this.state.descHeight > 500 ?
                            <MDBContainer className="text-center bg-light">
                                <MDBBtn
                                    className="mt-3 mb-3"
                                    onClick={this.onHandleCollapse}
                                    outline
                                    color="primary"
                                >
                                    {this.state.btnTitle}
                                </MDBBtn>
                            </MDBContainer> : null
                        }
                    </section>
                </>
            );
        }
        
        return (
            <>
                <Helmet>
                    <title>{!this.props.loading && this.props.product ? this.props.product.name : null}</title>
                </Helmet>
                <header>
                    <NavBar isFixed={this.state.fixed}/>
                </header>
                <Jumbotron title="Thông tin sản phẩm" classname="jumbotron-img"/>
                <main>
                    <MDBContainer>
                        <section className="mb-5">
                            <MDBRow center>
                                <Search
                                    value={this.state.input}
                                    handleChange={this.onHandleInputSearchChange}
                                    handleSubmit={this.onHandleSubmitSearch}
                                />
                            </MDBRow>
                        </section>
                        {foundProductSection}
                    </MDBContainer>
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        product: state.productReducer.product,
        loading: state.productReducer.loading,
        status: state.productReducer.status,
        error: state.productReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProduct: (id) => dispatch(actions.getProduct(id)),
        onAddToCart: (addToCartDto) => dispatch(actions.addToCart(addToCartDto))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
