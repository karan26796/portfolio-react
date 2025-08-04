import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import StickyNavBar from "./components/StickyNavBar";
import HeaderWithCarousel from "./components/HeaderwithCarousel";
import ProjectCard from "./components/ProjectCard";
import { projectSummaries } from "./utils/ProjectSummaries";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import TrainingList from "./pages/FigmaTraining";
import "./styles/AboutRedirect.scss";

import Stories from 'react-insta-stories';

import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Archive from "./pages/Archive"
import { Analytics } from "@vercel/analytics/react";

import Testimonials, { Testimonial } from "./components/Testimonials";
import kritika from './utils/testimonials/pfp-02.jpg'
import malavika from './utils/testimonials/pfp-03.jpg'
import nitin from './utils/testimonials/pfp-04.jpg'
import megha from './utils/testimonials/megha-pfp.jpeg'
import { Story } from "react-insta-stories/dist/interfaces";

const App: React.FC = () => {

  const myStories: Story[] = [
    {url: megha},
    { url: kritika },
    { url: nitin }
  ]

  useEffect(() => {
    // Prevent default scroll behavior on hash change
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Prevent initial scroll on page load
    if (window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Router>
      <Analytics />
      <Routes>
        <Route
          path="*"
          element={
            <>
              <StickyNavBar />
              {/* <Stories
                stories={myStories}
                defaultInterval={5000}
                width={"var(--max-width-container)"}
                height={"50vh"}
                loop={true}
              /> */}
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
                <Route path="/archive" element={<Archive />} />
                <Route path="/figma-training" element={<TrainingList />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

const HomePage: React.FC = () => {

  const testimonialsData: Testimonial[] = [
    {
      "id": 1,
      "name": "Kritika Oberoi",
      "role": "Co-Founder",
      "company": "Worked together at Looppanel",
      "avatarUrl": kritika,
      "testimonial": "Karan was a dedicated employee who gave his work his all. He excelled in design iteration and effectively conducted user research.",
      "highlightedWords": ["excelled in design iteration", "effectively conducted user research"] // Words to highlight
    },
    {
      "id": 2,
      "name": "Megha Agarwal",
      "role": "Designer",
      "company": "Worked together at Looppanel",
      "avatarUrl": megha,
      "testimonial": "Karan is an exceptional designer who brings clarity to highly ambiguous problems. He established a comprehensive design system that maintained consistency in our fast-moving startup.",
      "highlightedWords": ["brings clarity to highly ambiguous problems", "established a comprehensive design system"] // Words to highlight
    },
    {
      "id": 3,
      "name": "Malavika Susan",
      "role": "Designer",
      "company": "Worked together at Aphelia Innovations",
      "avatarUrl": malavika,
      "testimonial": "Karan is exceptional at combining technology with art through meticulous planning. His emphasis on design standardization created a strong foundation for all our projects.",
      "highlightedWords": ["meticulous planning", "design standardization"]
    },
    {
      "id": 4,
      "name": "Nitin Prakash",
      "role": "Android Developer",
      "company": "Worked together at Guesthouser",
      "avatarUrl": nitin,
      "testimonial": "Karan is an outstanding product designer with valuable development skills. He can solve complex problems easily and has superb UI/UX capabilities.",
      "highlightedWords": ["valuable development skills", "solve complex problems easily"] // Words to highlight
    }
  ]

  return (
    <>
      <HeaderWithCarousel />
      <ProjectList projectData={projectSummaries} cardComponent={ProjectCard} />
      <Testimonials
        data={testimonialsData}
        title="What people have said about me" />
      {/* <ContactForm /> */}
    </>
  );
};

const AboutLink: React.FC = () => {
  return (
    <div className="about-redirect">
      <div></div>
    </div>
  );
};

export default App;
