import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
function Companyinfo() {
  const location = useLocation();
  const companyid = location.state.id;
  const edit = location.state.edit;

  // Get Company by id

  const [company, setcompany] = useState({});
  const fetchapi = async () => {
    await fetch(`http://localhost:5000/getcompanybyid/${companyid}`)
      .then((res) => res.json())
      .then((company) => {
        setcompany(company);
        console.log(company);
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  // Get jobs

  const [job, setjob] = useState([]);
  const fetchjobs = async () => {
    await fetch(
      `http://localhost:5000/getcompanyjob/${company.employerId}/${company.name}`,
    )
      .then((res) => res.json())
      .then((job) => {
        setjob(job);
      });
  };

  useEffect(() => {
    if (company.employerId) {
      fetchjobs();
    }
  }, [company]);
  const navigate = useNavigate();

  const [showReview, setShowReview] = useState(false);
  const [handlereview, sethandlereview] = useState({
    role: "",
    reviewerorganization: "",
    title: "",
    review: "",
  });
  const Handlereview = (e) => {
    const { name, value } = e.target;
    sethandlereview({ ...handlereview, [name]: value });
  };

  const [getreview, setgetreview] = useState([]);

  // Fetch reviews

  const fetchReviews = async () => {
    if (!company._id) return;

    try {
      const response = await fetch(
        `http://localhost:5000/fetchreview/${company._id}`,
      );
      const data = await response.json();
      if (response.ok) {
        setgetreview(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [company._id]);

  // Submit review

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      console.log(handlereview);
      const response = await fetch(
        `http://localhost:5000/submitreview/${company._id}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            role: handlereview.role,
            reviewerorganization: handlereview.reviewerorganization,
            title: handlereview.title,
            review: handlereview.review,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Review added successfully!");
        setShowReview(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div id="company-page">
      <div id="company-hero">
        <div id="company-hero-content">
          <div id="ci-top">
            <img id="ci-company-logo" src={company.logo} width={150} />

            <div>
              <h1 id="company-name">{company.name}</h1>
              <p id="company-address">{company.address}</p>
              <p id="company-location">{company.location}</p>
            </div>
          </div>
          <div id="ci-top-button-div">
            {edit && (
              <button
                id="ci-top-button-div-edit-btn"
                onClick={() =>
                  navigate("/Editcompany", {
                    state: { companyid: company._id },
                  })
                }
              >
                Edit
              </button>
            )}
            <button
              id="review-button"
              className="btn "
              onClick={() => setShowReview(true)}
            >
              Write a review
            </button>
          </div>
        </div>
      </div>
      <div id="company-about" className="container">
        <h4>About the company</h4>
        <div id="company-details">
          <div id="industry-info">
            <h5>Industry</h5>
            <p>{company.industry}</p>
          </div>

          <div id="headquarters-info">
            <h5>Headquarters</h5>
            <p>{company.headquarters}</p>
          </div>

          <div id="company-size-info">
            <h5>Company Size</h5>
            <p>{company.size}</p>
          </div>
        </div>
      </div>

      <div id="company-jobs" className="container">
        <h4>Jobs</h4>

        <div id="ci-job-inner">
          {job.map((item) => (
            <div id="ci-job">
              <p>{item.status}</p>
              <h3>{item.title}</h3>
              <h5>{item.location}</h5>
              <h5>{item.salary}</h5>
              <button
                onClick={() =>
                  navigate("/Browsejobs", {
                    state: { id: item._id },
                  })
                }
              >
                View Job
              </button>
            </div>
          ))}
        </div>
      </div>

      <div id="company-salaries" className="container">
        <h4>Salaries</h4>

        <div id="cr-sal-outer">
          {job.map((item) => (
            <div id="ci-salary-card">
              <h5>{item.title}</h5>

              <p>
                {item.currency} {item.minsalary} - {item.maxsalary}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="company-reviews" className="container">
        <h4>Reviews</h4>
        <div id="cr-sal-outer">
          {getreview.map((item) => (
            <div id="review-card">
              <div id="rev-card-top">
                <CgProfile id="profile-rev-icon" />
                <h5>
                  {item.role} at {item.reviewerorganization}
                </h5>
              </div>
              <p id="rev-title-show">{item.title}</p>
              <p id="rev-review">{item.review}</p>
            </div>
          ))}
        </div>
      </div>

      {showReview && (
        <div id="review-modal-outer">
          <div id="review-modal">
            <button
              id="review-close"
              type="button"
              onClick={() => setShowReview(false)}
            >
              <IoCloseOutline id="drawer-close" />
            </button>

            <h3>Write a Review</h3>

            <p id="review-company-name">
              Share your experience with {company.name}
            </p>

            <form onSubmit={submitReview}>
              <label for="review-rating">Your Role</label>

              <input
                id="review-input"
                placeholder="Tell about yourself"
                name="role"
                value={handlereview.role}
                onChange={Handlereview}
              />

              <label for="review-title">Organization</label>

              <input
                id="review-input"
                type="text"
                placeholder="Your Organization"
                name="reviewerorganization"
                value={handlereview.reviewerorganization}
                onChange={Handlereview}
                required
              />

              <label for="review-title">Review Title</label>

              <input
                id="review-input"
                type="text"
                placeholder="Title of Review"
                name="title"
                value={handlereview.title}
                onChange={Handlereview}
                required
              />

              <label htmlFor="review-comment">Your Review</label>

              <textarea
                id="review-textarea"
                placeholder="Enter your review"
                name="review"
                value={handlereview.review}
                onChange={Handlereview}
                required
              />
              <div id="review-submit">
                <button id="review-submit-btn" type="submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Companyinfo;
