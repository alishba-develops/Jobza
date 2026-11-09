import React, {useState, useEffect} from 'react'
import Viewapplication from '../Components/Viewapplication';
import './Application.css'
function Application() {
    
       const [appdata, setappdata] = useState([]);
      const [data, setdata] = useState("");
       console.log("id:",appdata._id)
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


        // View Application
        const [show, setshow] = useState(false)
  
     

  return (
   <div id="recappliedjobs-container" className="container-fluid">

  <h1 id="appliedjobs-heading">Applications</h1>

  <div  id="appliedjobs-table-wrapper" className="table-responsive">
    <table  id="appliedjobs-table"
      className="table table-bordered align-middle">
        <thead id="appliedjobs-thead">
        <tr>
          <th id="appliedjobs-title-header">Applicant</th>
          <th id="appliedjobs-category-header">Job Title</th>
          <th id="appliedjobs-status-header">Status</th>
          <th id="appliedjobs-status-header">Application Date</th>
           <th id="appliedjobs-status-header">Actions</th>
        </tr>
      </thead>
      <tbody id="appliedjobs-tbody">
 {
      appdata.map((application) => (

       

          <tr id="application-info">
         <td> <p id="appliedjobs-job-title">{application.fullname}</p></td>  
<td>
    <p id="appliedjobs-job-title">
              {application.job.title}
            </p>
</td>
          
<td>
   <p id="appliedjobs-status">
              {application.status}
            </p>
</td>
           
<td>
   <p id="appliedjobs-category">
               {new Date(application.createdAt).toLocaleDateString("en-GB")} 
                </p>
</td>
           
           
<td>
  <button
            id="view-application-btn"
            onClick={() => {
              setshow(true);
              setdata(application._id);
            }}
          >
            View Application
          </button>
</td>
    

           

          </tr>

         

       

      ))
    }
      </tbody>
    </table>
   
  </div>

  {show && <Viewapplication data={data} setshow= {setshow}/>}

</div>
  )
}

export default Application