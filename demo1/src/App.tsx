import React, { useState, useCallback, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  Download,
  Loader2,
  Users,
  Clock,
  FileSpreadsheet,
  X,
  FileBarChart,
  TestTube,
  Activity,
  Database,
} from "lucide-react";
import "./App.css";

type ProcessingStatus = "idle" | "uploading" | "processing" | "complete";

interface ProcessingStep {
  message: string;
  completed: boolean;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (status === "processing") {
      const steps = [
        { message: "Validating laboratory data format...", duration: 600 },
        { message: "Syncing with Epic FHIR APIs...", duration: 1200 },
        { message: "Retrieving patient demographics (MRN)...", duration: 800 },
        { message: "Processing specimen tracking data...", duration: 1500 },
        { message: "Analyzing test results and QC metrics...", duration: 1000 },
        { message: "Generating compliance audit trails...", duration: 1100 },
        {
          message: "Compiling HIPAA-compliant report sections...",
          duration: 900,
        },
        { message: "Finalizing laboratory report...", duration: 700 },
      ];

      let currentTime = 0;
      const timeouts: NodeJS.Timeout[] = [];
      let progressTimeout: NodeJS.Timeout;

      steps.forEach((step, index) => {
        const timeout = setTimeout(() => {
          setProcessingSteps((prev) => [
            ...prev,
            { message: step.message, completed: true },
          ]);
          setProgress(((index + 1) / steps.length) * 100);
        }, currentTime);

        timeouts.push(timeout);
        currentTime += step.duration;
      });

      // Set status to complete after all steps
      progressTimeout = setTimeout(() => {
        setStatus("complete");
      }, currentTime + 300);

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
        clearTimeout(progressTimeout);
      };
    }
  }, [status]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith(".xlsx") ||
        droppedFile.name.endsWith(".xls") ||
        droppedFile.name.endsWith(".csv"))
    ) {
      handleFileUpload(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setStatus("uploading");
    setProgress(0);
    setProcessingSteps([]);

    setTimeout(() => {
      setStatus("processing");
    }, 1000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/reports-demo-v1/demo1/sample-report.xlsx";
    link.download = `laboratory-report-EPIC-${Date.now()}.xlsx`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setProcessingSteps([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Activity size={32} />
              <span>Epic Laboratory Integration System</span>
            </div>
            <nav className="nav">
              <button className="nav-item">Dashboard</button>
              <button className="nav-item">Lab Results</button>
              <button className="nav-item">Specimen Tracking</button>
              <button className="nav-item">Compliance</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="upload-section">
            <div className="section-title">
              <h2>Laboratory Data Report Generator</h2>
              <p>
                Upload laboratory data to generate Epic-compatible clinical
                reports with full HIPAA compliance
              </p>
            </div>

            {status === "idle" && (
              <div className="upload-area">
                <div
                  className={`dropzone ${isDragging ? "active" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <div className="dropzone-icon">
                    <Upload size={48} />
                  </div>
                  <div className="dropzone-text">
                    Drop your laboratory data file here or click to browse
                  </div>
                  <div className="dropzone-subtext">
                    Supports .xlsx, .xls, and .csv files with HL7/FHIR formatted
                    data
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    className="file-input"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            )}

            {file && status !== "idle" && (
              <div className="file-info">
                <div className="file-details">
                  <FileSpreadsheet size={24} />
                  <div>
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                {status === "uploading" && (
                  <button className="remove-file" onClick={handleReset}>
                    <X size={16} />
                  </button>
                )}
              </div>
            )}

            {(status === "uploading" || status === "processing") && (
              <div className="processing-section">
                <div className="status-header">
                  <Loader2 className="status-icon" size={24} />
                  <div className="status-title">
                    {status === "uploading"
                      ? "Uploading laboratory data..."
                      : "Processing clinical data..."}
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {processingSteps.map((step, index) => (
                  <div key={index} className="status-message">
                    <CheckCircle size={16} />
                    {step.message}
                  </div>
                ))}
              </div>
            )}

            {status === "complete" && (
              <div className="complete-section">
                <div className="complete-icon">
                  <CheckCircle size={64} />
                </div>
                <div className="complete-title">Laboratory Report Ready!</div>
                <div className="complete-subtitle">
                  Your HIPAA-compliant clinical laboratory report has been
                  generated and synced with Epic
                </div>
                <button className="download-btn" onClick={handleDownload}>
                  <Download size={20} />
                  Download Clinical Report
                </button>
                <br />
                <button className="reset-btn" onClick={handleReset}>
                  Process Another Dataset
                </button>
              </div>
            )}
          </div>

          {status === "idle" && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <TestTube size={32} />
                </div>
                <div className="stat-value">15,847</div>
                <div className="stat-label">Specimens Processed</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Database size={32} />
                </div>
                <div className="stat-value">98.7%</div>
                <div className="stat-label">Epic Sync Success</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Clock size={32} />
                </div>
                <div className="stat-value">7.8s</div>
                <div className="stat-label">Avg. Process Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FileBarChart size={32} />
                </div>
                <div className="stat-value">3,421</div>
                <div className="stat-label">Reports This Month</div>
              </div>
            </div>
          )}

          {status === "idle" && (
            <div className="features-section">
              <h3 className="features-title">Integration Features</h3>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <Activity size={24} />
                  </div>
                  <h4>Real-time HL7 Processing</h4>
                  <p>
                    Seamless integration with Epic's ADT feeds and FHIR APIs for
                    instant data synchronization
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <TestTube size={24} />
                  </div>
                  <h4>QR Code Specimen Tracking</h4>
                  <p>
                    Complete chain-of-custody tracking from collection to
                    resulting with audit trails
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FileText size={24} />
                  </div>
                  <h4>HIPAA-Compliant Reports</h4>
                  <p>
                    Automated generation of clinical reports meeting all
                    regulatory requirements
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Users size={24} />
                  </div>
                  <h4>Multi-Tenant Support</h4>
                  <p>
                    Azure AD B2C integration supporting multiple healthcare
                    facilities
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
