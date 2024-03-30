import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/ProjectList'; // Component for listing project summaries
import ProjectDetails from './pages/ProjectDetails'; // Component for showing details of a selected project
import StickyNavBar from './components/StickyNavBar'; // Your StickyNavBar component
import HeaderWithCarousel from './components/HeaderwithCarousel';
import ProjectCard from './components/ProjectCard';
import { projectSummaries } from './utils/ProjectSummaries';
import ImageCarousel from './components/ImageCarousel';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ backgroundImage: 'url(./assets/mesh.png)', objectFit: 'cover' }}>
        <StickyNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <HeaderWithCarousel />
      <ProjectList projectData={projectSummaries} cardComponent={ProjectCard} />
      <ImageCarousel/>
    </>
  );
};

export default App;
