import React, { useState, useRef } from "react";
import { BiPhoneCall } from "react-icons/bi";
import Navbar from '../components/Navbar'
import { navItemsForDashboard } from '../constant'
import { useLocation, useParams } from 'react-router'
import Vapi from '@vapi-ai/web';
import axios from "axios";
import { backEndUrl } from "../App";


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
  const [loader, setLoader] = useState(false);

  const vapiRef = useRef(null);

  const startCall = async () => {
    setLoader(true);
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(VAPI_API_KEY);

      console.log(doctor);
      const vapiConfig = {
        name: doctor.name,
        firstMessage: "Hello, I’m your virtual medical assistant—could you please share how you’re feeling or what brings you here today?",
        transcriber: {
          provider: "assembly-ai",
          language: "en"
        },
        voice: {
          provider: "lmnt",
          voiceId: doctor.voiceId
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are ${doctor.name}, a ${doctor.specialization}. ${doctor.description} Your task is to assist users with their medical concerns related to your specialization. Use the following prompt to guide your responses: ${doctor.agentPrompt} Always remember to advise users to consult a qualified healthcare professional for accurate diagnosis and treatment.`
            }
          ]
        }
      };

      vapiRef.current.start(vapiConfig);



      vapiRef.current.on('call-start', () => {
        console.log('Call started');
        setConnected(true);
        setLoader(false);
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

  const endCall = async () => {
    setLoader(true);
    if (vapiRef.current) {
      vapiRef.current.stop();
      setSentense("");
      setCurrentRole(null);
      setMessages([]);
      vapiRef.current = null;
      setConnected(false);
    }
    const report = await genrateReport();
    setLoader(false);
  };

  const genrateReport = async () => {
    try {
      const payload = {
        messages,
        sessionId
      }

      const response = await axios.post(backEndUrl + 'api/session/generate-report', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        console.log(response.data.report);
        return response.data.report;
      }
      else {
        console.log("Error generating report");
      }
      return null;

    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center ">
      <Navbar navItems={navItemsForDashboard} islogin={true} />
      <div className="px-10 mt-23 w-full h-full max-sm:h-fit py-5">
        <div className="p-5 border border-gray-300 bg-gray-200 rounded-lg shadow-lg w-full h-full max-md:px-2 flex flex-col items-center justify-center gap-7 text-white">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img src={doctor.imageUrl} className="w-32 h-32 rounded-full shadow-lg object-cover" />
            <h2 className="mt-3 text-2xl font-semibold text-black">{doctor.name}</h2>
            <h3 className="text-gray-500 font-bold">{doctor.specialization}</h3>
            <p className="text-gray-400 mt-1 font-semibold flex items-center justify-center gap-3"><span className={`${connected ? 'bg-green-500' : 'bg-red-800'} w-4 rounded-full h-4`}></span>{connected ? "Connected" : "Not Connected"}</p>
          </div>

          {/* message */}
          <div
            className="w-1/2 max-md:w-full overflow-y-auto rounded-lg p-4 mb-4 flex flex-col justify-end ">
            {messages.slice(-3).map((msg, index) => (
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

          {/* Call Button */}

          <div className="flex items-center justify-center">
            {!connected ? (
              <button className={`p-3 rounded-full bg-green-600 hover:bg-green-700 hover:cursor-pointer flex items-center gap-2 text-white text-md font-semibold ${loader ? 'bg-green-800' : ''}`} onClick={startCall}>
                {loader ? (
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : (
                  <BiPhoneCall size={25} />
                )} Start Call
              </button>
            ) : (
              <button className={`p-3 rounded-full bg-red-600 hover:bg-red-700 hover:cursor-pointer flex items-center gap-2 text-white text-md font-semibold ${loader ? 'bg-red-800' : ''}`}
                onClick={endCall}
              >
                {loader ? (
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : (
                  <BiPhoneCall size={25} />
                )}
                End Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallPage