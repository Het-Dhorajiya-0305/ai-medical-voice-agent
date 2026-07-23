import {
    CheckCircle,
    XCircle,
    ShoppingBag,
    ArrowRight,
    RotateCcw,
    ShieldCheck,
} from "lucide-react";
import {useNavigate} from 'react-router-dom'

export default function PaymentStatus({ success }) {

    const navigate=useNavigate();

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-10 ${success
                ? "bg-gradient-to-br from-green-50 via-emerald-100 to-green-200"
                : "bg-gradient-to-br from-red-50 via-rose-100 to-red-200"
                }`}
        >
            <div className="w-full max-w-xl max-h-[80%] bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-5 border-b">
                    <h1 className="text-lg md:text-xl font-extrabold tracking-wide">
                        <span className="text-black">MEDI</span>

                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                            VOICE
                        </span>

                        <span className="text-black"> AI</span>
                    </h1>


                    <div className="flex items-center gap-2 text-gray-600">
                        <ShieldCheck size={18} />
                        <span className="text-sm">Secure Payment</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div
                            className={`h-20 w-20 rounded-full flex items-center justify-center
                                ${success
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                }`}
                        >
                            {success ? (
                                <CheckCircle className="text-green-600" size={60} />
                            ) : (
                                <XCircle className="text-red-600" size={60} />
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-center mt-6">
                        {success ? "Payment Successful!" : "Payment Cancelled"}
                    </h2>

                    <p className="text-center text-gray-500 mt-3">
                        {success
                            ? "Thank you! Your payment has been completed successfully."
                            : "Your payment wasn't completed. You can try again anytime."}
                    </p>


                    {/* Footer Message */}
                    {success ? (
                        <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700">
                            A confirmation email has been sent successfully.
                        </div>
                    ) : (
                        <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
                            If money was deducted, it will automatically be refunded in
                            5–7 business days.
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-8 space-y-4">
                        {success ? (
                            <>
                                <button 
                                className="w-full bg-green-600 hover:cursor-pointer hover:bg-green-700 transition text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2"
                                onClick={()=>navigate('/')}
                                >
                                    Back to Main page
                                    <ArrowRight size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                 className="w-full bg-red-600 hover:cursor-pointer hover:bg-red-700 transition text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2"
                                    onClick={()=>navigate('/subscription')}
                                >
                                    <RotateCcw size={18} />
                                    Try Again
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}