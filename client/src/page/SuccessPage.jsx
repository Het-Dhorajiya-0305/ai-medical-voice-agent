import React from 'react'
import PaymentStatus from '../components/PaymentStatus'
import axios from 'axios';
import { backEndUrl } from '../App';

function SuccessPage() {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    const updatePlan=async()=>{
        try {
            const response=await axios.post(backEndUrl+"/api/user/update-plan",{sessionId},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

        } catch (error) {
            console.log(error)
        }
    }

    updatePlan();
    
    return (
        <div>
            <PaymentStatus success={true}></PaymentStatus>
        </div>
    )
}

export default SuccessPage