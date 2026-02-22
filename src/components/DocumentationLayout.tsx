import React from 'react';
import '../styles/Documentation.scss';
import { useNavigate } from 'react-router-dom';

interface DocumentationLayoutProps {
    children: React.ReactNode;
}

const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="documentation-container">
            <nav className="documentation-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-container">
                        <span>( •_• )</span>
                    </div>
                    <div className="logo-text">/agentation</div>
                </div>
                <div className="sidebar-nav">
                    <a href="#" className="nav-link active">Overview</a>
                    <a href="#" className="nav-link">Install</a>
                    <a href="#" className="nav-link">Features</a>
                    <a href="#" className="nav-link">Output</a>
                    <a href="#" className="nav-link">API <span className="badge-new">NEW</span></a>
                    <a href="#" className="nav-link">Changelog</a>
                    <a href="#" className="nav-link">FAQ</a>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '2rem', fontSize: '0.85rem', color: '#888' }}>
                    {/* Footer content if needed */}
                </div>
            </nav>
            <main className="documentation-content">
                {children}
            </main>
        </div>
    );
};

export default DocumentationLayout;
