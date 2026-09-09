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
import Experiments from "./components/Experiments";
import ResourceDeck from "./components/ResourceDeck";
import ExploreFolder from "./components/ExploreFolder";
import AgentPromptCard from "./components/AgentPromptCard";
import AISummarizer from "./components/AISummarizer";
import { ScrollRevealDefaultsProvider } from "./components/ScrollRevealContext";
import Footer from "./components/Footer";
import RightSidebar from "./components/RightSidebar";
import ResumePopup from "./pages/ResumePopup";
import "./styles/AboutRedirect.scss";
import "./styles/dottedBoard.scss";

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
import PortfolioLoader from "./components/PortfolioLoader";
const TrainingList = React.lazy(() => import("./pages/FigmaTraining"));
const Resume = React.lazy(() => import("./components/Resume"));
const ResumeStandalone = React.lazy(() => import("./pages/ResumeStandalone"));
const Overview = React.lazy(() => import("./pages/Overview"));
// Throwaway canvas spike — see src/pages/CanvasSpike.tsx.
const CanvasSpike = React.lazy(() => import("./pages/CanvasSpike"));

/**
 * Experiment: the photo canvas's dot grid as the ground under every page,
 * rather than a surface that two sections stand on.
 *
 * One switch. `true` puts `site-dot-grid` on the root element and the rules in
 * dottedBoard.scss do the rest — including telling the per-section boards to
 * stop drawing their own grid, since two 40px grids anchored differently read
 * as one blurred grid. `false` and the site is exactly as it was.
 *
 * Written to the root element rather than carried down through props because
 * every page's wrapper needs it and none of them are rendered from here.
 *
 * Tried and turned back off: under the hero the texture was the first thing
 * you saw rather than the name, and it flattened the difference between the
 * sections that are meant to read as a board and the sections that are just
 * page. The ground is back to being something two runs of sections stand on —
 * the combined experiments/community board and the training gallery — where it
 * fades in and out at the ends. The whole experiment is still here behind this
 * one flag if it is worth another look.
 */
const SITE_DOT_GRID = false;

const App: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("site-dot-grid", SITE_DOT_GRID);
    return () => root.classList.remove("site-dot-grid");
  }, []);

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

  // A case study mounts its own assistant, one that knows that project. This
  // one covers every other route. Both listen for `open-agent-vinod`, so
  // running them together would open two stacked chats on one click.
  const isProjectRoute = location.pathname.startsWith("/project/");
  const isTrainingRoute = location.pathname === "/figma-training";
  // The photo canvas gets no assistant at all — not the floating button here,
  // and not the tab in the dock either. It owns the whole viewport and has
  // nothing to say about the photographs.
  const isGalleryRoute = location.pathname === "/gallery";

  return (
    <div className="app-shell">
      {/* Over everything, and its own decision whether to appear at all — it
          shows once a session and leaves as soon as the page is ready. */}
      <PortfolioLoader />
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
      {/* Outside .app-center on purpose: that column's stacking context would
          trap the chat's z-index beneath the dock. */}
      {!isProjectRoute &&
        !isGalleryRoute &&
        (isTrainingRoute ? (
          // The training page has its own audience and its own questions. The
          // context below is what the assistant answers from, so it carries the
          // facts the page already states rather than the portfolio pitch.
          <AISummarizer
            text="Karan Kapoor runs hands-on Figma training and corporate design workshops. Over the last 5 years he has taught Figma to more than 10,000 people — beginners through to working professionals — across organisations and institutions in India and the US, including IIM Ahmedabad, IIM Sambalpur, IIT Madras, Indiana University, FLAME University and Zuddl. Sessions have covered Auto Layout, design systems, prototyping, design tokens, and design-to-development with AI, for audiences ranging from design teams to product managers to students. He also led the Figma community in Delhi (Friends of Figma, Delhi) for 5 years, running 20+ workshops and events for over 5,000 designers, including hosting Figma Config '24 at IIT Delhi."
            buttonLabel="Ask Agent Vinod"
            pageType="training"
            initialPrompts={[
              "What do you cover in a Figma workshop?",
              "Who are these sessions for?",
              "Can you run a session for my team?"
            ]}
          />
        ) : (
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
        ))}
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

  // The wash's colour per section, in scroll order. Projects supply their own
  // (see data-accent in ProjectList); these cover everything around them.
  const HERO_ACCENT = "rgba(48, 164, 108, 0.13)";
  const EXPERIMENTS_ACCENT = "rgba(255, 138, 0, 0.09)";
  // Between the experiments' orange and the testimonials' navy, so the page's
  // wash keeps moving through the scroll rather than repeating a neighbour.
  const RESOURCES_ACCENT = "rgba(0, 128, 128, 0.09)";
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
      answer: "I create designs that fit right into the user's daily context. Otherwise, we're just creating a solution for a problem that doesn't exist."
    },
    {
      question: "What AI tools do I use in my design process?",
      answer: "I use Figma make, Lovable, Claude or Google AI Studio to create initial prototypes. NotebookLM, Gemini, or ChatGPT for research; Antigravity or XCode for vibe coding, and Gamma for final presentations. "
    },
    {
      question: "My design process",
      answer: "My process evolves with each project, for bigger projects I like to be sure we're building the right thing by talking to customers, for smaller projects I like to jump into prototyping and iterate quickly."
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
        {/* One board under both. The experiments and the Figma community
            files are the same kind of thing — work put out to be looked at,
            arranged rather than listed — and they used to be separated by the
            resource deck's own slab, which read as two unrelated sections that
            happened to be adjacent. Standing them on one dotted ground, with
            the dots fading in at the top and out at the bottom, makes the pair
            one surface.

            The two inner wrappers keep their own `data-accent`: the board is a
            ground, not a section, and the page's wash should still change as
            you move from one half of it to the other. useSectionAccent finds
            them by a document-wide query, so nesting them changes nothing. */}
        <div className="dotted-board">
          <div data-accent={EXPERIMENTS_ACCENT} className="home-experiments-section">
            <Experiments layout="grid" title="" />
          </div>
          <div data-accent={RESOURCES_ACCENT}>
            <ResourceDeck />
          </div>
        </div>
        <div data-accent={TESTIMONIALS_ACCENT}>
          <Testimonials data={testimonialsData} title="Testimonials" />
        </div>
        <div data-accent={FAQ_ACCENT}>
          {/* This replaces the FAQ accordion that used to close the page. The
              accordion made you open four panels to read four sentences, and
              this says the same thing outright — faqData is still its source,
              so the answers cannot drift apart from what was written.

              Each pill reads as Karan's own shorthand but sends the phrasing
              the knowledge base actually answers, so a short label can never
              land the assistant on a guess. */}
          <AgentPromptCard
            faqs={faqData}
            questions={[
              {
                label: "My experience with design systems",
                ask: "What's your experience with design systems?",
              },
              // { label: "My design process", ask: "What does your design process look like?" },
              {
                label: "How I handle disagreements with PMs",
                ask: "How do you handle disagreements with PMs?",
              },
              { label: "Roles I'm looking for", ask: "What roles are you looking for?" },
              // { label: "Tools I use", ask: "Which tools do you use day to day?" },
              // { label: "How to contact me?", ask: "How do I contact you?" },
            ]}
          />
        </div>
        {/* <ExploreFolder /> */}
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
