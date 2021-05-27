import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBCollapse,
    MDBContainer,
    MDBNavbarToggler,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBMask,
    MDBInput,
    MDBIcon,
    MDBView,
    MDBBtn,
    MDBLink
} from 'mdbreact';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './Login.css';
import * as actions from '../../store/actions/index';

class Login extends React.Component {
    state = {
        collapseID: '',
        email: '',
        password: ''
    };
    
    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));
    };
    
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };
    
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        const loginDto = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.onLogin(loginDto);
    };
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.error && this.props.tokenData) {
            this.props.history.push('/');
        }
    }
    
    render() {
        return (
            <div className='classic-form-page' id='login'>
                <MDBNavbar
                    color='deep-purple darken-4'
                    dark
                    expand='md'
                    fixed='top'
                    scrolling
                    transparent
                >
                    <MDBNavbarBrand href='/'>
                        <strong className='text-info'>Market</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse')}/>
                    <MDBCollapse
                        id='navbarCollapse'
                        isOpen={this.state.collapseID}
                        navbar
                    >
                    </MDBCollapse>
                </MDBNavbar>
                <MDBView>
                    <MDBMask
                        className='d-flex justify-content-center align-items-center'
                        overlay='stylish-strong'
                    >
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <h3 className='text-center text-info '>
                                                <MDBIcon
                                                    icon='user'
                                                    className='mt-2 mb-2 text-info'
                                                />{' '}
                                                Sign in
                                            </h3>
                                            <MDBInput
                                                type='email'
                                                label='Your email'
                                                icon='envelope'
                                                iconClass='white-text'
                                                onChange={this.onChangeEmail}
                                            />
                                            <MDBInput
                                                type='password'
                                                label='Your password'
                                                icon='lock'
                                                iconClass='white-text'
                                                onChange={this.onChangePassword}
                                            />
                                            <div className='text-center mt-3 black-text'>
                                                <MDBBtn
                                                    className='primary-color'
                                                    size='lg'
                                                    type='submit'
                                                    onClick={this.onSubmit}
                                                >
                                                    Sign In
                                                </MDBBtn>
                                                <hr/>
                                                <p className='d-inline'>Chưa có tài khoản?</p>
                                                <MDBLink className='d-inline' to='/sign-up'>
                                                    Đăng ký
                                                </MDBLink>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenData: state.authReducer.payload,
        error: state.authReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (loginDto) => dispatch(actions.loginAuth(loginDto))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
