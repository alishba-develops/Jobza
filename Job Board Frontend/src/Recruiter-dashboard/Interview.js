import React, {useState, useEffect} from 'react'

function Interview(props) {
   // Get applications
    
       const [appdata, setappdata] = useState([]);
       const [data, setdata] = useState("");
        const fetchapi = () => {
          fetch("http://localhost:5000/showrecruiterapplication/", { credentials: "include" })
            .then((res) => res.json())
            .then((user) => {
               console.log("applications:", appdata);
              setappdata(user);
              
            });
        };
      
        useEffect(()=>{
          fetchapi();
        }, [])

        // Show
 const [show,setshow] = useState(false)
        const showmodal = ()=>{
setshow(true)
        }
         const close = ()=>{
setshow(false)
        }
  return (
     <div>
      <h4>Interview</h4>

      {appdata
        .filter((application) => application.status === "Interview")
        .map((application) => (
          <div>
            <p>{application.firstname}</p>

            <p>{application.job.title}</p>
            <p></p>
            <button>View Profile</button>
            <button
            //   onClick={() => {
            //     setshow(true);
            //     setdata(application._id);
            //   }}
            >
              View Application
            </button>
            <button onClick={()=>showmodal()}>Schedule Interview</button>

        
          </div>
        ))}


{show && 
(
   <div className='col-6'>
          <button onClick={close}>Close</button>
          <label>Applicant</label>
          <input/>
          <label>Job Title</label>
          <input/>
          <label>Interviwer</label>
          <input/>
           <label>Date</label>
          <input type='date'/>
          <label>Time</label>
          <input />
          <label>Type</label>
          <input type='radio'/>Online
          <input type='radio'/>Physical
          <input placeholder='MeetingLink'/>
          <label>Location</label>
          <input />
          <label>Notes</label>
           <textarea></textarea>
        </div>
)}
       
        
       
    </div>
  )
}

export default Interview