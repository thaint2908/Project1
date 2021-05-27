import React, {useEffect} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBNavbar,
    MDBRow
} from "mdbreact";
import {useDispatch, useSelector} from 'react-redux';
import parse from 'html-react-parser';
import {toast, ToastContainer} from 'react-toastify';

import './Cart.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';
import CartItem from '../../components/CartItem/CartItem';
import {addToCart, createOrder, deleteFromCart, getCart} from '../../store/actions';
import {formatNumber} from '../../utils/utilities';

const Cart = () => {
    const cart = useSelector(state => state.cartReducer.cart);
    const error = useSelector(state => state.cartReducer.error);
    const orderError = useSelector(state => state.orderReducer.error);
    const orderData = useSelector(state => state.orderReducer.order);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCart());
    }, []);
    
    const handleOnRemove = (id) => {
        dispatch(deleteFromCart(id));
        dispatch(getCart());
    };
    
    const handleOnChangeQuantity = (prodId, quantity, price) => {
        const addToCartDto = {
            item: {
                id: prodId,
                quantity
            },
            totalPrice: +price * quantity
        };
        dispatch(addToCart(addToCartDto));
        dispatch(getCart());
    };
    
    let cartItems = [];
    if (cart.items) {
        for (const item of cart.items) {
            cartItems.push(
                <CartItem
                    key={item.product._id}
                    id={item.product._id}
                    imgSrc={item.product.image_url}
                    name={item.product.name}
                    summary={parse(item.product.summary_description)}
                    quantity={item.quantity}
                    price={item.product.price}
                    onRemoveClick={handleOnRemove}
                    handleOnChangeQuantity={handleOnChangeQuantity}
                />
            );
        }
    }
    
    const handleOnCheckout = (cartId) => {
        const createOrderDto = {
            cartId,
            orderedDate: new Date().toISOString()
        };
        dispatch(createOrder(createOrderDto));
        dispatch(() => {
            if (!orderError && orderData) {
                toast.success('Success', {
                    closeButton: false,
                    bodyClassName: 'md-toast-message',
                    className: 'md-toast md-toast-success',
                    onClose: () => {
                        dispatch(getCart());
                    }
                });
            } else {
                toast.error('Can not order', {
                    closeButton: false,
                    bodyClassName: 'md-toast-message',
                    className: 'md-toast md-toast-error',
                });
            }
        });
    };
    
    return (
        <div>
            <MDBNavbar>
                <header>
                    <NavBar isFixed="top"/>
                </header>
            </MDBNavbar>
            <MDBContainer className='text-center' style={{marginTop: 70}}>
                <h3 className='font-bold mt-lg-5 mb-5 pb-4'> Shopping Cart</h3>
            </MDBContainer>
            <MDBContainer className='mb-5'>
                <section>
                    <MDBRow>
                        <MDBCol lg={cartItems.length > 0 ? '8' : '12'} md='12' className='mb-5'>
                            <MDBCard>
                                <MDBCardBody>
                                    <h5 className='mb-4'>
                                        Cart (
                                        <span>{cartItems.length} </span>
                                        items)
                                    </h5>
                                    {cartItems}
                                    <hr className="mb-4"/>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        {cartItems.length > 0 ?
                            <MDBCol lg='4' md='12'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <h5 className="mb-3">The total amount of</h5>
                                        <ul className='list-group'>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Temporary amount
                                                <span>{formatNumber(cart.totalPrice) ?? 0} đ</span>
                                            </li>
                                        </ul>
                                        <button
                                            type="button"
                                            style={{marginTop: 30, cursor: 'pointer'}}
                                            className=" btn btn-primary btn-block waves-effect waves-light"
                                            onClick={() => handleOnCheckout(cart._id)}
                                        >
                                            go to checkout
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol> : null
                        }
                    </MDBRow>
                </section>
            </MDBContainer>
            <ToastContainer
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={3000}
                className='md-toast-top-right'
            />
        </div>
    );
};

export default React.memo(Cart);
