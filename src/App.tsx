import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import StickyNavBar from './components/StickyNavBar';
import HeaderWithCarousel from './components/HeaderwithCarousel';
import ProjectCard from './components/ProjectCard';
import { projectSummaries } from './utils/ProjectSummaries';
import About from './pages/About';
import Gallery from './pages/Gallery';
import TrainingList from './pages/TrainingList';

import './styles/AboutRedirect.scss'
import Testimonials from './components/Testimonials';
import LogoCarousel from './components/LogoCarousel';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <StickyNavBar />
              <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/project/:projectId"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <ProjectDetails />
                    </React.Suspense>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/figma-training" element={<TrainingList />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <HeaderWithCarousel />
      <ProjectList projectData={projectSummaries} cardComponent={ProjectCard} />
      <Testimonials/>
    </>
  );
};

const AboutLink: React.FC = () => {
  return (
    <div className='about-redirect'>
      <div></div>
    </div>
  );
}

export default App;