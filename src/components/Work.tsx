import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  const projects = [
    {
      title: "2D Metaverse Platform",
      category: "Full-Stack / Real-Time",
      tools: "MERN Stack, Phaser.js, Socket.IO, WebRTC, Redis, JWT",
      link: "https://github.com/Yash200691/2D-Metaverse",
      image: "/images/metaverse.jpg",
    },
    {
      title: "Pedestrian Detection & Tracking",
      category: "AI / Computer Vision",
      tools: "Python, YOLOv8, ByteTrack, OpenCV, NumPy",
      link: "https://github.com/Yash200691/Pedestrian-Tracking",
      image: "/images/pedestrian.jpg",
    },
    {
      title: "StreamSphere",
      category: "Backend / Streaming",
      tools: "Node.js, Express.js, MongoDB, REST APIs",
      link: "https://github.com/Yash200691/StreamSphere",
      image: "/images/streamsphere.jpg",
    },
    {
      title: "AI Code Review Agent",
      category: "DevTools / AI",
      tools: "GitHub API, AI Reviewers, Inline Comments, PR Automation",
      link: "#",
      image: "/images/ai-code-review.jpg",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
