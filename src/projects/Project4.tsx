import React from "react";
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

const Project4: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h2>Quick Summary</h2>
        <p>
          The Atomic Design principle uses the concept of atoms and molecules to
          set up a Design Language System. Having worked on maintaining and
          creating design systems, I created one for Nimbuzz Kurakaani, Nepal's
          Super App, as a part of their application redesign.
        </p>

        <h2>Project Description</h2>
        <p>
          Nimbuzz Kurakaani is Nepal's digital platform that houses multiple
          services like shopping, chat, quizzing, money transfer & much more in
          one app.
        </p>
        <p>
          I was commissioned as a UI Designer to Redesign the app by creating a
          component-based system.
        </p>

        <h2>Goals of the redesign</h2>
        <ul>
          <li>
            Update the design language to have a modern and cheerful vibe for a
            younger audience
          </li>
          <li>Create a system that is scalable and easy to maintain</li>
          <li>
            Inculcate different platform guidelines to improve the designs
          </li>
        </ul>
      </section>

      <section>
        <h2>Old Designs</h2>
      </section>

      <figure>
        <img src={img01} alt="Old Design of the connect and quiz screens" />
        <figcaption>Old Design of the connect and quiz screens</figcaption>
      </figure>
      <figure>
        <img src={img02} alt="Old Design of the courses and shop screens" />
        <figcaption>Old Design of the courses and shop screens</figcaption>
      </figure>

      <section>
        <h2>My Approach</h2>
        <h4>
          Having worked on multiple projects where I've used a component
          library, I started with an Atomic Design approach to creating a
          component library.
        </h4>
      </section>

      <figure>
        <img
          src={img03}
          alt="Naming the components in the file system format"
        />
        <figcaption>Naming the components in the file system format</figcaption>
      </figure>
      <figure>
        <img src={imgDs} alt="Snippet of the design system for the project" />
        <figcaption>Snippet of the design system for the project</figcaption>
      </figure>

      <section>
        <h2>Revamp of the connect feature</h2>
        <h4>
          Updated the connect screens of the app to feel more human and
          cheerful.
        </h4>
      </section>

        <figure>
          <img src={img04} alt="Redesign of connect/sending request screen" />
          <caption>Redesign of connect/sending request screen</caption>
        </figure>
        <figure>
          <img src={img05} alt="New design of a person's profile" />
          <figcaption>New design of a person's profile</figcaption>
        </figure>

      <section>
        <h2>Revamp of the shop section</h2>
        <h4>
          Made the design feel more modern in tune with the latest e-commerce
          apps.
        </h4>
      </section>

        <figure>
          <img src={img06} alt="Redesign of the shopping landing page" />
          <figcaption>Redesign of the shopping landing page</figcaption>
        </figure>
        <figure>
          <img src={img07} alt="Redesign of the product detail page" />
          <figcaption>Redesign of the product detail page</figcaption>
        </figure>

      <section>
        <h2>Revamp of the learn section</h2>
        <h4>Updated the screens to look and feel more like online courses.</h4>
      </section>

        <figure>
          <img src={img08} alt="Redesign of the courses listing page" />
          <figcaption>Redesign of the courses listing page</figcaption>
        </figure>
        <figure>
          <img src={img09} alt="Redesign of the course description page" />
          <figcaption>Redesign of the course description page</figcaption>
        </figure>

      <section>
        <h2>Revamp of the payment screen</h2>
        <h4>
          Updated the icons to feel more vibrant and match the design system.
        </h4>
      </section>

        <figure>
          <img src={img10} alt="Redesign of the payment screen" />
          <figcaption>Redesign of the payment screen</figcaption>
        </figure>

      <section>
        <h2>Revamp of the quiz section</h2>
        <h4>
          Updated the quizzing screens to look like an online gaming app/show.
        </h4>
      </section>


        <figure>
          <img src={img11} alt="Redesign of the quiz screens" />
          <figcaption>Redesign of the quiz screens</figcaption>
        </figure>

      <section>
        <h2>Creation of the chat section</h2>
        <h4>
          Chat section was imagined from scratch keeping in mind what platforms
          people use on a daily basis.
        </h4>
      </section>

        <figure>
          <img src={img12} alt="Redesign of the chat screens" />
          <figcaption>Redesign of the chat screens</figcaption>
        </figure>

      <section>
        <h2>Outcome of the project</h2>
        <ul>
          <li>
            With the creation of a design library, the time to design flows and
            screens reduced by ~60%
          </li>
          <li>
            The hand-off process got easier as the components were defined in
            one place and developers could pick the specs from there.
          </li>
          <li>
            The flows in the application were more refined and clear compared to
            the earlier version. This meant easy communication across teams.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Project4;
