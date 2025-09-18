import React from 'react';
import { Loader, CheckCircle, Clock, FileSearch, Filter, Table, Calculator, PieChart, FileCheck, FileText } from 'lucide-react';

const ProcessingStatus = ({ step, fileName }) => {
  const steps = [
    { id: 1, name: 'Reading Excel Data', icon: FileSearch, description: 'Parsing spreadsheet structure and sheets...' },
    { id: 2, name: 'Data Validation', icon: Filter, description: 'Checking for missing values and data types...' },
    { id: 3, name: 'Extracting Tables', icon: Table, description: 'Identifying and extracting data tables...' },
    { id: 4, name: 'Processing Formulas', icon: Calculator, description: 'Computing calculated fields and aggregations...' },
    { id: 5, name: 'Data Analysis', icon: PieChart, description: 'Analyzing patterns and generating insights...' },
    { id: 6, name: 'Format Validation', icon: FileCheck, description: 'Validating NHS data format compliance...' },
    { id: 7, name: 'Generating Report', icon: FileText, description: 'Creating comprehensive clinical document...' }
  ];

  return (
    <div className="processing-container">
      <div className="processing-header">
        <Loader className="spinner" size={32} />
        <h2>Processing Data File</h2>
        <p className="processing-filename">{fileName}</p>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">{Math.round((step / steps.length) * 100)}%</span>
      </div>

      <div className="steps-list">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === step;
          const isComplete = s.id < step;

          return (
            <div
              key={s.id}
              className={`step-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
            >
              <div className="step-icon-wrapper">
                {isComplete ? (
                  <CheckCircle size={24} className="step-icon complete" />
                ) : isActive ? (
                  <Loader size={24} className="step-icon spinning" />
                ) : (
                  <Icon size={24} className="step-icon" />
                )}
              </div>
              <div className="step-content">
                <h3 className="step-name">{s.name}</h3>
                <p className="step-description">
                  {isActive ? s.description : isComplete ? 'Complete' : 'Waiting...'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="processing-footer">
        <Clock size={16} />
        <span>Processing... Please wait</span>
      </div>
    </div>
  );
};

export default ProcessingStatus;