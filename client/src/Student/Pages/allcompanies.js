import React from 'react'

export default function allcompanies() {
    const sampleFeedData = [
        {
            jobtitle: 'Software Engineer',
            jobdescription: 'Develop and maintain software applications.',
            companyname: 'ABC Corp',
            posteddate: '2024-08-24',
            deadline: '2024-09-23'
        },
        {
            jobtitle: 'DevOps Engineer',
            jobdescription: 'Manage infrastructure and deployment processes.',
            companyname: 'XYZ Inc',
            posteddate: '2024-08-31',
            deadline: '2024-10-23'
        },
        {
            jobtitle: 'ML Engineer',
            jobdescription: 'Work on machine learning models and algorithms.',
            companyname: 'DataCorp',
            posteddate: '2024-08-31',
            deadline: '2024-10-23'
        },
        {
            jobtitle: 'Frontend Developer',
            jobdescription: 'Develop user interfaces with modern frameworks.',
            companyname: 'Tech Solutions',
            posteddate: '2024-08-30',
            deadline: '2024-10-10'
        },
        {
            jobtitle: 'Data Scientist',
            jobdescription: 'Analyze data and build predictive models.',
            companyname: 'Analytics Ltd',
            posteddate: '2024-09-01',
            deadline: '2024-11-15'
        },
        {
            jobtitle: 'Marketing Analyst',
            jobdescription: 'Analyze market trends and data to support marketing strategies.',
            companyname: 'BizCorp',
            posteddate: '2024-09-05',
            deadline: '2024-12-01'
        },
        {
            jobtitle: 'Backend Developer',
            jobdescription: 'Develop and maintain server-side logic and databases.',
            companyname: 'CodeFactory',
            posteddate: '2024-09-03',
            deadline: '2024-11-10'
        },
        {
            jobtitle: 'Product Manager',
            jobdescription: 'Oversee product development from conception to launch.',
            companyname: 'InnovateTech',
            posteddate: '2024-08-29',
            deadline: '2024-10-05'
        }
    ];
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
                    jobtitle={item.jobtitle}
                    jobdescription={item.jobdescription}
                    companyname={item.companyname}
                    posteddate={item.posteddate}
                    deadline={item.deadline}
                />
            ))}
        </div>
    );
}
  return (
    <div><CompanyContainer feedData={sampleFeedData}/></div>
  )
}
