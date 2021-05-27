import React from 'react';
import {Editor} from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './WysiwygEditor.css';

const WysiwygEditor = (props) => {
    return (
        <div className='rdw-storybook-root'>
            <Editor
                editorState={props.editorState}
                toolbarClassName="rdw-storybook-toolbar"
                wrapperClassName="rdw-storybook-wrapper"
                editorClassName="rdw-storybook-editor"
                onEditorStateChange={props.onEditorStateChange}
            />
        </div>
    );
};

export default WysiwygEditor;
