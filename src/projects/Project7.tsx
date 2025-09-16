import React from "react";
import wish01 from "../utils/project-imgs/kekawish/currentFlow.webp";
import wish02 from "../utils/project-imgs/kekawish/Wish -_ 04.png";
import wish03 from "../utils/project-imgs/kekawish/cardIterations.webp";
import wish04 from "../utils/project-imgs/kekawish/wallOfWishes.webp";
import wish05 from "../utils/project-imgs/kekawish/Wish -_ 01.webp";
import wishcard from "../utils/project-imgs/kekawish/Wish cards.webp";
import widget from "../utils/project-imgs/kekawish/Widget.webp";
import gif from "../utils/project-imgs/kekawish/Wish-Interaction-Old.gif";
import finaldesign from "../utils/project-imgs/kekawish/FinaldesignGIF.gif";
import dataTrack from "../utils/project-imgs/kekawish/dataTrack.png";

const KekaWishes: React.FC = () => {
  return (
    <div className="project-details">

      <section>

        <h2>Falling Engagement on the Wall</h2>
        <p>
          Engagement on the wall was dropping—wishes, praise, and even posts were
          being used less. Since wishes occupied a prominent space, we decided to
          use them as the anchor to revive overall engagement.
        </p>
      </section>


      <figure>
        <img src={wish01} alt="Current birthday experience" />
        <figcaption>Screenshot of the old birthday feature with low engagement</figcaption>
      </figure>

      <section>
        <h2>Unclear & Transactional Experience</h2>
        <p>
          The existing wish flow wasn’t intuitive. Employees weren’t sure how to
          send a wish, and for receivers, the experience felt transactional
          rather than personal.
        </p>
      </section>

      <figure>
        <img src={gif} alt="Unengaging wish interaction" />
        <figcaption>Animated example showing unclear and unengaging wish flow</figcaption>
      </figure>

      <section>
        <h2>First Experiment: Bigger Cards, Prominent Faces</h2>
        <p>
          We tried highlighting employees by enlarging their card and photo. While
          it improved discoverability, it caused two issues:
        </p>
        <ol>
          <li>If one person’s card became bigger, others had to be hidden.</li>
          <li>
            Many employees didn’t have profile pictures, so the design often
            looked empty.
          </li>
        </ol>
        <blockquote>
          “Bigger isn’t always better—visibility for one shouldn’t come at the
          cost of others.”
        </blockquote>
      </section>

      <figure>
        <img src={wish03} alt="Large special day card iteration" />
        <figcaption>Design iteration: Large special day card on the wall</figcaption>
      </figure>

      <section>
        <h2>Second Experiment: A Dedicated Wall of Wishes</h2>
        <p>
          We also explored giving each employee their own dedicated “wall of
          wishes.” It looked special but disconnected the experience from the
          main wall widget. 
          <br/><br/>
          The board could look empty if someone's birthday fell on a weekend.
        </p>
      </section>

      <figure>
        <img src={wish04} alt="Dedicated wall of wishes" />
        <figcaption>Design iteration: Dedicated wall of wishes</figcaption>
      </figure>

      <section>
        <h2>The Breakthrough: A Clear Wish CTA</h2>
        <p>
          Instead of overcomplicating, we added a simple, clear <b>Wish CTA</b>{" "}
          below every name. This created a frictionless entry point for sending
          wishes, without hiding anyone else.
        </p>
        <blockquote>
          “Sometimes the simplest solution drives the biggest impact.”
        </blockquote>
      </section>

      <figure>
        <img src={widget} alt="Final widget" />
        <figcaption>Final widget: Clear Wish CTA and improved interaction flow</figcaption>
      </figure>

      <section>
        <h2>Making the Day Feel Special</h2>
        <p>
          For employees on their special day, we added a <b>banner</b> that
          aggregated all wishes into a single, visually appealing card. This:
        </p>
        <ul>
          <li>Allowed employees to revisit wishes even days later.</li>
          <li>Made the experience feel more personal and celebratory.</li>
        </ul>
      </section>

      <figure>
        <img src={wishcard} alt="Final wish card design" />
        <figcaption>Final design: Personalized birthday card on the profile wall</figcaption>
      </figure>


      <section>
        <h2>Delight Through Micro-Interactions</h2>
        <p>
          To make wishes more fun, we added a simple confetti animation when
          someone posted a wish. This small delight reinforced the feeling of
          celebration.
        </p>
      </section>

      <figure>
        <img src={finaldesign} alt="Wish interaction with confetti" />
        <figcaption>Final interaction: Example of a wish sent to a colleague</figcaption>
      </figure>

      <section>
        <h2>Impact: 3x Adoption, 5x Engagement</h2>
        <ul>
          <li>Average wishes per employee jumped from <b>2 to 8</b>.</li>
          <li>Adoption grew <b>3x</b> from 5k to 15k users a week.</li>
          <li>
            Engagement improved <b>5x</b>, with 31k employees sending wishes to
            116k colleagues.
          </li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Data results" />
        <figcaption>Data jump since launch</figcaption>
      </figure>

      <section>
        <h2>Key Learnings</h2>
        <ol>
          <li>
            <strong>Simple is powerful</strong> — A clear CTA drove massive
            improvement.
          </li>
          <li>
            <strong>Personalization matters</strong> — Banners and cards made
            employees feel truly celebrated.
          </li>
          <li>
            <strong>Iterative design wins</strong> — Each experiment taught us
            what to drop and what to keep.
          </li>
          <li>
            <strong>Context is everything</strong> — Wishes worked best when tied
            directly to employee profiles.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;
