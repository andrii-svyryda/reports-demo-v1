import React from 'react';
import { Heart, Shield, Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="nhs-logo">
            <Heart size={28} className="logo-icon" />
          </div>
          <div className="logo-text-group">
            <span className="logo-text">NHS Clinical Reports</span>
            <span className="logo-subtitle">Integration Platform</span>
          </div>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-link active">Report Generator</a>
          <a href="#" className="nav-link">Patient Records</a>
          <a href="#" className="nav-link">Trust Reports</a>
          <a href="#" className="nav-link">Audit Trail</a>
        </nav>
        <div className="header-status">
          <Shield size={16} className="security-icon" />
          <span>NHS Secure</span>
          <div className="connection-status">
            <Activity size={14} className="status-icon" />
            <span>Connected to Spine</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;