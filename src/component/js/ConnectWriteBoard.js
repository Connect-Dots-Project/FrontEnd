import React from 'react'
import CKEditor from 'react-ckeditor-component';

const ConnectWriteBoard = () => {

    const handleEditorChange = (event) => {
        console.log(event.editor.getData());
      };

    


  return (
    <div>
      <CKEditor
        activeClass="editor"
        events={{
          change: handleEditorChange,
        }}
        autoFocus
      />
    </div>
  )
}

export default ConnectWriteBoard