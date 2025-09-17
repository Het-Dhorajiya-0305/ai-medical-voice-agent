import React, { useState, useRef } from "react";
import { BiPhoneCall } from "react-icons/bi";
import Navbar from '../components/Navbar'
import { navItemsForDashboard } from '../constant'
import { useLocation, useParams } from 'react-router'
import Avatar from "react-avatar";
import Vapi from '@vapi-ai/web';

const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

function CallPage() {
  const location = useLocation();
  const doctor = location.state?.doctor;
  const sessionId = useParams().id;

  const [connected, setConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [sentense, setSentense] = useState("");
  const [messages, setMessages] = useState([]);

  const vapiRef = useRef(null);

  const startCall = async () => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(VAPI_API_KEY);

      vapiRef.current.start(VAPI_ASSISTANT_ID);

      vapiRef.current.on('call-start', () => {
        console.log('Call started');
        setConnected(true);
      });
      vapiRef.current.on('call-end', () => {
        console.log('Call ended');
        setConnected(false);
      });
      vapiRef.current.on('message', (message) => {
        if (message.type === 'transcript') {

          if (message.transcriptType === 'partial') {
            setCurrentRole(message.role);
            setSentense(message.transcript);
          }
          else if (message.transcriptType === 'final') {
            setCurrentRole(null);
            setSentense("");

            setMessages(prev => [...prev, { text: message.transcript, role: message.role }]);
          }
        }
      })
      vapiRef.current.on('speech-start', () => {
        console.log('Assistant started speaking');
        setIsSpeaking(true);
        setCurrentRole('Assistant');
      });
      vapiRef.current.on('speech-end', () => {
        console.log('Assistant stopped speaking');
        setIsSpeaking(false);
        setCurrentRole('User');
      });
    }
  };

  const endCall = async() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setSentense("");
      setCurrentRole(null);
      setMessages([]);
      vapiRef.current = null;
      setConnected(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center ">
      <Navbar navItems={navItemsForDashboard} islogin={true} />
      <div className="px-10 mt-23 w-full h-full max-sm:h-fit py-5">
        <div className="p-5 border border-gray-300 bg-gray-200 rounded-lg shadow-lg w-full h-full max-md:px-2 flex flex-col items-center justify-center gap-7 text-white">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Avatar name={doctor.name} className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold shadow-lg" />
            <h2 className="mt-4 text-2xl font-semibold text-black">{doctor.name}</h2>
            <p className="text-gray-400 mt-1">00:00</p>
          </div>
          <div
            className="w-1/2 max-md:w-full overflow-y-auto h-55 rounded-lg p-4 mb-4 flex flex-col justify-end "
            style={{ minHeight: "13rem", maxHeight: "20rem" }}
          >
            {messages.map((msg, index) => (
              <div key={index} className="text-gray-500 font-semibold text-lg w-full">
                {msg.role} : {msg.text}
              </div>
            ))}
            {sentense && sentense.length > 0 && (
              <div className="text-black font-semibold text-lg w-full">
                {currentRole} : {sentense}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            {!connected ? (
              <button className="p-3 rounded-full bg-green-600 hover:bg-green-700 hover:cursor-pointer flex items-center gap-2 text-white text-md font-semibold" onClick={startCall}>
                <BiPhoneCall size={25} /> Start Call
              </button>
            ) : (
              <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 hover:cursor-pointer flex items-center gap-2 text-white text-md font-semibold"
                onClick={endCall}
              >
                <BiPhoneCall size={25} /> End Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallPage