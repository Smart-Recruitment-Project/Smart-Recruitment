import React from 'react';
//import {useState} from 'react';


function FeedItem({ avatarUrl, employeeName, headline, content, time }) {
    return (
        <div className="flex bg-white rounded-lg shadow-md p-4 m-4 items-center">
            <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-300 mr-4"
                style={{ backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="flex-grow">
                <div className="font-bold text-lg mb-1">{headline}</div>
                <div className="text-sm text-gray-600 mb-2">{employeeName}</div>
                <div className="text-sm text-gray-800">{content}</div>
            </div>
            <div className="text-xs text-gray-500 text-right">{time}</div>
        </div>
    );
}

function FeedContainer({ feedData }) {
    return (
        <div className="max-w-2xl mx-auto">
            {feedData.map((item, index) => (
                <FeedItem
                    key={index}
                    avatarUrl={item.avatarUrl}
                    employeeName={item.employeeName}
                    headline={item.headline}
                    content={item.content}
                    time={item.time}
                />
            ))}
        </div>
    );
}



// usisg duumy data

const sampleFeedData = [{
        avatarUrl: '',
        employeeName: 'John Doe',
        headline: 'Upcoming Exam Schedule',
        content: 'The exam schedule for the upcoming semester has been released. Please check the portal for details.',
        time: '2 hours ago',
},
];

  
function App() {
    /*const [data,setData]=useState([]);

    useEffect(()=>{
        const fetchData=async()=>{




    const sampleFeedData = [
        {
            avatarUrl: '',
            employeeName: 'John Doe',
            headline: 'Upcoming Exam Schedule',
            content: 'The exam schedule for the upcoming semester has been released. Please check the portal for details.',
            time: '2 hours ago',
        },
        {
            avatarUrl: '',
            employeeName: 'Jane Smith',
            headline: 'Library Hours Update',
            content: 'The library will be open from 8 AM to 10 PM starting next week.',
            time: '5 hours ago',
        },{
            avatarUrl: '',
            employeeName: 'Jane Smith',
            headline: 'Library Hours Update',
            content: 'The library will be open from 8 AM to 10 PM starting next week.',
            time: '5 hours ago',
        },{
            avatarUrl: '',
            employeeName: 'Jane Smith',
            headline: 'Library Hours Update',
            content: 'The library will be open from 8 AM to 10 PM starting next week.',
            time: '5 hours ago',
        }
    
      ];
*/
    return (
        <div>
            <FeedContainer feedData={sampleFeedData} />
        </div>
    );
}

export default App;
