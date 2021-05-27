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
    MDBBtn
} from 'mdbreact';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions/index';

import './Signup.css';

class Signup extends React.Component {
    state = {
        collapseID: '',
        username: '',
        email: '',
        password: ''
    };
    
    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));
    };
    
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
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
        const signUpDto = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        this.props.onSignUp(signUpDto);
    };
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.error && this.props.data) {
            this.props.history.push('/login');
        }
    }
    
    render() {
        return (
            <div className='classic-form-page' id='sign-up'>
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
                                                Sign up
                                            </h3>
                                            <MDBInput
                                                type='text'
                                                label='Your username'
                                                icon='user-alt'
                                                iconClass='white-text'
                                                onChange={this.onChangeUsername}
                                            />
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
                                                    Sign Up
                                                </MDBBtn>
                                                <hr/>
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
        data: state.authReducer.payload,
        error: state.authReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (signUpDto) => dispatch(actions.signUpAuth(signUpDto))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
