import React from "react";
import bingGif from "../utils/project-imgs/binge-eating/binge.gif";
import img01 from "../utils/project-imgs/binge-eating/1.webp";
import img03 from "../utils/project-imgs/binge-eating/3.webp";
import img04 from "../utils/project-imgs/binge-eating/4.webp";
import img05 from "../utils/project-imgs/binge-eating/5.webp";
import boreeImg from "../utils/project-imgs/binge-eating/boree.webp";
import img06 from "../utils/project-imgs/binge-eating/6.webp";
import img07 from "../utils/project-imgs/binge-eating/7.webp";
import img02 from "../utils/project-imgs/binge-eating/2.webp";
import img08 from "../utils/project-imgs/binge-eating/8.webp";
import img11 from "../utils/project-imgs/binge-eating/11.webp";
import img09 from "../utils/project-imgs/binge-eating/9.webp";
import img10 from "../utils/project-imgs/binge-eating/10.webp";

const Project5: React.FC = () => {
  return (
    <div className="project-details">

      <p>Binge eating and watching are usually related, and their starting point in many cases is boredom. Although boredom is not bad but it presents an endless loop that is hard to escape and shifts our attention to future thinking.</p>

      <p>To help people make the best use of boredom, I created a device that suggests mindful activities at the click of a button. These activities have been proven to break the boredom loop and bring attention back to the present by initiating a mindful state.</p>

      <p>As our classroom course on problem-solving at NID, we are encouraged to pick our personal problems as project topics. I chose binge eating and overeating since I've dealt with drastic weight changes because of my eating habits in the past few years.</p>

      <figure>
        <img src={img01} alt="Personal problem illustration"/>
      </figure>

      <h2>"I binged a Netflix show for 10 hours, and regretted it the next morning" --- YouTube comment</h2>

      <h3>Primary research to understand the current binge habits of people</h3>
      <p>I conducted 5 user interviews over 3 days of people I recruited from WhatsApp, Slack Channels, and the campus. Participants were aged between 23-30yrs. Here are the key findings from the research</p>
      <ul>
        <li>Participants often started binge-watching to fill time as it'd become a habit, and they couldn't think of any alternatives.</li>
        <li>Participants reported watching series/shows to avoid stressful conversations with friends or family.</li>
        <li>Participants reported watching TV series suggested by friends or family to engage in a conversation with them.</li>
        <li>Participants also reported watching series/shows to learn new languages, but that was rare.</li>
      </ul>

      <h3>Secondary research to get a broader perspective</h3>
      <p>To understand the phenomenon better, I conducted online research and found out</p>
      <p>Our environment shapes our behaviour immensely. Everything around us is designed to make us consume more, from transparent fridge doors to large food containers</p>

      <figure>
        <img src={img03} alt="Environment influence illustration"/>
      </figure>

      <h3>Other Findings</h3>
      <ul>
        <li>Binge-watching is followed by binge-eating in many cases, and it happens subconsciously.</li>
        <li>Boredom is the biggest reason people start binge-eating or watching.</li>
        <li>Awareness of boredom loops & our environment can help us avoid bad choices.</li>
        <li>Being idle is important as it helps us wind down and reflect on things we've learned.</li>
      </ul>

      <p>Based on primary and secondary research, I decided to shift my focus from binge behaviour to boredom and started thinking of an intervention at the conjunction of boredom and binge watching.</p>

      <figure>
        <img src={img04} alt="Research shift illustration"/>
      </figure>

      <h3>Research on boredom</h3>
      <p>Boredom/Idleness is a loop. Binge-watching and eating provide an effortless way out of this seemingly endless loop. If we are aware we're in a loop, it helps us find ways to get out of it.</p>

      <figure>
        <img src={img05} alt="Boredom loop illustration"/>
      </figure>

      <h3>What's wrong with boredom?</h3>
      <figure>
        <img src={boreeImg} alt="Boredom illustration"/>
      </figure>
      <figure>
        <img src={img06} alt="Boredom effects illustration"/>
      </figure>

      <p>Based on my research on boredom, I ran a 5 day experiment during which I asked people to send me a voice note or text whenever they were idle and I sent them an activity they could take up in that moment.</p>

      <figure>
        <img src={img07} alt="Experiment illustration"/>
      </figure>

      <h3>Feedback from participants</h3>
      <p>People reacted positively to the experiment and were more aware of their idle time towards the end.</p>

      <blockquote>
        <p>"I was able to understand the different cues around me and make distinction between my idle and work time." --- Shreya, 24 · College Student</p>
      </blockquote>

      <blockquote>
        <p>"I enjoyed doing small activities that were also fun, moreover I was aware of when I was wasting my time and when I was actually idle" --- Shubham, 26 · Manager at an MNC.</p>
      </blockquote>

      <p>Post the experiment, I compiled all the findings and decided to create a device</p>

      <figure>
        <img src={img02} alt="Device capabilities"/>
        <figcaption>Capabilities of the device</figcaption>
      </figure>

      <h3>What does the device do?</h3>
      <p>It suggests constructive (not productive) activities from Berkeley University's Greater Good in Action Website which contains science backed practices for a meaningful life. These activities shift our focus from the future to the present & initiate a mindful state. All of it with a click of a button.</p>

      <figure>
        <img src={img08} alt="Device function illustration"/>
      </figure>
      <figure>
        <img src={img11} alt="Device usage illustration"/>
      </figure>

      <h3>More Features</h3>
      <ul>
        <li>It lets people generate activities voluntarily, hence giving them back control over their actions. Once they complete an activity, they'll be motivated to complete other productive tasks in their day.</li>
        <li>Habits follow the framework of Trigger/Cue, Behaviour, and Consequence. An effective way to change habits is to keep the trigger same but change the behaviour.</li>
      </ul>
      <p>The device does that by replacing the behavior of pulling out phone from the pocket for scrolling with getting an activity suggestion from the device.</p>

      <figure>
        <img src={img09} alt="Habit framework"/>
        <figcaption>Habit framework</figcaption>
      </figure>

      <h3>Why is idle time important?</h3>
      <ul>
        <li>When we're idle, our brains can connect between unrelated concepts that have been fed into our subconscious. Some of the most important discoveries have happened when people were not working.</li>
        <li>If we spend our idle time well, we can focus better. Clearly demarcating idle time and focus time, helps our mind wanders less.</li>
        <li>We can learn or internalize our previously learned skills, like an instrument, if we're not focused on anything.</li>
      </ul>

      <h3>Interesting findings</h3>
      <ul>
        <li>My assumption that stress/trauma is the biggest contributing factor to binge habits turned out false, as boredom turned out to be the biggest factor.</li>
        <li>No amount of problem solving can solve for awareness. If we're aware of our surroundings and pay attention to our own behaviour, we've solved 90% the problem.</li>
      </ul>

      <figure>
        <img src={img10} alt="Final illustration"/>
      </figure>
    </div>
  );
};

export default Project5;