import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/ProjectList'; // Component for listing project summaries
import ProjectDetails from './pages/ProjectDetails'; // Component for showing details of a selected project
import StickyNavBar from './components/StickyNavBar'; // Your StickyNavBar component
import HeaderWithCarousel from './components/HeaderwithCarousel';
import ProjectCard from './components/ProjectCard';
import { projectSummaries } from './utils/ProjectSummaries';
import ImageCarousel from './components/ImageCarousel';
import CarouselContent from './components/CarouselContent';
import imagesData from './utils/communityFiles'; // Ensure this is the correct path to your data
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <StickyNavBar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/about" element={<About/>}/>
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
      {/* <ImageCarousel imagesData={imagesData} ContentComponent={CarouselContent}/> */}
    </>
  );
};

export default App;
