import React from "react";
import { Editor } from '@tinymce/tinymce-react';

type TTinyMceEditor = {
    editorText: string,
    onChange: (e: any) => void,
}

const TinyMceEditor = ( props: TTinyMceEditor ) => (
    <Editor
        apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
        cloudChannel='dev'
        initialValue={`<p>${props.editorText}</p>`}
        // @TODO id/class this properly & add CSS
        id="text-editor"
        init={{
            plugins: [
                'advlist autolink lists link image charmap print preview anchor textcolor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code help wordcount'
            ],
            toolbar: 'insert | undo redo |  formatselect | bold italic forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            menubar: false,
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'],
            height: 446,
            setup: function(ed: any) {
                ed.on('keydown', function(event: any) {
                    if (event.keyCode === 9) { // tab pressed
                        ed.execCommand('mceInsertContent', false, '&emsp;'); 
                        event.preventDefault();
                        return false;
                    }
                });
            }
        }}
        onChange={props.onChange}
    />
);

export default TinyMceEditor;