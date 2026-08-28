import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dock from "./components/Dock";
import HeaderWithCarousel from "./components/HeaderwithCarousel";
import ProjectList from "./pages/ProjectList";
import ProjectCard from "./components/ProjectCard";
import ProjectListSkeleton from "./components/ProjectListSkeleton";
import { useProjects } from "./utils/useProjects";
import Testimonials, { Testimonial } from "./components/Testimonials";
import ExploreFolder from "./components/ExploreFolder";
import FAQ from "./components/FAQ";
import AISummarizer from "./components/AISummarizer";
import { ScrollRevealDefaultsProvider } from "./components/ScrollRevealContext";
import Footer from "./components/Footer";
import RightSidebar from "./components/RightSidebar";
import ResumePopup from "./pages/ResumePopup";
import "./styles/AboutRedirect.scss";

import kritika from './utils/testimonials/pfp-02.jpg';
import malavika from './utils/testimonials/pfp-03.jpg';
import maryam from './utils/testimonials/maryam-img.jpeg';
import megha from './utils/testimonials/megha-pfp.jpeg';
import looppanelLogo from './utils/logos/looppanel-logo.svg';
import apheliaLogo from './utils/logos/aphelia.webp';
import datapeopleLogo from './utils/logos/datapeople.webp';
import { Analytics } from "@vercel/analytics/react";
import Archive from "./pages/Archive";
import usePageSEO from "./utils/usePageSEO";
import { useSectionAccent } from "./utils/useSectionAccent";

const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const About = React.lazy(() => import("./pages/About"));
// The gallery is now the canvas view. Gallery.tsx is kept as the source of the
// photo data (locations, aspect ratios, groupings) that GalleryCanvas imports,
// and can be routed back here if the canvas doesn't stick.
const GalleryCanvasPage = React.lazy(() => import("./pages/GalleryCanvas"));
const TrainingList = React.lazy(() => import("./pages/FigmaTraining"));
const Resume = React.lazy(() => import("./components/Resume"));
const ResumeStandalone = React.lazy(() => import("./pages/ResumeStandalone"));
const Overview = React.lazy(() => import("./pages/Overview"));
// Throwaway canvas spike — see src/pages/CanvasSpike.tsx.
const CanvasSpike = React.lazy(() => import("./pages/CanvasSpike"));

const App: React.FC = () => {
  useEffect(() => {
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Router>
      {window.location.hostname !== 'localhost' && <Analytics />}
      <Routes>
        <Route path="*" element={<AppShell />} />
      </Routes>
    </Router>
  );
};

const AppShell: React.FC = () => {
  const location = useLocation();
  // A case study opens as a full-screen overlay on top of the home page.
  // Rendering HomePage here — at a fixed position outside <Routes>, for both
  // /home and /project/:id — keeps it mounted while the overlay is open, so
  // closing a case study returns to the home page exactly as it was instead
  // of remounting it (which replayed the intro animations, re-showed the
  // loading skeleton and lost the scroll position).
  const isHomeOrProject =
    location.pathname === "/home" || location.pathname.startsWith("/project/");

  return (
    <div className="app-shell">
      <Dock />
      <div className="app-center">
        {isHomeOrProject && <HomePage />}
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            {/* HomePage is rendered above, outside <Routes>, so this route
                intentionally renders nothing of its own. */}
            <Route path="/home" element={null} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<GalleryCanvasPage />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/figma-training" element={<TrainingList />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume-view" element={<ResumeStandalone />} />
            <Route path="/resume-popup" element={<StandaloneResumePopup />} />
            <Route path="/resume-download" element={<ResumeDownloadRedirect />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/canvas-spike" element={<CanvasSpike />} />
          </Routes>
        </React.Suspense>
        <Footer />
      </div>
      <RightSidebar />
    </div>
  );
};

const HomePage: React.FC = () => {
  usePageSEO({
    title: "Karan Kapoor | Senior Product Designer & Figma Trainer",
    description: "Karan Kapoor is a Senior Product Designer & Figma Trainer with 8+ years experience leading design for products used by 2.2M+ people.",
    keywords: "Karan Kapoor, Product Designer, Figma Trainer, Design Systems, UX Designer, Keka HR, NID Ahmedabad",
    canonicalUrl: "https://kadankapoor.com/"
  });

  const { projects: projectSummaries, loading } = useProjects();
  const isProjectRoute = useLocation().pathname.startsWith("/project/");

  // The wash's colour per section, in scroll order. Projects supply their own
  // (see data-accent in ProjectList); these cover everything around them.
  const HERO_ACCENT = "rgba(48, 164, 108, 0.13)";
  const TESTIMONIALS_ACCENT = "rgba(0, 33, 54, 0.10)";
  const FAQ_ACCENT = "rgba(112, 0, 255, 0.07)";

  // Re-runs once the projects land, since their cards carry accents of their
  // own and don't exist on first paint.
  useSectionAccent(HERO_ACCENT, loading ? "loading" : projectSummaries.length);

  const testimonialsData: Testimonial[] = [
    {
      id: 5,
      name: "Maryam Jahanshahi",
      role: "Co-Founder",
      company: "Datapeople",
      companyLogoUrl: datapeopleLogo,
      avatarUrl: maryam,
      title: "Drives velocity, clarity, and team growth",
      testimonial: `Karan brought incredible velocity and systems thinking to our redesigns at Datapeople. He played a critical role in developing our design system, reducing decision fatigue and improving user experience. Karan works fast, thinks clearly, and incorporates feedback in real time...`,
      highlightedWords: ["velocity", "systems thinking", "critical role", "reducing decision fatigue", "incorporates feedback", "moves faster"]
    },
    {
      id: 1,
      name: "Kritika Oberoi",
      role: "Co-Founder",
      company: "Looppanel",
      companyLogoUrl: looppanelLogo,
      avatarUrl: kritika,
      title: "Elevated design quality and team confidence",
      testimonial: `Karan brought a high level of commitment and craft to our team. He worked fast and always incorporated feedback in real time. His clarity and confidence helped us move forward quickly...`,
      highlightedWords: ["commitment and craft", "incorporated feedback", "clarity and confidence", "lasting impact"]
    },
    {
      id: 2,
      name: "Megha Agarwal",
      role: "Worked together at",
      company: "Looppanel",
      companyLogoUrl: looppanelLogo,
      avatarUrl: megha,
      title: "Exceptional mentor and design system builder",
      testimonial: `Karan mentored and collaborated with me, always bringing clarity to complex problems. He established a comprehensive design system that kept our startup consistent and fast-moving. His enthusiasm and leadership inspired the team every day...`,
      highlightedWords: ["clarity to complex problems", "comprehensive design system", "enthusiasm and leadership", "invaluable asset"]
    },
    {
      id: 3,
      name: "Malavika Susan",
      role: "Worked together at",
      company: "Aphelia Innovations",
      companyLogoUrl: apheliaLogo,
      avatarUrl: malavika,
      title: "Blends technology, art, and process",
      testimonial: `Karan's approach to design standardization and planning set a strong foundation for our projects. He consistently brought the latest trends and techniques to the team. Karan's ability to combine technology with art is exceptional...`,
      highlightedWords: ["design standardization", "strong foundation", "latest trends and techniques", "combine technology with art"]
    }
  ];

  const faqData = [
    {
      question: "My design philosophy",
      answer: "I try to create designs that fit right into the user's daily context. Otherwise, we're just creating a solution for a problem that doesn't exist."
    },
    {
      question: "What AI tools do I use in my design process?",
      answer: "I use Figma make, Lovable, Claude or Google AI Studio to create initial prototypes. NotebookLM, Gemini, or ChatGPT for research; Antigravity or XCode for vibe coding, and Gamma for final presentations. "
    },
    {
      question: "My design process",
      answer: "The process evolves with each project, for bigger projects I like to be sure we're building the right thing by talking to customers, for smaller projects I like to jump into prototyping and iterate quickly."
    },
    {
      question: "Parts of the design process I enjoy the most",
      answer: "I love talking to customers, creating design centric roadmaps, and having a say in what gets built and how."
    }
  ];

  return (
    <ScrollRevealDefaultsProvider once={false}>
      <div className="home-main-content">
        <div data-accent={HERO_ACCENT}>
          <HeaderWithCarousel />
        </div>
        {loading ? (
          <ProjectListSkeleton />
        ) : (
          <ProjectList projectData={projectSummaries} cardComponent={ProjectCard} />
        )}
        <div data-accent={TESTIMONIALS_ACCENT}>
          <Testimonials data={testimonialsData} title="Testimonials" />
        </div>
        <div data-accent={FAQ_ACCENT}>
          <FAQ data={faqData} />
        </div>
        {/* <ExploreFolder /> */}
        {/* A case study mounts its own assistant, and this page stays mounted
            underneath it so closing one returns here intact. Both instances
            listen for `open-agent-vinod`, so leaving this one mounted would
            make a single dock click open two stacked chats. */}
        {!isProjectRoute && (
        <AISummarizer
          text="Karan Kapoor is a Senior Product Designer & Figma Trainer with 8+ years experience leading design for products used by 2.2M+ people."
          buttonLabel="Ask Agent Vinod"
          pageType="home"
          initialPrompts={[
            "What roles are you looking for?",
            "How do you handle disagreements with PMs?",
            "How do I contact you?"
          ]}
        />
        )}
      </div>
    </ScrollRevealDefaultsProvider>
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
