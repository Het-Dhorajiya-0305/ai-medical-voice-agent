import React from "react";
import {
    CheckCircle2,
    ShieldCheck,
    Lock,
    Clock3,
    Headphones
} from "lucide-react";

function SubscriptionCard({ plan }) {
    const border =
        plan.color === "emerald"
            ? "hover:border-emerald-500"
            : plan.color === "blue"
                ? "border-blue-500 hover:border-blue-600"
                : "hover:border-violet-500";

    const button =
        plan.color === "emerald"
            ? "bg-emerald-500 hover:bg-emerald-600 hover:cursor-pointer"
            : plan.color === "blue"
                ? "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                : "bg-violet-600 hover:bg-violet-700 hover:cursor-pointer";

    return (
        <div
            key={plan.name}
            className={`w-full h-full relative rounded-2xl sm:rounded-3xl border-2 bg-white p-6 sm:p-8 shadow-xl text-start transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${border} ${plan.popular ? "border-blue-500" : "border-transparent"
                }`}
        >
            {plan.popular && (
                <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
                    ⭐ Most Popular
                </div>
            )}

            {/* Badge */}

            <div className="flex gap-3 mt-2 sm:mt-0">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                    {plan.icon}
                </div>
                <div className="flex flex-col min-w-0">

                    <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold  text-center w-max
                        ${plan.color === "emerald"
                                ? "border-emerald-500 text-emerald-500"
                                : plan.color === "blue"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-violet-500 text-violet-500"
                            }`}
                    >
                        {plan.badge}
                    </span>

                    <h2 className="text-2xl sm:text-2xl font-bold flex ">{plan.name} Plan</h2>

                    <p className="text-sm sm:text-sm text-gray-500">
                        {plan.name === "Free"
                            ? "Best for getting started."
                            : plan.name === "Pro"
                                ? "For regular AI consultations."
                                : "Complete healthcare experience."}
                    </p>
                </div>
            </div>

            <div className="my-4 sm:my-5 h-px bg-gray-200" />

            <div className="flex">
                <h1 className={`text-4xl sm:text-5xl font-bold ${plan.color === "emerald"
                    ? "text-emerald-500"
                    : plan.color === "blue"
                        ? "text-blue-500"
                        : "text-violet-500"
                    }`}>
                    ₹{plan.price}

                    <span className="text-base sm:text-lg font-normal text-gray-500">
                        / {plan.duration}
                    </span>
                </h1>
            </div>

            {/* Features */}

            <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 flex-1">
                {plan.features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-start sm:items-center text-start gap-3 text-sm sm:text-base text-gray-700"
                    >
                        <CheckCircle2
                            className={`h-5 w-5 shrink-0 mt-0.5 sm:mt-0
                        ${plan.color === "emerald"
                                    ? "text-emerald-500"
                                    : plan.color === "blue"
                                        ? "text-blue-500"
                                        : "text-violet-500"
                                }`}
                        />

                        {feature}
                    </div>
                ))}
            </div>
            <div className="mt-auto pt-6 sm:pt-8">

                <button
                    className={`mt-6 sm:mt-10 w-full rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition ${button}`}
                >
                    {plan.price === 0
                        ? "Current Plan"
                        : `Upgrade to ${plan.name} →`}
                </button>
            </div>
        </div>
    );
}

export default SubscriptionCard;