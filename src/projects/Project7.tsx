import React from "react";
import wish01 from "../utils/project-imgs/kekawish/Wish -_ 05.png"
import wish02 from "../utils/project-imgs/kekawish/Wish -_ 04.png"
import wish03 from "../utils/project-imgs/kekawish/Wish -_ 03.png"
import wish04 from "../utils/project-imgs/kekawish/Wish -_ 02.png"
import wish05 from "../utils/project-imgs/kekawish/Wish -_ 01.png"
import wishcard from "../utils/project-imgs/kekawish/Wish cards.png"
import widget from "../utils/project-imgs/kekawish/Widget.png"
import gif from "../utils/project-imgs/kekawish/Wish-Interaction-Old.gif"
import finaldesign from "../utils/project-imgs/kekawish/FinaldesignGIF.gif"
import dataTrack from "../utils/project-imgs/kekawish/dataTrack.png"

const KekaWishes: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h2>Project Overview</h2>
        <p><strong>Challenge:</strong> How might we make birthday, work anniversaries, and first day celebrations more personal and engaging within Keka's employee platform, creating meaningful connections between team members on special days?</p>
        
        <p><strong>Solution:</strong> A redesigned wishes widget that transforms how employees celebrate each other's special days, making it easier to participate in celebrations and more meaningful for the birthday person.</p>
        
        <p><strong>My Role:</strong> Product Design, Design Strategy <br/></p>
        {/* <strong>Timeline:</strong> [Add your timeline]<br/> */}
        {/* <strong>Team:</strong> [Add team members if applicable]</p> */}
      </section>

      <section>
        <h2>The Problem</h2>
        <p>Keka's existing birthday feature lacked engagement and personalization. Employees found it difficult to:</p>
        <ul>
          <li>Understand how to wish someone</li>
          <li>Experience a sense of celebration on their own special day</li>
        </ul>
        
        <p>The current wishing experience felt transactional rather than celebratory, which impacted the number of wishes someone received on their special day.</p>
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
        <h3>User goals</h3>
        <ul>
          <li><strong>For well-wishers:</strong> Easy, meaningful way to celebrate colleagues</li>
          <li><strong>For birthday person:</strong> Feel appreciated and celebrated by their team</li>
          <li><strong>For the organization:</strong> Boost engagement on the social wall, especially on the special days widget</li>
        </ul>
      </section>

      <section>
        <h2>Design Iterations</h2>
        <h3>I: Prominent special day cards on wall</h3>

        <p><strong>Although this design approach shows a person's special day more prominently, it had a few problems</strong></p>
          <ol>
            <li>It takes a large space on the home page.</li>
            <li>Lowers the visibility of other people's special days</li>
            <li>Limits the total number of people visible on the widget</li>
            </ol>
        </section>

        <figure>
        <img src={wish03} alt="Design experiments" />
        <figcaption>Design iteration: Large special day card on the wall</figcaption>
      </figure>

      <section>
        <h3>II: Dedicated wall of wishes for each person</h3>

        <p><strong>The idea of a dedicated wall felt more special but had some problems</strong></p>
          <ol>
            <li>Separates the wish interaction from the widget on wall, thereby creating a disconnect</li>
            <li>Since everyone doesn't receive a lot of wishes, the wall might look empty for some</li>
            </ol>
        </section>

        <figure>
        <img src={wish04} alt="Design experiments" />
        <figcaption>Design iteration: Dedicated wish wall for each person</figcaption>
      </figure>
    
      <section>
        <h2>Final Solution</h2>
        
        <p><strong>Prominent Birthday Cards</strong></p>
        <ul>
          <li>Personalized cards appear on individual walls when it's someone's special day</li>
          <li>Integrated seamlessly with existing profile layouts</li>
        </ul>
        </section>

        <figure>
        <img src={wishcard} alt="Design experiments" />
        <figcaption>Final design: Personalized birthday card on the profile wall</figcaption>
      </figure>

      <section>
        <p><strong>Clear Wish CTA</strong></p>
        <ul>
          <li>Obvious "Wish" button removes friction from the interaction</li>
          <li>Prominent placement ensures users don't miss the opportunity to participate</li>
        </ul>
        </section>

        <figure>
        <img src={widget} alt="Design experiments" />
        <figcaption>Final widget: Clear "Wish" CTA and improved interaction flow</figcaption>
      </figure>

      <section>
        <p><strong>Easy and delightful wish experience</strong></p>
        <ul>
        <li>Simple, one-click interaction with the introduction of wish prompts encourages engagement</li>
          <li>Confetti post wishing to make the experience feel more celebratory</li>
        </ul>
        </section>

        <figure>
        <img src={finaldesign} alt="Design experiments" />
        <figcaption>Final interaction: Example of a wish sent to a colleague</figcaption>
      </figure>

      <section>
        <h2>Impact & Results</h2>
        <h3>Measurable Outcomes</h3>
        <ul>
          <li>Increased the average number of wishes from 2 to 10</li>
          <li>Click rate increase by 30% week on week since launch</li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Design experiments" />
        <figcaption>Data jump since launch</figcaption>
      </figure>


      <section>
        <h2>Key Learnings</h2>
        
        <ol>
          <li>
            <strong>Simple is better</strong><br/>
            Sometimes the simplest solutions have the biggest impact. Adding a clear "Wish" button dramatically improved user participation.
          </li>
          <li>
            <strong>Personalization Creates Connection</strong><br/>
            Individual birthday cards made celebrations feel personal rather than generic, significantly improving the emotional impact.
          </li>
          <li>
            <strong>Iterative Design Works</strong><br/>
            Testing multiple approaches through experiments helped identify the most effective solutions without assumptions.
          </li>
          <li>
            <strong>Context Matters</strong><br/>
            Integrating wishes into personal walls/profiles made them more meaningful than standalone features.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;