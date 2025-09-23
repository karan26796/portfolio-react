import React from "react";
import wish01 from "../utils/project-imgs/kekawish/currentFlow.webp";
import wish03 from "../utils/project-imgs/kekawish/cardIterations.webp";
import wish04 from "../utils/project-imgs/kekawish/wallOfWishes.webp";
import wishcard from "../utils/project-imgs/kekawish/Wish cards.webp";
import widget from "../utils/project-imgs/kekawish/Widget.webp";
import finaldesign from "../utils/project-imgs/kekawish/FinaldesignGIF.gif";
import dataTrack from "../utils/project-imgs/kekawish/dataTrack.png";
import currentFlow from "../utils/project-imgs/kekawish/wishesOnWall.webp";
const wishDemoVideo = process.env.PUBLIC_URL + "/currentWish.mp4";

const KekaWishes: React.FC = () => {

  return (
    <div className="project-details">

      <section>

        <h6>The Problem</h6>
        <h3> Falling Engagement on the Wall</h3>
        <p>
          Engagement on Keka wall was dropping — wishes, praise, and even posts were
          being used less. Since wishes occupied a prominent space, we decided to
          use them as the anchor to revive overall engagement.
        </p>

        <h4>
         ❌ Issues with the current widget:
        </h4>
        <ul>
          <li>Unclear entry point to post a wish</li>
          <li>Same experience for the wisher and receiver</li>
          <li>No way to follow up on wishes post the special day</li>
        </ul>
      </section>

      <figure>
        <img src={currentFlow} alt="Wish widget on Keka wall" />
        <figcaption>Screenshot of the old birthday feature with low engagement</figcaption>
      </figure>

      <section>
        <h6>Interaction design</h6>
        <h3>🤔 Unclear & Transactional Experience</h3>
        <p>
          The existing wish flow wasn’t intuitive. Employees weren’t sure how to
          send a wish, and for receivers, the experience felt transactional
          rather than personal.
        </p>
      </section>

      <figure>
        <video
          src={wishDemoVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
        <figcaption>Video demo showing the wish flow in action</figcaption>
      </figure>

      <figure>
        <img src={wish01} alt="Current wish experience" />
        <figcaption>Screenshot of the old wish feature with low engagement</figcaption>
      </figure>

      <section>
        <h6>First Experiment</h6>
        <h3>🟡 Bigger Cards, Prominent Faces</h3>
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
        <h6>Second Experiment</h6>
        <h3>🟡 A Dedicated Wall of Wishes</h3>
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
        <h6>The Breakthrough</h6>
        <h3>💡 A Clear Wish CTA</h3>
        <p>
          Instead of overcomplicating, we added a simple, clear <b>Wish CTA</b>{" "}
          below every name. This created a frictionless entry point for sending
          wishes, without hiding anyone else.
        </p>
        <blockquote>
          “The CTA was a common thread in all the previous iterations.”
        </blockquote>
      </section>

      <figure>
        <img src={widget} alt="Final widget" />
        <figcaption>Final widget: Clear Wish CTA and improved interaction flow</figcaption>
      </figure>

      <section>
        <h2>🥳 Making the Day Feel Special</h2>
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
        <h2>🎉 Delight Through Micro-Interactions</h2>
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
        <h2>📈 Impact: 3x Adoption, 5x Engagement</h2>
        <ul>
          <li>Average wishes per employee jumped from <b>2 to 8</b>.</li>
          <li>Adoption grew <b>3x</b> from 5k to 15k users a week.</li>
          <li>
            Engagement improved <b>5x</b>, with 31k employees sending wishes to
            116k colleagues.
          </li>
          <li>
            Other features on the wall, like posts and praise, also saw a boost in
            usage.
          </li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Data results" />
        <figcaption>Data jump since launch</figcaption>
      </figure>

      <section>
        <h2> 🗝️ Key Learnings</h2>
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
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;
