import React from 'react'
import Navbar from '../components/Navbar'
import { navItemsForDashboard } from '../constant'
import SubscriptionCard from '../components/SubscriptionCard'
import { Leaf, Star, Gem } from "lucide-react";

function Subscription() {
    const plans = [
        {
            name: "Free",
            badge: "FREE",
            icon: <Leaf className="h-6 w-6 text-emerald-500" />,
            price: 0,
            duration: "Forever",
            color: "emerald",
            popular: false,
            features: [
                "Access to General Physician",
                "10 AI consultations / month",
                "Basic AI Report",
            ],
        },
        {
            name: "Pro",
            badge: "PRO",
            icon: <Star className="h-6 w-6 text-blue-500 " />,
            price: 499,
            duration: "Month",
            color: "blue",
            popular: true,
            priceId:"price_1TwOA905BQBQ6BUpTyWwQEMD",
            features: [
                "Access to all specialist doctors",
                "100 AI consultations / month",
                "Detailed AI Reports",
                "Download PDF",
                "Consultation History",
            ],
        },
        {
            name: "Premium",
            badge: "PREMIUM",
            icon: <Gem className="h-6 w-6 text-violet-500 " />,
            price: 799,
            duration: "Month",
            color: "violet",
            popular: false,
            priceId:"price_1TwOAu05BQBQ6BUpo5L0M2Cc",
            features: [
                "Everything in Pro",
                "500 AI consultations / month",
                "Early Access Features",
                "24/7 Premium Support",
            ],
        },
    ];
    return (
        <div className='min-h-screen pt-16 w-screen sm:pt-20 bg-gray-100 relative'>
            <Navbar navItems={navItemsForDashboard} islogin={true} />
            <div className="pt-6 sm:pt-10 h-full w-full flex items-center justify-center min-sm:px-3">
                <div className="bg-white py-6 px-4 sm:py-8 sm:px-6 lg:px-10 rounded-2xl sm:rounded-3xl w-full lg:w-[90%] xl:w-[80%]">
                    <div className="text-center">
                        <span className="rounded-full bg-blue-100 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-blue-600">
                            ✨ CHOOSE YOUR PLAN
                        </span>

                        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Simple Plans,
                            <span className="text-blue-600"> Better Health</span>
                        </h1>

                        <p className="mt-2 mb-6 sm:mb-7 text-sm sm:text-[15px] text-slate-500 px-2">
                            Choose the perfect AI Medical subscription.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {
                            plans.map(plan => (
                                <SubscriptionCard plan={plan} key={plan.name}></SubscriptionCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription