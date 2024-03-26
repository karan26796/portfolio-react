import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/ProjectList'; // Component for listing project summaries
import ProjectDetails from './pages/ProjectDetails'; // Component for showing details of a selected project
import StickyNavBar from './components/StickyNavBar'; // Your StickyNavBar component
import HeaderWithCarousel from './components/HeaderwithCarousel';

const App: React.FC = () => {
  return (
    <body style={{backgroundImage:'./assets/mesh.png', objectFit:'cover'}}>
    <Router>
      <HeaderWithCarousel/>
      <StickyNavBar />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
    </body>
  );
};

export default App;
