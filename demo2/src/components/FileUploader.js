import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

const FileUploader = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        alert('Please upload an Excel file (.xlsx or .xls) containing patient data');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleProcessFile = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">Upload Patient Data</h2>
      <p className="uploader-subtitle">Select patient data file to generate comprehensive clinical report</p>

      <div
        className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-input-hidden"
          accept=".xlsx,.xls"
          onChange={handleChange}
        />

        <Upload size={48} className="upload-icon" />
        <p className="upload-text">
          Drag & drop patient data file here, or click to browse
        </p>
        <p className="upload-hint">Supported formats: .xlsx, .xls (NHS data extract format)</p>
      </div>

      {selectedFile && (
        <div className="selected-file">
          <div className="file-info">
            <File size={20} className="file-icon" />
            <span className="file-name">{selectedFile.name}</span>
            <span className="file-size">
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button className="remove-file" onClick={handleRemoveFile}>
            <X size={16} />
          </button>
        </div>
      )}

      {selectedFile && (
        <button className="process-button" onClick={handleProcessFile}>
          Generate Clinical Report
        </button>
      )}
    </div>
  );
};

export default FileUploader;