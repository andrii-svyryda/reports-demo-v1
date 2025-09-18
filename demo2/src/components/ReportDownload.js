import React from "react";
import {
  CheckCircle,
  Download,
  RefreshCw,
  FileText,
  Calendar,
  Shield,
  Hash,
  Building,
  Send,
} from "lucide-react";

const ReportDownload = ({ fileName, reportType, onReset }) => {
  const getReportDetails = () => {
    const reportTypes = {
      discharge: {
        name: "Discharge Summary",
        contents: [
          "Patient Demographics (NHS Number)",
          "Admission & Discharge Details",
          "Primary & Secondary Diagnoses (ICD-10)",
          "Procedures Performed (OPCS-4)",
          "Medications on Discharge",
          "Follow-up Arrangements",
          "GP Action Required",
        ],
      },
      clinic: {
        name: "Clinic Letter",
        contents: [
          "Patient Identification",
          "Consultation Summary",
          "Clinical Findings",
          "Investigation Results",
          "Management Plan",
          "Medication Changes",
          "Next Appointment",
        ],
      },
      mdt: {
        name: "MDT Report",
        contents: [
          "Team Members Present",
          "Patient Case Summary",
          "Discussion Points",
          "Clinical Decision",
          "Treatment Pathway",
          "Care Coordination Plan",
          "Actions by Discipline",
        ],
      },
      referral: {
        name: "Referral Form",
        contents: [
          "Referrer Details",
          "Patient Demographics",
          "Reason for Referral",
          "Clinical History",
          "Current Medications",
          "Allergies & Alerts",
          "Urgency Level",
        ],
      },
      qof: {
        name: "QOF Report",
        contents: [
          "Practice Performance Metrics",
          "Clinical Domain Indicators",
          "Public Health Indicators",
          "Quality Improvement Points",
          "Exception Reporting",
          "Prevalence Data",
          "Achievement Summary",
        ],
      },
      encounter: {
        name: "Encounter Summary",
        contents: [
          "Encounter Type & Date",
          "Presenting Complaint",
          "Clinical Assessment",
          "SNOMED CT Coding",
          "Treatment Provided",
          "Prescriptions Issued",
          "Read Codes Applied",
        ],
      },
    };
    return reportTypes[reportType] || reportTypes.discharge;
  };

  const reportDetails = getReportDetails();
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/reports-demo-v1/demo1/sample-report.xlsx";
    link.download = `NHS-${reportType}-${Date.now()}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="download-container">
      <div className="success-header">
        <CheckCircle size={64} className="success-icon" />
        <h2>Clinical Report Ready!</h2>
        <p className="success-subtitle">
          NHS-compliant document has been generated and validated
        </p>
      </div>

      <div className="report-details">
        <div className="detail-card">
          <FileText size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Report Type</span>
            <span className="detail-value">{reportDetails.name}</span>
          </div>
        </div>

        <div className="detail-card">
          <Hash size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">NHS Number</span>
            <span className="detail-value">*** **** ****</span>
          </div>
        </div>

        <div className="detail-card">
          <Building size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Trust/Practice</span>
            <span className="detail-value">NHS Trust Demo</span>
          </div>
        </div>

        <div className="detail-card">
          <Calendar size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Generated</span>
            <span className="detail-value">{new Date().toLocaleString()}</span>
          </div>
        </div>

        <div className="detail-card">
          <Shield size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Compliance</span>
            <span className="detail-value">HL7 CDA R2</span>
          </div>
        </div>

        <div className="detail-card">
          <Send size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Status</span>
            <span className="detail-value">Ready to Send</span>
          </div>
        </div>
      </div>

      <div className="report-preview">
        <h3>Document Contents</h3>
        <ul className="contents-list">
          {reportDetails.contents.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="action-buttons">
        <button className="download-button" onClick={handleDownload}>
          <Download size={20} />
          Download NHS Report
        </button>
        <button className="reset-button" onClick={onReset}>
          <RefreshCw size={20} />
          Generate Another Report
        </button>
      </div>
    </div>
  );
};

export default ReportDownload;
