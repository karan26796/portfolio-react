import React from 'react';
import '../styles/Documentation.scss';


interface DocumentationLayoutProps {
    children: React.ReactNode;
}

const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({ children }) => {

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
                    <button type="button" className="nav-link active">Overview</button>
                    <button type="button" className="nav-link">Install</button>
                    <button type="button" className="nav-link">Features</button>
                    <button type="button" className="nav-link">Output</button>
                    <button type="button" className="nav-link">API <span className="badge-new">NEW</span></button>
                    <button type="button" className="nav-link">Changelog</button>
                    <button type="button" className="nav-link">FAQ</button>
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
