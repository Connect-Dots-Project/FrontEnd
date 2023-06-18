import React, { useState } from 'react';
import CKEditor from 'react-ckeditor-component';

const ConnectWriteBoard = ({ setHotplaceContent }) => {
  const [content, setContent] = useState('');

  const handleEditorChange = (event) => {
    const updatedContent = event.editor.getData();
    setContent(updatedContent);
    setHotplaceContent(updatedContent);
  };

  return (
    <div>
      <CKEditor
        activeClass="editor"
        content={content}
        events={{
          change: handleEditorChange,
        }}
        autoFocus
      />
    </div>
  );
};

export default ConnectWriteBoard;