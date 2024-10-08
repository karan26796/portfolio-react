import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import StickyNavBar from './components/StickyNavBar';
import HeaderWithCarousel from './components/HeaderwithCarousel';
import ProjectCard from './components/ProjectCard';
import { projectSummaries } from './utils/ProjectSummaries';
import ImageCarousel from './components/ImageCarousel';
import CarouselContent from './components/CarouselContent';
import imagesData from './utils/communityFiles';
import About from './pages/About';
import Gallery from './pages/Gallery';
import TrainingList from './pages/TrainingList';

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
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route 
                  path="/project/:projectId" 
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <ProjectDetails />
                    </React.Suspense>
                  } 
                />
                <Route path="/about" element={<About/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/figma-training" element={<TrainingList/>}/>
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
      {/* <ImageCarousel imagesData={imagesData} ContentComponent={CarouselContent}/> */}
    </>
  );
};

export default App;