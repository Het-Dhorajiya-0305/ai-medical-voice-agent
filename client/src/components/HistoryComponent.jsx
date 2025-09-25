import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backEndUrl } from '../App';
import moment from 'moment';
import Description from './Description';
import Report from './Report';

function HistoryComponent() {

    const [sessions, setSessions] = useState([]);
    const [visible, setVisible] = useState(false);
    const [reportVisible, setReportVisible] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const handleVisibility = () => {
        setVisible(!visible);
    }
    const handleReportVisibility = (e, session) => {
        e.preventDefault();
        setReportVisible(!visible);
        setSelectedSession(session);
    }

    const getSessions = async () => {

        try {
            const response = await axios.get(backEndUrl + '/api/session/getallsessions', {
                withCredentials: true
            })
            console.log(response.data)
            if (response.data.success) {
                setSessions(response.data.sessions);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSessions();
    }, []);


    return (
        <div className='w-full p-5 mt-20 px-30 max-lg:px-20 max-md:px-5'>
            <div className="flex justify-between items-center py-8 ">
                <h1 className='text-black text-2xl font-bold'>My Dashboard</h1>
                <button className='bg-black text-white p-3 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300 max-sm:hidden' onClick={handleVisibility}>+ Consult With Doctor</button>
            </div>
            <div className="overflow-x-auto">
                <table className='w-full p-5 min-w-[800px]'>
                    <thead>
                        <tr className=''>
                            <th className='w-1/4 text-start py-4'>AI Medical Specilist</th>
                            <th className='w-1/4 text-start'>Description</th>
                            <th className='w-1/4 text-start'>Date</th>
                            <th className='w-1/4 text-end'>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map((ses, index) => (
                                <tr className='border-t border-gray-300 hover:bg-gray-200 px-2' key={index}>
                                    <td className='w-1/4 text-start py-4'>{ses.doctor.specialization}</td>
                                    <td className='w-1/4 text-start'>{ses.session.note}</td>
                                    <td className='w-1/4 text-start'>{moment(new Date(ses.session.report?.timestamp)).fromNow()}</td>
                                    <td className='w-1/4 text-end'><button className='font-semibold hover:border-b-[1px] hover:cursor-pointer disabled:hidden' onClick={(e) => handleReportVisibility(e, ses)} disabled={!ses.session.report}>View Report</button></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>

            {visible ?
                <Description handleVisibility={handleVisibility} visible={visible} /> : ""
            }

            {reportVisible ?
                <Report setReportVisible={setReportVisible} reportVisible={reportVisible} session={selectedSession} /> : ""
            }
        </div>
    )
}

export default HistoryComponent