import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import ProcessingStatus from './components/ProcessingStatus';
import ReportDownload from './components/ReportDownload';

function App() {
  const [uploadState, setUploadState] = useState('idle');
  const [processingStep, setProcessingStep] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (file) => {
    setFileName(file.name);
    setUploadState('processing');
    setProcessingStep(0);
    simulateProcessing();
  };

  const simulateProcessing = () => {
    const steps = [
      { delay: 800, step: 1 },
      { delay: 1700, step: 2 },
      { delay: 3200, step: 3 },
      { delay: 3900, step: 4 },
      { delay: 6100, step: 5 },
      { delay: 7300, step: 6 },
      { delay: 8600, step: 7 },
      { delay: 11200, step: 'complete' }
    ];

    steps.forEach(({ delay, step }) => {
      setTimeout(() => {
        if (step === 'complete') {
          setUploadState('complete');
        } else {
          setProcessingStep(step);
        }
      }, delay);
    });
  };

  const handleReset = () => {
    setUploadState('idle');
    setProcessingStep(0);
    setFileName('');
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="hero-section">
              <h1 className="hero-title">NHS Clinical Report Generator</h1>
              <p className="hero-subtitle">
                Transform patient data into comprehensive clinical reports with NHS compliance and integration
              </p>
            </div>

            <div className="workflow-card">
              {uploadState === 'idle' && (
                <FileUploader onFileUpload={handleFileUpload} />
              )}

              {uploadState === 'processing' && (
                <ProcessingStatus
                  step={processingStep}
                  fileName={fileName}
                />
              )}

              {uploadState === 'complete' && (
                <ReportDownload
                  fileName={fileName}
                  reportType="discharge"
                  onReset={handleReset}
                />
              )}
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🏥</div>
                <h3>NHS Integration</h3>
                <p>Seamless integration with GP Connect, NHS Spine, and Summary Care Records</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Data Security</h3>
                <p>Compliant with NHS Data Security Standards and Caldicott principles</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📋</div>
                <h3>Clinical Standards</h3>
                <p>SNOMED CT coding, HL7 CDA formatting, and NICE guidelines compliance</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Multi-Trust Support</h3>
                <p>Cross-organisational data sharing with consent management</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Real-time Sync</h3>
                <p>Automatic synchronisation with NHS systems and GP practices</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>QOF Reporting</h3>
                <p>Quality Outcomes Framework reports and clinical coding submissions</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;