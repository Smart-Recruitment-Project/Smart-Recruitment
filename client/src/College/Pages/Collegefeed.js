import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
const BPORT=process.env.REACT_APP_BPORT||8000;
//const FPORT=process.env.REACT_APP_FPORT||3000;

function FeedItem({ avatarUrl, employeeName, headline, content, time }) {
    return (
        <div className="flex bg-white rounded-lg shadow-md p-4 m-4 items-center">
            <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-300 mr-4"
                style={{ backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="flex-grow">
                <div className="font-bold text-black text-lg mb-1">{headline}</div>
                <div className="text-sm text-gray-600 mb-2">{employeeName}</div>
                <div className="text-sm text-gray-800">{content}</div>
            </div>
            <div className="text-xs text-gray-500 text-right">{time}</div>
        </div>
    );
}

function FeedContainer({ feedData }) {
    return (
        <div className="max-w-xl mx-auto">
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


function App() {
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const token = localStorage.getItem('token');
                const response=await axios.get(`http://localhost:${BPORT}/feeds`,{
                    headers: { Authorization: `Bearer ${token}` } 
                  });
                setData(response.data.feeds);
            }catch(error){
                console.log(error);
            }
        };fetchData()
    },[]);

    /*const sampleFeedData = [
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
        },
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
    
      ];*/


      const [headline, setHeadline] = useState('');
     const [feed, setFeed] = useState('');
     const location = useLocation();

      const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const queryParams = new URLSearchParams(location.search);
        const username = queryParams.get("username");
        const response = await axios.post(`http://localhost:${BPORT}/postfeed`,{
            headline:headline,
            feed:feed,
            username:username
        });
        if (response.status === 200) {
          alert(response.data.message);
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error("There was an error in posting feed!", error);
        alert("something Gone Wrong!!");
      }
      setHeadline('');
      setFeed('');
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="text-2xl font-bold text-white flex-row">
                        Add New Announcement
                      </label>
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 w-96 justify-center text-black"
                        placeholder="Headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-10 w-auto justify-center text-black"
                        placeholder="Feed"
                        value={feed}
                        onChange={(e) => setFeed(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <button
                        type="submit"
                        className="bg-yellow-300 hover:bg-yellow-400 text-white hover:text-black font-bold py-2 px-4 rounded"
                      >
                        Post
                      </button>
                    </div>
                </form>
                <FeedContainer feedData={data} />
        </div>
    );
}

export default App;
