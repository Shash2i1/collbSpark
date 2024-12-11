import React from 'react';

const DocumentViewer = ({ url }) => {
  return (
    <div className="pdf-viewer-container" style={{ overflow: 'auto', maxHeight: '600px' }}>
      <iframe
        src={url}
        width="100%"
        height="600px"
        title="PDF Viewer"
        frameBorder="0"
      />
    </div>
  );
};

export default DocumentViewer;