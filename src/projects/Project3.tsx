import React from "react";
import '../styles/ProjectDetails.scss';
import img01 from "../utils/project-imgs/kurakaani/01.webp";
import img02 from "../utils/project-imgs/kurakaani/02.webp";
import img03 from "../utils/project-imgs/kurakaani/03.webp";
import imgDs from "../utils/project-imgs/kurakaani/ds.webp";
import img04 from "../utils/project-imgs/kurakaani/04.webp";
import img05 from "../utils/project-imgs/kurakaani/05.webp";
import img06 from "../utils/project-imgs/kurakaani/06.webp";
import img07 from "../utils/project-imgs/kurakaani/07.webp";
import img08 from "../utils/project-imgs/kurakaani/08.webp";
import img09 from "../utils/project-imgs/kurakaani/09.webp";
import img10 from "../utils/project-imgs/kurakaani/10.webp";
import img11 from "../utils/project-imgs/kurakaani/11.webp";
import img12 from "../utils/project-imgs/kurakaani/12.webp";


const Project3: React.FC = () => (
  <div className="project-details">
    <section>
      <h3>The Business Case</h3>
      <h4>
        Nimbuzz Kurakaani, Nepal’s Super App, houses diverse services from e-commerce to gaming. The challenge was a fragmented user experience and high engineering effort for every new feature.
      </h4>
      <p>
        I was commissioned to redesign the platform by architecting a scalable, component-based Design Language System from the ground up.
      </p>
    </section>

    <figure>
      <img src={img01} alt="Old Design of the connect and quiz screens" />
      <figcaption>Baseline: Fragmented UX in the legacy connect and quiz interfaces.</figcaption>
    </figure>

    <figure>
      <img src={img02} alt="Old Design of the courses and shop screens" />
      <figcaption>Baseline: Outdated design language in the learn and shopping sections.</figcaption>
    </figure>

    <section>
      <h3>The Strategy: Atomic Design for Scale</h3>
      <h4>
        I leveraged Atomic Design principles to build a modular library that ensured consistency across disparate features like shopping, chat, and fintech.
      </h4>
    </section>

    <figure>
      <img src={imgDs} alt="Snippet of the design system for the project" />
      <figcaption>Foundations: Building a scalable library of atoms and molecules.</figcaption>
    </figure>

    <section>
      <h3>Naming & Hierarchy</h3>
      <p>
        Components were structured with a developers-first mindset, using clear file-system conventions to streamline the handoff process.
      </p>
    </section>

    <figure>
      <img src={img03} alt="Naming the components in the file system format" />
      <figcaption>Handoff Strategy: Aligning design tokens with engineering workflows.</figcaption>
    </figure>

    <section>
      <h3>Reframing the Experience: Connect & Social</h3>
      <h4>
        We updated the connect screens of the app to feel more human and cheerful, transforming transactional profile views into engaging interaction patterns.
      </h4>
    </section>

    <figure>
      <img src={img04} alt="Redesign of connect/sending request screen" />
      <figcaption>Iteration: A more human-centric approach to social interactions.</figcaption>
    </figure>

    <figure>
      <img src={img05} alt="New design of a person's profile" />
      <figcaption>Execution: High-fidelity profile patterns.</figcaption>
    </figure>

    <section>
      <h3>Modernizing Global Commerce</h3>
      <h4>
        The shop and learn sections were overhauled to match global e-commerce benchmarks, ensuring a premium feel.
      </h4>
    </section>

    <figure>
      <img src={img06} alt="Redesign of the shopping landing page" />
      <figcaption>Execution: High-fidelity components in action across shopping views.</figcaption>
    </figure>

    <figure>
      <img src={img07} alt="Redesign of the product detail page" />
      <figcaption>Execution: Consistent design language applied to product details.</figcaption>
    </figure>

    <section>
      <h3>Revitalizing the Learn Section</h3>
      <h4>
        Updated the screens to look and feel more like modern online course platforms.
      </h4>
    </section>

    <figure>
      <img src={img08} alt="Redesign of the courses listing page" />
      <figcaption>Execution: Modern course listing patterns.</figcaption>
    </figure>

    <figure>
      <img src={img09} alt="Redesign of the course description page" />
      <figcaption>Execution: Information architecture optimized for learning.</figcaption>
    </figure>

    <section>
      <h3>Vibrant Payment & Utility Systems</h3>
      <h4>
        Updated icons and interactions to feel more vibrant and match the new design system.
      </h4>
    </section>

    <figure>
      <img src={img10} alt="Redesign of the payment screen" />
      <figcaption>Execution: Cohesive icon system in the payment interface.</figcaption>
    </figure>

    <section>
      <h3>Gamifying the Quiz Experience</h3>
      <h4>
        Updated the quizzing screens to look and feel like an engaging online gaming show.
      </h4>
    </section>

    <figure>
      <img src={img11} alt="Redesign of quiz interface" />
      <figcaption>Execution: Dynamic and engaging patterns for quizzing.</figcaption>
    </figure>

    <figure>
      <img src={img12} alt="Quiz results and interactions" />
      <figcaption>Execution: Gamified feedback loops.</figcaption>
    </figure>

    <section>
      <h2 className="results-title">📈 Results & Key Learnings</h2>
      <ul>
        <li><strong>60% Velocity Increase</strong>: Screen design and handoff time dropped significantly as teams reused pre-defined specs.</li>
        <li><strong>Humanizing the Super App</strong>: The modern design language led to higher engagement among younger demographics in the Nepal region.</li>
        <li><strong>Engineering Alignment</strong>: The component-based approach reduced rework and clarified communication between design and dev teams.</li>
      </ul>
    </section>
  </div>
);

export default Project3;
