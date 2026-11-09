import React from "react";
import "./Elandingpage.css";
import hero from "./assets/images/ehero-bgr.png";
import team from "./assets/images/hiring.jpg";
import dashboard from "./assets/images/hero.webp"
import pinterest from "./assets/icons/Pinterest cover.jpg";
import facebook from "./assets/icons/f2.jpg";
import insta from "./assets/icons/instagram.jpg";
import twitter from "./assets/icons/twitter.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TfiLayoutAccordionMerged } from "react-icons/tfi";
function Employerlandingpage() {
  return (
    <div id="employer-page">

  {/* Hero */}
  <div id="employer-hero">

  <header id="employer-header">
    <h1 id="logo">
      Job<span id="span">za</span>
    </h1>

    <nav>
      
      <a href="/" id="for-jobseekers">For Jobseekers</a>

      <a id="for-employers">For Employers</a>
    </nav>

    <div id="header-btn-div">
      <a href="/Employersignin" id="link">
        <button className="btn" id="signin-btn">
          Sign In
        </button>
      </a>

      <a href="/Employersignup" id="link">
        <button className="btn" id="signup-btn">
          Employer Signup
        </button>
      </a>
    </div>
  </header>

  <div id="employer-hero-main" className="col-12">

    <div id="employermain-left" className="text-center">

      <h1 id="employer-heromain-h" className="lead">
        Discover skilled professionals ready to make an impact.
      </h1>

      <p id="employer-heromain-p" className="lead">
        Find the right talent for your growing team.
        Post jobs, connect with qualified candidates, and hire with confidence.
      </p>
         <a href="/Employersignup" id="getstart-a">
             <button className="btn" id="getstart-btn">
              Get started 
              
              <IoIosArrowRoundForward id="getstart-btn-arr" />
            </button>
         </a>
         

    </div>

    <div id="employermain-right">
      <img src={
        hero} width={600}
       id="hero-img"
        />
    </div>

  </div>

</div>

  {/* Calculations */}
  <div id="calculations">

    <div id="calculation-card-1">
      <div id="calculation-content-1">
        <h3 id="calculation-title-1">Since 2004</h3>
        <p id="calculation-description-1">
          Trusted platform
        </p>
      </div>
    </div>

    <div id="calculation-card-2">
      <div id="calculation-content-2">
        <h3 id="calculation-title-2">15M +</h3>
        <p id="calculation-description-2">
          Applications processed
        </p>
      </div>
    </div>

    <div id="calculation-card-3">
      <div id="calculation-content-3">
        <h3 id="calculation-title-3">140K +</h3>
        <p id="calculation-description-3">
          Jobs posted
        </p>
      </div>
    </div>

    <div id="calculation-card-4">
      <div id="calculation-content-4">
        <h3 id="calculation-title-4">100K +</h3>
        <p id="calculation-description-4">
          Company hiring
        </p>
      </div>
    </div>

  </div>

{/* Way to build */}

<div id="way-to-build">
  <h3>A Better Way to Build Your Team</h3>
  <p>This how we work!</p>
  <div id="buildteam-main">
    <div id="buildteam-left" className="col-6">
      <img  src={team} width={500}/>
    </div>
    <div id="buildteam-right" className="col-6">
      <div id="bd-1">
        <h5 className="col-6">Post & Match</h5>
        <p className="col-6">Post your open roles and reach qualified candidates.
</p>
      </div>
      <div id="bd-2"> 
         <h5 className="col-6">Screen Effortlessly</h5>
         <p className="col-6">Review applications and identify promising candidates faster.
Keep your hiring process organized from one place.</p>
      </div>
      <div id="bd-3">
         <h5 className="col-6">Hire and Onboard</h5>
         <p className="col-6">Choose the right candidate and move confidently toward hiring.
Make onboarding simple and get your new hire started.</p>
      </div>
    </div>
  </div>
  
</div>

{/* Why choose us */}


<div id="employer-why-jobza">
   <h1 className="text-center">Why Choose Us</h1>
  <div id="why-jobza-row-1">

    <div id="why-jobza-image-1">
      <img src={team} alt="Professional team collaborating" />
    </div>

    <div id="why-jobza-content-1">
      <h3>Smarter Hiring Starts Here</h3>

      <p>
        Find qualified candidates, publish job openings, and manage
        applications from one organized platform. Jobza helps simplify
        your hiring workflow so you can focus on finding the right talent.
      </p>

     <a href="/Employersignup">
      <button id="why-jobza-link-1">
        Get Started
        <IoIosArrowRoundForward />
      </button></a> 
    </div>

  </div>

  <div id="why-jobza-row-2">

    <div id="why-jobza-content-2">
      <h3>Keep Your Hiring Organized</h3>

      <p>
        Review applications, explore candidate profiles, and track
        recruitment progress through your employer dashboard.
        Keep your hiring activities organized in one place.
      </p>

<a href="/Employersignup">
  <button  id="why-jobza-link-2">
        Explore Jobza
        <IoIosArrowRoundForward />
      </button>
</a>
      
    </div>

    <div id="why-jobza-image-2">
      <img src={dashboard} alt="Jobza hiring dashboard preview" />
    </div>

  </div>

</div>



{/* FAQ */}

 <div id="employer-faq-section">

  <div id="employer-faq-head" className="col-6">

    <h2 id="employer-faq-title">
      Frequently Asked Questions
    </h2>

    <p id="employer-faq-description">
      Everything you need to know before you post your first job.
    </p>

  </div>

  <div className="accordion col-6" id="accordionExample">
   
    <div className="card">
      <div className="card-header" id="headingThree">
        <div className="mb-0 d-flex justify-content-space-between">
          <h5>How do I create a Jobza for Employers account for free?</h5>
          <button className="btn btn-link text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseThree">
            <TfiLayoutAccordionMerged />
          </button>
        </div>
      </div>

      <div id="collapseOne" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div className="card-body">
         Click “Post a job” or “Get started” to begin. Account registration is free and provides immediate access to your Employer Dashboard to manage your hiring
        </div>
      </div>
    </div>

     <div className="card">
      <div className="card-header" id="headingThree">
        <div className="mb-0">
          <h5>How do I post a job on Jobza?</h5>
          <button className="btn btn-link text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <TfiLayoutAccordionMerged />
          </button>
        </div>
      </div>

      <div id="collapseTwo" className="collapse"  data-parent="#accordionExample">
        <div className="card-body">
         Create an employer account, set up your company profile, and fill in the job details, including responsibilities, requirements, salary, and employment type. Once published, your job will be visible to job seekers.
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header" id="headingThree">
        <div className="mb-0">
          <h5> How can I manage applications received for my job postings?</h5>
         
          <button className="btn btn-link  text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <TfiLayoutAccordionMerged />
          </button>
        </div>
      </div>

      <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div className="card-body">
          Jobza allows employers to review applications and candidate profiles through their dashboard, helping them organize applicants and track the recruitment process more efficiently.
        </div>
      </div>
    </div>

    
    <div className="card">
      <div className="card-header" id="headingThree">
        <div className="mb-0">
          <h5>Can I edit or remove a job after publishing it?</h5>
          <button className="btn btn-link  text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
           <TfiLayoutAccordionMerged />
          </button>
        </div>
      </div>

      <div id="collapseFour" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div className="card-body">
          Yes. You can manage your published job postings through your employer dashboard, update job details when requirements change, or remove listings when the position is no longer available.
        </div>
      </div>
    </div>

    
    <div className="card">
      <div className="card-header" id="headingThree">
        <div className="mb-0">
          <h5>Can I create a company profile on Jobza?</h5>
          <button className="btn btn-link  text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
           <TfiLayoutAccordionMerged />
          </button>
        </div>
      </div>

      <div id="collapseFive" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div className="card-body">
         Yes. Employers can create a company profile to showcase their organization, share company information, and help job seekers learn more about their workplace and available opportunities.
        </div>
      </div>
    </div>

    
    <div className="card">
      <div className="card-header" id="headingThree">
        <div className="mb-0">
          <h5>How can I find suitable candidates for my job openings?</h5>
          <button className="btn btn-link  text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
            <TfiLayoutAccordionMerged />
          </button>
        </div>
      </div>

      <div id="collapseSix" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div className="card-body">
          You can review applications submitted for your job postings and explore candidate information through your employer dashboard to identify applicants whose skills and qualifications match your hiring requirements.
        </div>
      </div>
    </div>
  </div>

</div>

{/* CTA */}

<div id="cta">

  <h1 id="cta-title">
    Ready to Find Your Next Great Hire?
  </h1>

  <p id="cta-description">
    Join Jobza to post jobs, connect with qualified candidates,
    and manage your hiring process in one place.
  </p>

  <div id="cta-buttons">

    <a href="/Employersignup" id="cta-get-started-link">
      <button id="cta-get-started-btn">
        Get Started Free
        <IoIosArrowRoundForward id="cta-gs-btn-icon" />
      </button>
    </a>

  

  </div>

</div>



  {/* Footer */}
  <div id="el-footer">
   <div id="footer-top">
 <div id="footer-left" className="col-6">

      <h1 id="footer-logo">
        Job<span id="footer-span">za</span>
      </h1>

      <p id="footer-description" >
        Trusted job portal since 2004. Connecting talent with opportunities
        across the nation.
      </p>

      <div id="footer-left-icons">
         <img src={facebook} width={40}/>
                     <img src={pinterest} width={40}/>
                      <img src={insta} width={40}/>
                       <img src={twitter} width={40}/>
      </div>

    </div>


    <div id="footer-right" className="col-6">

      <div id="footer-jobseekers">
        <h4 id="footer-jobseekers-title">
          For Jobseekers
        </h4>

        <p id="footer-browse-jobs">Browse Jobs</p>
        <p id="footer-build-resume">Build your resume</p>
        <p id="footer-safety-tips">Safety tips</p>
      </div>


      <div id="footer-employers">
        <h4 id="footer-employers-title">
          For Employers
        </h4>

        <a id="footer-post-job" href="/Employersignup">Post a job</a>
        <p id="footer-employer-resume">Build your resume</p>
        <p id="footer-employer-safety">Safety tips</p>
      </div>


      <div id="footer-support">
        <h4 id="footer-support-title">
          Support
        </h4>

        <p id="footer-help">Help Center</p>
        <p id="footer-privacy">Privacy Policy</p>
        <p id="footer-terms">Terms of Service</p>
      </div>


      

    </div>

   </div>

  
    <div className="text-center" id="empfooter-down">
    <p>© 2026 Jobza. Connecting talent with opportunity. </p>
   </div>
 
  </div>
 

</div>
  );
}

export default Employerlandingpage;
