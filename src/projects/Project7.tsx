import React from "react";
import wish03 from "../utils/project-imgs/kekawish/cardIterations.webp";
import wish04 from "../utils/project-imgs/kekawish/wallOfWishes.webp";
import widget from "../utils/project-imgs/kekawish/Widget.webp";
import dataTrack from "../utils/project-imgs/kekawish/dataTrack.png";
import currentFlow from "../utils/project-imgs/kekawish/wishesOnWall.webp";

const KekaWishes: React.FC = () => {

  return (
    <div className="project-details">

      <section>
        <h3>🎯 Adding delight to Peer to Peer wishes on Keka wall</h3>
        <h4>
          Personalized cards and confetti to help companies drive adoption and create delightful experiences.
        </h4>

        <h4>The problems:</h4>
        <p>Based on internal testing and customer feedback:</p>
        <ul>
          <li><strong>Falling engagement</strong>: Usage for the Peer wish feature was falling drastically.</li>
          <li><strong>Generic experience</strong>: It felt the same for both the wisher and the receiver.</li>
          <li><strong>Unclear entry point</strong>: There was no way to see wishes after the special day.</li>
          <li><strong>No visual celebration</strong>: The platform lacked special visuals to celebrate the person.</li>
        </ul>
      </section>

      <figure>
        <img src={currentFlow} alt="Wish widget on Keka wall" />
        <figcaption>The old system: Wish widget showing birthdays, anniversaries, and new joinees.</figcaption>
      </figure>

      <section>
        <h3>🔍 DESIGN DIRECTION I: Large special day cards</h3>
        <p>
          We first tried putting large cards directly on the wall.
        </p>
        <ul>
          <li><strong>What worked</strong>: More focus on each person and a clear CTA to wish them.</li>
          <li><strong>What didn't work</strong>: It prioritized 3-4 employees over everyone else and didn't fit the brand.</li>
        </ul>
      </section>

      <figure>
        <img src={wish03} alt="Large special day card iteration" />
        <figcaption>Iteration: Large card design based on competitor research.</figcaption>
      </figure>

      <section>
        <h3>🔍 DESIGN DIRECTION II: Dedicated wall of wishes</h3>
        <p>
          Next, we explored a dedicated space for everyone to make them feel special.
        </p>
        <ul>
          <li><strong>What didn't work</strong>: It felt disconnected from the main widget and fragmented user attention.</li>
        </ul>
      </section>

      <figure>
        <img src={wish04} alt="Dedicated wall of wishes" />
        <figcaption>Iteration: A separate wall for anniversary and birthday messages.</figcaption>
      </figure>

      <section>
        <h3>💡 The New System: Personalized & Persistent</h3>
        <p>
          We moved to a system that balances visibility with delight.
        </p>
        <ul>
          <li><strong>Personalized wish cards</strong>: A card showing a list of everyone who has wished you.</li>
          <li><strong>Templated responses</strong>: Solved the "empty slate" problem to make wishing easier.</li>
          <li><strong>Delightful Confetti</strong>: Added confetti for the person opening Keka and for the wisher after posting.</li>
        </ul>
      </section>

      <figure>
        <img src={widget} alt="Final widget" />
        <figcaption>New system: Simple "Wish" CTA added to the main widget.</figcaption>
      </figure>

      <section>
        <h2 className="results-title">📈 Impact: 31K Users. 116K Wishes.</h2>
        <p>What started as a small feature exploded across the platform:</p>
        <ul>
          <li><strong>6x User Growth</strong>: Jumped from 5k to 31k users.</li>
          <li><strong>7x Engagement</strong>: Total wishes increased from 15k to 116k.</li>
          <li><strong>3x Avg. Wishes</strong>: The average wish count per person grew from 2 to 6.</li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Data results" />
        <figcaption>Impact: Visualizing the growth in engagement.</figcaption>
      </figure>

      <section>
        <h2 className="results-title">🗝️ What I learned</h2>
        <ol>
          <li><strong>Simple is better</strong>: Clear actions drive the most engagement.</li>
          <li><strong>Personalized experiences work</strong>: People respond better when they feel special.</li>
          <li><strong>The Ripple Effect</strong>: High engagement in one area boosts the whole platform.</li>
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;