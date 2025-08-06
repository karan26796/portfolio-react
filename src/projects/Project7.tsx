import React from "react";
import wish01 from "../utils/project-imgs/kekawish/Wish -_ 05.png"
import wish02 from "../utils/project-imgs/kekawish/Wish -_ 04.png"
import wish03 from "../utils/project-imgs/kekawish/Wish -_ 3.webp"
import wish04 from "../utils/project-imgs/kekawish/Wish -_ 02.png"
import wish05 from "../utils/project-imgs/kekawish/Wish -_ 01.webp"
import wishcard from "../utils/project-imgs/kekawish/Wish cards.webp"
import widget from "../utils/project-imgs/kekawish/Widget.png"
import gif from "../utils/project-imgs/kekawish/Wish-Interaction-Old.gif"
import finaldesign from "../utils/project-imgs/kekawish/FinaldesignGIF.gif"
import dataTrack from "../utils/project-imgs/kekawish/dataTrack.png"

const KekaWishes: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h2>Celebrating Everyday Moments, the Keka Way</h2>
        <p>Revamping workplace celebrations to make them more personal, engaging, and delightful.</p>
      </section>

      <section>
        <h3>Problem</h3>
        <ul>
          <li>Celebrations felt generic and transactional</li>
          <li>Interaction was unclear and underused</li>
          <li>Low engagement on birthdays and special days</li>
        </ul>
        <h4>Result: Few wishes, minimal connection.</h4>
      </section>

      <section>
        <h3>Goal</h3>
        <ul>
          <li><strong>Team:</strong> Easy and fun way to wish</li>
          <li><strong>Person:</strong> Feel truly celebrated</li>
          <li><strong>Org:</strong> Boost engagement on the social wall</li>
        </ul>
      </section>

      <figure>
        <img src={wish01} alt="Current birthday experience" />
        <figcaption>Screenshot of the old birthday feature with low engagement</figcaption>
      </figure>

      <figure>
        <img src={gif} alt="Current birthday experience" />
        <figcaption>Animated example showing unclear and unengaging wish interaction</figcaption>
      </figure>

      <section>
        <h3>Exploration</h3>
        <h4>We explored multiple iterations to improve visibility and emotional value.</h4>
      </section>

      <section>
        <h4>1. Big Cards on Wall</h4>
        <ul>
          <li>✅ Prominent visibility</li>
          <li>❌ Took up too much space</li>
          <li>❌ Reduced visibility of other special days</li>
        </ul>
      </section>

      <figure>
        <img src={wish03} alt="Design experiments" />
        <figcaption>Design iteration: Large special day card on the wall</figcaption>
      </figure>

      <section>
        <h4>2. Dedicated Wish Walls</h4>
        <ul>
          <li>✅ Felt more personal</li>
          <li>❌ Disconnected from main wall</li>
          <li>❌ Looked empty if few wishes were sent</li>
        </ul>
      </section>

      <figure>
        <img src={wish04} alt="Design experiments" />
        <figcaption>Design iteration: Dedicated wish wall for each person</figcaption>
      </figure>

      <section>
        <h2>Final Solution</h2>
        <h3>🎈 Personalized Cards on Profile Wall</h3>
        <ul>
          <li>Highlights the person’s special day</li>
          <li>Blends seamlessly into their profile</li>
        </ul>
      </section>

      <figure>
        <img src={wishcard} alt="Design experiments" />
        <figcaption>Final design: Personalized birthday card on the profile wall</figcaption>
      </figure>

      <section>
        <h3>🥳 Clear Wish CTA</h3>
        <ul>
          <li>One-click “Wish” button removes friction</li>
          <li>Placed prominently for maximum visibility</li>
        </ul>
      </section>

      <figure>
        <img src={widget} alt="Design experiments" />
        <figcaption>Final widget: Clear "Wish" CTA and improved interaction flow</figcaption>
      </figure>

      <section>
        <h3>🎉 Delightful Wish Experience</h3>
        <ul>
          <li>Wish prompts encourage users to write</li>
          <li>Confetti animation makes it celebratory</li>
        </ul>
      </section>

      <figure>
        <img src={finaldesign} alt="Design experiments" />
        <figcaption>Final interaction: Example of a wish sent to a colleague</figcaption>
      </figure>

      <section>
        <h2>Impact</h2>
        <ul>
          <li>🎯 Wishes per person: <strong>2 → 10</strong></li>
          <li>🙌 Usage: <strong>5k → 31k users</strong></li>
          <li>💬 Total wishes sent: <strong>116k+</strong></li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Design experiments" />
        <figcaption>Data jump since launch</figcaption>
      </figure>

      <section>
        <h3>Key Learnings</h3>
        <ol>
          <li><strong>Simple works:</strong> One “Wish” button changed everything.</li>
          <li><strong>Make it personal:</strong> Custom birthday cards create connection.</li>
          <li><strong>Test. Learn. Repeat:</strong> Iterations revealed the best version.</li>
          <li><strong>Context is key:</strong> Embedding wishes on profiles increased relevance.</li>
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;
