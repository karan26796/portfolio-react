import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/ProjectList'; // Component for listing project summaries
import ProjectDetails from './pages/ProjectDetails'; // Component for showing details of a selected project
import StickyNavBar from './components/StickyNavBar'; // Your StickyNavBar component

const App: React.FC = () => {
  return (
    <Router>
      <StickyNavBar />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
