import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const BPORT = process.env.REACT_APP_BPORT || 8000;

function Companydata({ jobtitle, jobdescription, companyname, posteddate, deadline }) {
    return (
        <div className="flex bg-white rounded-lg shadow-md p-4 m-4 items-center">
            <div className="flex-grow">
                <div className="font-bold text-black text-lg mb-1">{jobtitle}</div>
                <div className="text-sm text-black mb-2">{companyname}</div>
                <div className="text-sm text-black mb-2">{jobdescription}</div>
                <div className="text-xs text-black mb-2">Posted on: {posteddate}</div>
                <div className="text-xs text-black mb-2">Deadline: {deadline}</div>
            </div>
            <div className="flex flex-col items-end">
                <button className="bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded mb-2 hover:bg-blue-700">
                    Apply
                </button>
                <button className="bg-gray-500 text-white text-xs font-bold py-2 px-4 rounded hover:bg-gray-700">
                    View More
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
                    posteddate={item.posting_date}
                    deadline={item.application_deadline}
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
                const response = await axios.get(`http://localhost:${BPORT}/getstudentskills`, { params: { "username": username } });
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
                const response = await axios.post(`http://localhost:${BPORT}/getcompanies`, {
                    skills: skill,
                    marks: marks,
                    cgpa: CGPA
                });
                setData(response.data.companies);
                console.log(response.data.companies);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCompanies();
    }, [CGPA, marks, skill]);
    
    return (
        <div><CompanyContainer feedData={data} /></div>
    );
}
