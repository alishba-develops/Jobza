import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css";
import { IoMdStarOutline } from "react-icons/io";
import t1 from "./assets/images/t1.jpg";
import pf1 from "./assets/images/npf1.jpg";
import npf2 from "./assets/images/npf3.jpg";
import pf4 from "./assets/images/npf5.jpg";
import uploadresume from "./assets/images/nresume.jpg";
import hired from "./assets/images/hired.jpg";
import account from "./assets/images/account.jpg";
import spotify from "./assets/images/black Spotify icon.jpg";
import slack from "./assets/icons/slack.jpg";
import webflow from "./assets/icons/webflow.jpg";
import pinterest from "./assets/icons/Pinterest cover.jpg";
import facebook from "./assets/icons/f2.jpg";
import insta from "./assets/icons/instagram.jpg";
import twitter from "./assets/icons/twitter.jpg";
import { BsArrowUpRight } from "react-icons/bs";
import IBM from "./assets/icons/ibm2.jpg";
import google from "./assets/icons/google2.jpg";
import adobe from "./assets/icons/adobe.jpg";
import orac from "./assets/icons/oracle.jpg";
import { IoMenu } from "react-icons/io5";
function Landingpage() {
  const navigate = useNavigate();
  const [cities, setcities] = useState([]);
  const fetchapi = () => {
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "Pakistan",
      }),
    })
      .then((res) => res.json())
      .then((cities) => {
        console.log(cities.data);
        setcities(cities.data);
      })
      .catch((error) => {
        console.log("Api failed");
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  return (
    <div id="body">
      <div id="hero">
        <header id="lp-hero-header">
          <h1 id="logo">
            Job<span id="span">za</span>
          </h1>
          <nav id="lp-nav">
            <a href="/" id="for-employers">
              Home
            </a>
            <a href="/Company">Comapny Reviews</a>
            <a href="/Browsejobs">Browse Jobs</a>
            <a href="/Employerlandingpage">For Employers</a>
          </nav>
          <div id="lp-btn-div">
            <a href="/JobseekerdsignIn" id="link">
              <button className="btn" id="signin-btn">
                Sign In
              </button>
            </a>
            <a href="/Jobseekersignup" id="link">
              <button className="btn" id="signup-btn">
                Signup
              </button>
            </a>
          </div>
          <div id="menu-outer">
            <IoMenu />
          </div>
        </header>

        <div id="hero-main" className="col-6">
          <p className="lead" id="no1-text">
            #1 Job finding platform
          </p>

          <h1 id="heromain-h">
            Find Your<span id="hero-title-span"> Dream Jobs</span> And plan your
            next future with us
          </h1>

          <p id="heromain-p" className="lead">
            Find the right opportunity for your next career .Explore relevant
            jobs from trusted employers,and take the next step toward a career
            you'll be excited about.
          </p>

          <div id="hero-main-btn-div">
            <a href="/Browsejobs">
              <button className="btn" id="signin-btn">
                Browse Jobs
              </button>
            </a>

            <a href="/Employerlandingpage">
              <button className="btn" id="signup-btn">
                Post a Job
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Trusted by Companies */}
      <div id="trusted">
        <h2 id="trusted-h2" className="lead">
          Trusted by companies worldwide
        </h2>
        <div id="trusted-down">
          <div id="trusted-companies">
            <h3 id="company-coinbase">
              <img src={google} width={40} /> Google
            </h3>

            <h3 id="company-spotify">Microsoft</h3>
            <img src={IBM} width={50} id="IBM" />

            <h3 id="company-dropbox">Amazon</h3>
            <h3 id="company-webflow">
              <img src={adobe} width={40} /> Adobe
            </h3>

            <h3 id="company-dropbox">Dropbox</h3>
          </div>

          <div id="trusted-companies">
            <h3 id="company-coinbase">coinbase</h3>

            <h3 id="company-spotify">
              <img src={spotify} width={40} id="sp-company-icon" />
              Spotify
            </h3>
            <h3 id="company-slack">
              <img src={slack} width={40} /> slack
            </h3>
            <img src={orac} width={100} id="" />

            <h3 id="company-webflow">
              <img src={webflow} width={40} /> Webflow
            </h3>
            <h3 id="company-zoom">zoom</h3>
          </div>
        </div>
      </div>

      {/* Job Categories */}

      <div id="job-categories" className="container py-5">
        <h2 className="text-center lead" id="get-started-title">
          Popular Categories
        </h2>
        <p className="text-center" id="get-started-description">
          Find jobs in your field.
        </p>

        <div id="categories-container">
          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "Software & Web Development" },
              })
            }
          >
            <h5>Software & Web Development</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "Mobile App Development" },
              })
            }
          >
            <h5>Mobile App Development</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "AI & Machine Learning" },
              })
            }
          >
            <h5>AI & Machine Learning</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "Cybersecurity" },
              })
            }
          >
            <h5>Cybersecurity</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "UI/UX & Graphic Design" },
              })
            }
          >
            <h5>UI/UX & Graphic Design</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "DevOps & Cloud" },
              })
            }
          >
            <h5>DevOps & Cloud</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "Finance & Accounting" },
              })
            }
          >
            <h5>Finance & Accounting</h5>
          </div>

          <div
            id="category-card"
            onClick={() =>
              navigate("/Browsejobs", {
                state: { category: "Human Resources" },
              })
            }
          >
            <h5>Human Resources</h5>
          </div>
        </div>
        <div id="catbtn-div">
          <a href="/Browsejobs"><button id="cat-btn">View all jobs</button></a>
        </div>
      </div>

      {/* Get Started  */}

      <div id="get-started">
        <h1 id="get-started-title" className="lead">
          From sign-up to interview in 3 steps
        </h1>

        <p id="get-started-description">
          No paperwork. No friction. Just the job search, simpler.
        </p>

        <div id="get-started-cards">
          <div id="wcucard-outer-1">
            <img id="wcu-image-1" src={account} width={400} />

            <div id="wcu-card-1">
              <h3 id="wcu-title-1">Create your free account</h3>

              <p id="wcu-description-1">
                Create your free Jobza account in just a few steps. Set up your
                profile and tell employers about yourself. Unlock exciting
                opportunities tailored to your career goals.
              </p>
              <div>
                <button id="gs-btn">
                  Get started <BsArrowUpRight width={140} />
                </button>
              </div>
            </div>
          </div>

          <div id="wcucard-outer-2">
            <img id="wcu-image-2" src={uploadresume} width={400} />

            <div id="wcu-card-2">
              <h3 id="wcu-title-2">Upload Resume</h3>

              <p id="wcu-description-2">
                Showcase your skills, education, and experience. Upload your
                resume to help employers understand your potential. Make your
                profile stand out from the crowd.
              </p>
              <div>
                <button id="gs-btn">
                  Get started <BsArrowUpRight width={140} />
                </button>
              </div>
            </div>
          </div>

          <div id="wcucard-outer-3">
            <img id="wcu-image-3" src={hired} width={400} />

            <div id="wcu-card-3">
              <h3 id="wcu-title-3">Apply and get hired</h3>

              <p id="wcu-description-3">
                Explore opportunities that match your skills and interests. Find
                your ideal role with easy job searching and filtering. Apply to
                your favorite jobs with just a few clicks.
              </p>
              <div>
                <button id="gs-btn">
                  Get started <BsArrowUpRight width={140} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What our users say  */}

      <div id="testimonials">
        <h2 id="testimonials-title">What Our User Says</h2>

        <p id="testimonials-description">
          Join thousands of happy Employers who have hired talent using Jobza
        </p>

        <div id="testimonial-layout">
          <div id="testimonial-group-1">
            <div id="testimonial-card-1">
              <div id="stars-4">
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
              </div>

              <p id="quote-1">
                "Having every applicant, interview note, and offer in one
                dashboard cut our back-and-forth emails in half."
              </p>

              <div id="person-1">
                <img src={npf2} width={40} id="t-img" />
                <div id="person-info-1">
                  <div id="pname-1">Aisha Khan</div>
                  <div id="prole-1">Head of Design, Figma</div>
                </div>
              </div>
            </div>

            <div id="testimonial-card-2">
              <div id="stars-4">
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
              </div>

              <p id="quote-2">
                "Having every applicant, interview note, and offer in one
                dashboard cut our back-and-forth emails in half."
              </p>

              <div id="person-2">
                <img src={t1} width={40} id="t-img" />

                <div id="person-info-2">
                  <div id="pname-2">David Chen</div>
                  <div id="prole-2">Chief Technology Officer, Vercel</div>
                </div>
              </div>
            </div>
          </div>

          <div id="lp-testimonial-group-2">
            <div id="lp-testimonial-card-3">
              <img src={t1} width={100} id="t-img" />
              <div id="person-info-3">
                <div id="pname-3">Omar Farooq</div>
                <div id="prole-3">Head of People, Webflow</div>
              </div>
              <div id="stars-4">
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
              </div>

              <p id="quote-3" className="text-left">
                "Having every applicant, interview note, and offer in one
                dashboard cut our back-and-forth emails in half.Having every
                applicant, interview note, and offer in one dashboard cut our
                back-and-forth emails in half"
              </p>

              <div id="person-3"></div>
            </div>
          </div>

          <div id="testimonial-group-3">
            <div id="testimonial-card-4">
              <div id="stars-4">
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
              </div>

              <p id="quote-4">
                "Having every applicant, interview note, and offer in one
                dashboard cut our back-and-forth emails in half."
              </p>

              <div id="person-4">
                <img src={pf4} width={40} id="t-img" />

                <div id="person-info-4">
                  <div id="pname-4">Marcus Vance</div>
                  <div id="prole-4">Director of Engineering, Slack</div>
                </div>
              </div>
            </div>

            <div id="testimonial-card-5">
              <div id="stars-4">
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
                <IoMdStarOutline />
              </div>

              <p id="quote-5">
                "Having every applicant, interview note, and offer in one
                dashboard cut our back-and-forth emails in half."
              </p>

              <div id="person-5">
                <img src={pf1} width={40} id="t-img" />

                <div id="person-info-5">
                  <div id="pname-5">Sarah Jenkins</div>
                  <div id="prole-5">VP of Product, Stripe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer  */}

      <div id="lp-footer">
        <div id="lp-footer-top" className="col-12">
          <div id="lp-footer-left" className="col-6">
            <h1 id="footer-logo">
              Job<span id="lp-footer-span">za</span>
            </h1>

            <p id="footer-description">
              Trusted job portal since 2004. Connecting talent with
              opportunities across the nation.
            </p>

            <div id="footer-left-icons">
              <img src={facebook} width={40} />
              <img src={pinterest} width={40} />
              <img src={insta} width={40} />
              <img src={twitter} width={40} />
            </div>
          </div>

          <div id="footer-right" className="col-6">
            <div id="lp-footer-jobseekers">
              <h4 id="lp-footer-jobseekers">For Jobseekers</h4>
              <a id="footer-browse-jobs" href="./Browsejobs">
                Browse Jobs
              </a>
              <a id="footer-build-resume">Create Your Profile</a>
              <a id="footer-safety-tips">My Applications</a>
            </div>

            <div id="lp-footer-jobseekers">
              <h4 id="lp-footer-jobseekers">For Employers</h4>
              <a id="footer-post-job" href="./Employerlandingpage">
                Post a job
              </a>
              <a id="footer-employer-resume">Build your resume</a>
              <a id="footer-employer-safety">Safety tips</a>
            </div>

            <div id="lp-footer-jobseekers">
              <h4 id="lp-footer-jobseekers">Support</h4>
              <a id="footer-help">Help Center</a>
              <a id="footer-privacy">Privacy Policy</a>
              <a id="footer-terms">Terms of Service</a>
            </div>

            <div id="footer-right-empty"></div>
          </div>
        </div>
        <div className="text-center" id="footer-down">
          <p>© 2026 Jobza. Connecting talent with opportunity. </p>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
