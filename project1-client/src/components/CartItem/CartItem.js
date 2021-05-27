import React, {useEffect, useState} from 'react';
import {MDBCol, MDBIcon, MDBMask, MDBRow, MDBView} from 'mdbreact';
import {Link} from 'react-router-dom';

import InputNumber from '../InputNumber/InputNumber';
import {url} from '../../axios-server';
import {formatNumber} from '../../utils/utilities';

const CartItem = (props) => {
    const [quantity, setQuantity] = useState(props.quantity);
    const [update, setUpdate] = useState(false);
    
    const handleOnChange = (e) => {
        setQuantity(+e.target.value);
        setUpdate(true);
    };
    
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        setUpdate(true);
    };
    
    const handleDecrease = () => {
        setQuantity(prevQuantity => prevQuantity - 1);
        setUpdate(true);
    };
    
    useEffect(() => {
        if (update) {
            props.handleOnChangeQuantity(props.id, quantity, props.price);
            setUpdate(false);
        }
    }, [update, quantity]);
    
    return (
        <MDBRow className='mb-4'>
            <MDBCol lg='3' md='5'>
                <MDBView zoom className='overlay z-depth-1 mb-3 mb-md-0' rounded>
                    <img
                        className="img-fluid "
                        src={url + '/' + props.imgSrc}
                        alt="Ảnh sp"
                    />
                    <Link to={`/products/${props.id}`}>
                        <span className='mb-0'>
                            <MDBMask className='waves-effect waves-light'>
                                <img
                                    className="img-fluid "
                                    src={url + '/' + props.imgSrc}
                                    alt="Ảnh sp"
                                />
                                <MDBMask className='waves-effect waves-light'/>
                            </MDBMask>
                        </span>
                    </Link>
                </MDBView>
            </MDBCol>
            <MDBCol lg='9' md='7'>
                <div>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h5>{props.name}</h5>
                            <span className="mb-3 text-muted text-uppercase small">{props.summary}</span>
                        </div>
                        <div>
                            <InputNumber
                                value={quantity}
                                onChange={handleOnChange}
                                increase={handleIncrease}
                                decrease={handleDecrease}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <MDBIcon
                            far
                            icon='trash-alt'
                            className='text-uppercase'
                            style={{cursor: 'pointer'}}
                            onClick={() => props.onRemoveClick(props.id)}
                        >
                            <small className='ml-2'>Xoá</small>
                        </MDBIcon>
                    </div>
                    <p className="mb-0"><span><strong>{formatNumber(props.price)} đ</strong></span></p>
                </div>
            </MDBCol>
        </MDBRow>
    );
};

export default CartItem;
