import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>IIIT Nagpur</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Bachelor of Technology in Computer Science and Engineering at
              Indian Institute of Information Technology, Nagpur. CGPA: 8.01 /
              10.00. Coursework includes DSA, OOP, DBMS, OS, and Computer
              Networks.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer Intern</h4>
                <h5>CollegePur (Remote)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Shipped 3 production-grade web apps in Next.js and React.js
              serving 500+ monthly users. Built 20+ RESTful API endpoints and
              modeled 8+ MongoDB collections, cutting query time by 60%.
              Improved app performance by 40% via profiling and debugging.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead, Web3 Wing & Senior Developer</h4>
                <h5>CRISPR Club, IIIT Nagpur</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Led the club's Web3 wing, delivering 6+ workshops to 120+
              attendees and driving 4 blockchain projects. Mentored 50+ student
              developers via weekly code reviews. Reviewed 10+ Solidity smart
              contracts and contributed 25+ merged PRs to the college website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
