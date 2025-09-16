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
import Resume from "./components/Resume";
import ResumePopup from "./pages/ResumePopup";
import ResumeStandalone from "./pages/ResumeStandalone";

import Stories from 'react-insta-stories';

import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Archive from "./pages/Archive"
import { Analytics } from "@vercel/analytics/react";

import Testimonials, { Testimonial } from "./components/Testimonials";
import kritika from './utils/testimonials/pfp-02.jpg'
import malavika from './utils/testimonials/pfp-03.jpg'
import maryam from './utils/testimonials/maryam-img.jpeg'
import megha from './utils/testimonials/megha-pfp.jpeg'
import { Story } from "react-insta-stories/dist/interfaces";
import FAQ from "./components/FAQ";

const App: React.FC = () => {

  const myStories: Story[] = [
    {url: megha},
    { url: kritika },
    { url: maryam }
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
                <Route path="/resume" element={<Resume />} />
                <Route path="/resume-view" element={<ResumeStandalone />} />
                <Route path="/resume-popup" element={<StandaloneResumePopup />} />
                <Route path="/resume-download" element={<ResumeDownloadRedirect />} />
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
      id: 5,
      name: "Maryam Jahanshahi",
      role: "Co-Founder",
      company: "Managed at Datapeople",
      avatarUrl: maryam,
      title: "Drives velocity, clarity, and team growth",
      testimonial: `Karan brought incredible velocity and systems thinking to our redesigns at Datapeople. He played a critical role in developing our design system, reducing decision fatigue and improving user experience. Karan works fast, thinks clearly, and incorporates feedback in real time. Every team moves faster and with more confidence when Karan is involved.`,
      highlightedWords: ["velocity", "systems thinking", "critical role", "reducing decision fatigue", "incorporates feedback", "moves faster"]
    },
    {
      id: 1,
      name: "Kritika Oberoi",
      role: "Co-Founder",
      company: "Worked together at Looppanel",
      avatarUrl: kritika,
      title: "Elevated design quality and team confidence",
      testimonial: `Karan brought a high level of commitment and craft to our team. He worked fast and always incorporated feedback in real time. His clarity and confidence helped us move forward quickly. Karan's expertise in design systems and collaboration made a lasting impact on our work.`,
      highlightedWords: ["commitment and craft", "incorporated feedback", "clarity and confidence", "lasting impact"]
    },
    {
      id: 2,
      name: "Megha Agarwal",
      role: "Designer",
      company: "Worked together at Looppanel",
      avatarUrl: megha,
      title: "Exceptional mentor and design system builder",
      testimonial: `Karan mentored and collaborated with me, always bringing clarity to complex problems. He established a comprehensive design system that kept our startup consistent and fast-moving. His enthusiasm and leadership inspired the team every day. I am confident he would be an invaluable asset to any product team.`,
      highlightedWords: ["clarity to complex problems", "comprehensive design system", "enthusiasm and leadership", "invaluable asset"]
    },
    {
      id: 3,
      name: "Malavika Susan",
      role: "Designer",
      company: "Worked together at Aphelia Innovations",
      avatarUrl: malavika,
      title: "Blends technology, art, and process",
      testimonial: `Karan's approach to design standardization and planning set a strong foundation for our projects. He consistently brought the latest trends and techniques to the team. Karan's ability to combine technology with art is exceptional. I highly recommend working with him for any design challenge.`,
      highlightedWords: ["design standardization", "strong foundation", "latest trends and techniques", "combine technology with art"]
    }
  ];

  const faqData = [
    {
      question: "My design philosophy",
      answer: "I try to create designs that fit right into the user's daily context. Otherwise, we're just creating a solution for a problem that doesn't exist."
    },
    {
      question: "My design process",
      answer: (
        <>
          Since no two projects are the same, my design process is also similar. For smaller projects, I try to get everyone onboard, get a few iterations in quickly, get a stakeholder buy in and move ahead.<br />
          <br />
          With bigger projects, I like to talk to the users, understand what they want and then start designing.
        </>
      )
    },
    {
      question: "Parts of the design process I enjoy the most",
      answer: (
        <>I enjoy talking to customers, uncovering their needs and unmet expectations. 9/10 times when I'm on a user research call I am able to uncover something the user isn't saying. <br/><br/>I love diving deep into interaction patterns, information architecture, and usability testing.</>
      )
    }
  ];

  return (
    <>
      <HeaderWithCarousel />
      <ProjectList projectData={projectSummaries} cardComponent={ProjectCard} />
      <Testimonials
        data={testimonialsData}
        title="Testimonials"
      />
      <FAQ data={faqData} />
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

const StandaloneResumePopup: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div>
      <ResumePopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const ResumeDownloadRedirect: React.FC = () => {
  React.useEffect(() => {
    const link = document.createElement('a');
    link.href = '/resume-july-2025.pdf';
    link.download = 'Karan_Kapoor_Resume_July_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.location.replace('/resume');
  }, []);
  return null;
};
