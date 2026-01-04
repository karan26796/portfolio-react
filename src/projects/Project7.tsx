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

        <h3>🎯 The Challenge: Revitalizing Platform Engagement</h3>
        <h4>
          To help bring people back to the platform, we used birthday "wishes" to breathe new life into our social feed.
        </h4>

        <h4>Operational Friction:</h4>
        <ul>
          <li><strong>Unclear Entry Points</strong>: High cognitive load to initiate a social interaction.</li>
          <li><strong>Generic Experiences</strong>: Lack of differentiation between wisher and receiver mental models.</li>
          <li><strong>Missed Opportunities</strong>: No mechanism for post-celebration engagement or social proof.</li>
        </ul>
      </section>

      <figure>
        <img src={currentFlow} alt="Wish widget on Keka wall" />
        <figcaption>Screenshot of the old birthday feature with low engagement</figcaption>
      </figure>

      <section>
        <h3>🔍 Solving the problem: Friction in the Social Feed</h3>
        <p>
          We wanted to move from a transactional interface that felt like a chore to a personal experience designed to sustain long-term social delight.
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
        <h3>🟡 Iteration I: Oversized cards</h3>
        <p>
          We first experimented with oversized cards to drive adoption, but quickly realized they compromised wall scalability and excluded others.
        </p>
        <blockquote>
          “Visibility must be balanced—one person’s spotlight shouldn't hide everyone else.”
        </blockquote>
      </section>

      <figure>
        <img src={wish03} alt="Large special day card iteration" />
        <figcaption>Design iteration: Large special day card on the wall</figcaption>
      </figure>

      <section>
        <h3>🟡 Iteration II: Individual walls</h3>
        <p>
          Next, we explored dedicated individual "walls," but found they felt disconnected from the main widget and fragmented user attention.
        </p>
      </section>

      <figure>
        <img src={wish04} alt="Dedicated wall of wishes" />
        <figcaption>Design iteration: Dedicated wall of wishes</figcaption>
      </figure>

      <section>
        <h3>💡 Final Solution: A Simple Wish Button</h3>
        <p>
          The best solution was also the simplest. We added a "Wish" button directly below every name, making it incredibly easy for anyone to send a birthday greeting without any friction.
        </p>
        <blockquote>
          “Making the action clear and visible was all we needed.”
        </blockquote>
      </section>

      <figure>
        <img src={widget} alt="Final widget" />
        <figcaption>Final widget: Clear Wish CTA and improved interaction flow</figcaption>
      </figure>

      <section>
        <h3>🥳 Celebrating the Day: Digital Birthday Cards</h3>
        <p>
          We collected all the wishes into a single, beautiful card. Instead of just seeing separate messages, employees could see and feel all the appreciation from their team in one place.
        </p>
      </section>

      <figure>
        <img src={wishcard} alt="Final wish card design" />
        <figcaption>Final design: Personalized birthday card on the profile wall</figcaption>
      </figure>


      <section>
        <h3>🎉 Adding a bit of fun: Confetti!</h3>
        <p>
          To make the moment feel more special, we added a small confetti animation whenever a wish was sent. It was a simple way to bring a bit of joy to a digital interaction.
        </p>
      </section>

      <figure>
        <img src={finaldesign} alt="Wish interaction with confetti" />
        <figcaption>Final interaction: Example of a wish sent to a colleague</figcaption>
      </figure>

      <section>
        <h2 className="results-title">📈 Results: More connection, more engagement</h2>
        <ul>
          <li><strong>More wishes</strong>: The average number of wishes per employee jumped from 2 to 8.</li>
          <li><strong>Usage growth</strong>: Weekly active users for the feature grew 3x (from 5k to 15k).</li>
          <li><strong>Record interaction</strong>: Engagement shot up 5x, with 31k employees sending wishes to over 116k colleagues.</li>
          <li><strong>Platform-wide boost</strong>: The extra activity also encouraged people to use other social features like Praise and Posts.</li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Data results" />
        <figcaption>Measuring Impact: Analyzing the engagement lift post-launch.</figcaption>
      </figure>

      <section>
        <h2 className="results-title">🗝️ Key Learnings</h2>
        <ol>
          <li>
            <strong>Keep it simple</strong>: A clear button can do more for engagement than complex new features.
          </li>
          <li>
            <strong>Make it personal</strong>: Grouping messages into a personalized card made people feel genuinely celebrated.
          </li>
          <li>
            <strong>The Halo Effect</strong>: Improving one simple feature encouraged engagement across the entire social platform.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;
