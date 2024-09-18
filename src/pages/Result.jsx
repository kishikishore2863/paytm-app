import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

const Result = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState({
    isSuccessful: false,
    message: "",
    amount: "",
    recipientName: ""
  });

  useEffect(() => {
    const isSuccessful = searchParams.get("success") === "true";
    const message = searchParams.get("message") || "";
    const amount = searchParams.get("amount") || "";
    const recipientName = searchParams.get("recipient") || "";

    setTransactionData({ isSuccessful, message, amount, recipientName });
  }, [searchParams]);

  const { isSuccessful, message, amount, recipientName } = transactionData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white p-6">
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate("/dashboard")} 
          className="mb-8 flex items-center text-white"
        >
          <ArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="text-center mb-6">
          {isSuccessful ? (
            <CheckCircle className="w-24 h-24 mx-auto text-green-400" />
          ) : (
            <XCircle className="w-24 h-24 mx-auto text-red-400" />
          )}
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">
          {isSuccessful ? "Payment Successful!" : "Payment Failed"}
        </h1>

        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-gray-300">Amount</span>
            <span className="font-bold">₹{amount}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-300">To</span>
            <span className="font-bold">{recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Status</span>
            <span className={`font-bold ${isSuccessful ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;