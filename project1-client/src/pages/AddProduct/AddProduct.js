import React, {useState} from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBRow, MDBContainer, MDBNavbar, MDBFileInput, MDBBtn} from "mdbreact";
import draftToHtml from 'draftjs-to-html';
import {EditorState, convertToRaw} from 'draft-js';
import {useDispatch} from 'react-redux';

import NavBar from "../../components/Navigation/NavBar/NavBar";
import WysiwygEditor from '../../components/WysiwygEditor/WysiwygEditor';
import {addNewProduct} from '../../store/actions/addProduct';
import {useHistory} from 'react-router';
import Footer from '../../components/Layout/UI/Footer/Footer';

const AddProduct = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const [summaryDescEditorState, setSummaryDescEditorState] = useState(EditorState.createEmpty());
    const [descEditorState, setDescEditorState] = useState(EditorState.createEmpty());
    const [file, setFile] = useState(null);
    
    const onSummaryDescEditorStateChange = (summaryDescEditorState) => {
        setSummaryDescEditorState(summaryDescEditorState);
    };
    
    const onDescEditorStateChange = (descEditorState) => {
        setDescEditorState(descEditorState);
    };
    
    const onGetFile = (value) => {
        setFile(value[0]);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        const createProductDto = {
            name,
            price,
            category,
            summary_description: draftToHtml(convertToRaw(summaryDescEditorState.getCurrentContent())),
            description: draftToHtml(convertToRaw(descEditorState.getCurrentContent())),
            image: file
        };
        dispatch(addNewProduct(createProductDto));
        dispatch(() => {
            history.push('/products');
        });
    };
    
    return (
        <div>
            <MDBNavbar>
                <header>
                    <NavBar isFixed="top"/>
                </header>
            </MDBNavbar>
            <MDBContainer style={{marginTop: 70}} className='text-center'>
                <h2 className=' mt-lg-5 mb-3 pb-4'>Thêm sản phẩm</h2>
            </MDBContainer>
            <MDBContainer className='d-flex justify-content-center align-items-center mb-5'>
                <MDBCard>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='12'>
                                <label htmlFor="formGroupExampleInput"> Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </MDBCol>
                            <MDBCol md='12'>
                                <label htmlFor="formGroupExampleInput"> Price (VNĐ)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </MDBCol>
                            <MDBCol md='12'>
                                <label htmlFor="formGroupExampleInput"> Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </MDBCol>
                            <MDBCol md='12' className='mt-1'>
                                <p>Summary description</p>
                                <WysiwygEditor
                                    editorState={summaryDescEditorState}
                                    onEditorStateChange={onSummaryDescEditorStateChange}
                                />
                            </MDBCol>
                            <MDBCol md='12' className='mt-1'>
                                <p>Description</p>
                                <WysiwygEditor
                                editorState={descEditorState}
                                onEditorStateChange={onDescEditorStateChange}
                            />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className='mt-2'>
                            <MDBCol md='12'>
                                <MDBFileInput
                                    getValue={onGetFile}
                                    btnTitle='Ảnh sản phẩm'
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol className='text-right'>
                                <MDBBtn color='primary' type='submit' onClick={onSubmit}>
                                    Thêm
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    )
};

export default React.memo(AddProduct);
