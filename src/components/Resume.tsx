import "../styles/Experience.scss";
import obviousLogo from "../utils/logos/obvious-logo.svg";
import guesthouser from "../utils/logos/guesthouser.png";
import aphelia from "../utils/logos/aphelia-innovations.webp";
import keka from "../utils/logos/keka-logo.svg";
import looppanel from "../utils/logos/looppanel-logo.svg";
import immertive from "../utils/logos/immertive_logo.jpeg";
import keLogo from "../utils/logos/ke-logo.svg";
// import obviousLogo from '../utils/logos/obvious-logo.svg'

interface JobEntryProps {
  companyName: string;
  jobTitle: string;
  tenure: string;
  img: string;
  descriptions: string[];
}

const JobEntry: React.FC<JobEntryProps> = ({
  companyName,
  jobTitle,
  tenure,
  img,
  descriptions,
}) => {
  return (
    <div className="job-entry">
      <img src={img} className="company-logo" alt=""></img>
      <div className="job-details">
        <h4>
          {companyName} · {jobTitle}
        </h4>
        <h5>{tenure}</h5>
        <ul>
          {descriptions.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Resume: React.FC = () => {
  const jobsData: JobEntryProps[] = [
    {
      companyName: "Keka HR",
      jobTitle: "Senior Product Designer",
      tenure: "Mar 2024 - Present",
      img: keka,
      descriptions: [
        "Contributing to the Design System and leading the employee experience pod focused on revenue, retention, and growth.",
      ],
    },
    {
      companyName: "Immertive Pvt. Ltd.",
      jobTitle: "XR Design Intern • Master's Project",
      tenure: "Aug 2023 - Feb 2024",
      img: immertive,
      descriptions: [
        "Designed VR learning experiences for healthcare, reaching 1 million+ professionals as part of NID's Graduation Project.",
      ],
    },
    {
      companyName: "Looppanel",
      jobTitle: "Founding Product Designer & Researcher",
      tenure: "Jan 2022 - Sept 2022",
      img: looppanel,
      descriptions: [
        "Led product design from scratch, conducting 50+ user interviews and 10+ usability tests.",
        "Designed features to reduce time from interviews to insights by 5x.",
        "Migrated and optimized website to Webflow, improving loading speed by 50% and integrating blog posts into CMS.",
      ],
    },
    {
      companyName: "Self Employed",
      jobTitle: "Independent Product Designer & Figma Trainer",
      tenure: "Apr 2020 - Present",
      img: keLogo,
      descriptions: [
        "Launched 20+ MVPs and assisted B2C, B2B, and B2B2C startups in achieving PMF through design, research, and prototyping.",
        "Conducted Figma training and design workshops across India. Clients include IIM-A, IIM-B, IIT-M, Indiana University, and more.",
      ],
    },
    {
      companyName: "Obvious",
      jobTitle: "Product Designer",
      tenure: "May 2021 - Sept 2021",
      img: obviousLogo,
      descriptions: [
        "Designed features like leave tracking, auto approval, and geography-dependent leave calendar for Pause, a B2B leave management tool used by 50+ clients globally ; achieved #3 Product of the Day on Product Hunt.",
        "Redesigned 3+ modules for Grab-Singapore Merchant Dashboard used by 1M+ merchants.",
      ],
    },
    {
      companyName: "Aphelia Innovations",
      jobTitle: "Product Design Lead",
      tenure: "Mar 2020 - Apr 2021",
      img: aphelia,
      descriptions: [
        "Led design and launch of 5+ products and MVPs in health tech and developer experience sectors.",
        "Collaborated with dev and PM teams to create product roadmaps.",
        "Grew the design team to 4 and introduced frameworks to streamline project pipelines.",
      ],
    },
    {
      companyName: "Guesthouser",
      jobTitle: "Product Design",
      tenure: "Jun 2019 - Mar 2020",
      img: guesthouser,
      descriptions: [
        "Redesigned the booking and housekeeping apps used by ~100k people.",
        "Created and launched a Design System for internal tools and user facing apps",
      ],
    },
    // {
    //   companyName: "Chapter Vitamins",
    //   jobTitle: "Android Developer",
    //   tenure: "Jun 2018 - Nov 2018",
    //   img: "",
    //   descriptions: [],
    // },
  ];

  return (
    <div className="resume">
      {jobsData.map((job, index) => (
        <JobEntry key={index} {...job} />
      ))}
    </div>
  );
};

export default Resume;
