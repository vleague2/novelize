import * as React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import "./Editor.css";

type TEditorProps = {
  onChange: (editor) => void;
  data: string;
}

export const Editor = ({ onChange, data }: TEditorProps) => {
  return (
    <div className="document-editor">
      <CKEditor 
        onInit={(editor) => {
          // The document editor build requires you to insert the toolbar like this
          // https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html#using-the-document-editor-build
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement(),
          )
        }}
        onChange={(event, editor) => onChange(editor)}
        editor={DecoupledEditor}
        data={data}
        style={{overflow: 'scroll'}}
        className="monkey"
      />
    </div>
  )
}