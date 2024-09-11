import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const BPORT = process.env.REACT_APP_BPORT || 8000;

function Companydata({ jobtitle, jobdescription, companyname, applieddate}) {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md p-4 m-4 w-full">
            <div className="flex-grow">
                <div className="font-bold text-black text-lg mb-1">{jobtitle}</div>
                <div className="text-sm text-black mb-2">{companyname}</div>
                <div className="text-sm text-black mb-2">{jobdescription}</div>
                <div className="text-xs text-black mb-2">Applied on: {applieddate}</div>
            </div>
            <div className="ml-auto">
                <button className="bg-blue-950 text-white text-xs font-bold py-2 px-4 rounded mb-2 hover:bg-red-700 w-fit">
                    Track Progress
                </button>
                
            </div>
        </div>
    );
}

function CompanyContainer({ feedData }) {
    return (
        <div className="max-w-xl mx-auto">
            {feedData.map((item, index) => (
                <Companydata
                    key={index}
                    jobtitle={item.job_title}
                    jobdescription={item.job_description}
                    companyname={item.company_name}
                    applieddate={item.applied_on}
                />
            ))}
        </div>
    );
}

export default function Allcompanies() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");

    const [skill, setSkill] = useState('');
    const [CGPA, setCGPA] = useState('');
    const [marks, setMarks] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
          try {
            const token = localStorage.getItem('token'); // Get token from local storage
            const response = await axios.get(`http://localhost:${BPORT}/getstudentskills`, {
              params: { "username": username },
              headers: { Authorization: `Bearer ${token}` } // Include token in headers
            });
            const skillsData = response.data.skills[0]; 
            setSkill(skillsData.skills); 
            setCGPA(skillsData.CGPA);
            setMarks(skillsData["12_marks"]);
          } catch (error) {
            console.log(error);
          }
        };
        if (username) fetchSkills();
      }, [username]);
    //console.log(skill, CGPA, marks); 

    useEffect(() => {
        const fetchCompanies = async () => {
          try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post(`http://localhost:${BPORT}/getcompanies`, {
              skills: skill,
              marks: marks,
              cgpa: CGPA
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data.companies);
            console.log(response.data.companies);
          } catch (error) {
            console.log(error);
          }
        };
        fetchCompanies();
      }, [CGPA, marks, skill]);
    
      const SampleData = [
        {
            job_title: "Software Engineer",
            job_description: "Develop and maintain web applications using JavaScript frameworks.",
            company_name: "Tech Solutions Inc.",
            applied_on: "2024-09-08"
        },
        {
            job_title: "Frontend Developer",
            job_description: "Design user-friendly interfaces and collaborate with UX teams.",
            company_name: "Creative Web Ltd.",
            applied_on: "2024-08-25"
        },
        {
            job_title: "Backend Developer",
            job_description: "Build and maintain server-side applications and databases.",
            company_name: "DataCraft Systems",
            applied_on: "2024-07-30"
        },
        {
            job_title: "DevOps Engineer",
            job_description: "Manage cloud infrastructure and CI/CD pipelines for continuous integration.",
            company_name: "CloudMasters",
            applied_on: "2024-09-01"
        },
        {
            job_title: "Full Stack Developer",
            job_description: "Work on both frontend and backend features for enterprise-level applications.",
            company_name: "InnovateX Solutions",
            applied_on: "2024-08-15"
        },
        {
            job_title: "Mobile App Developer",
            job_description: "Develop and optimize mobile applications for iOS and Android platforms.",
            company_name: "Appify Inc.",
            applied_on: "2024-09-03"
        }
    ];
          
    
    return (
        <div><CompanyContainer feedData={SampleData} /></div>
    );
}
