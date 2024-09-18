import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Send = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const cookies = new Cookies();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && parseFloat(value) <= 0) {
      setError("Amount must be greater than 0");
    } else {
      setError("");
    }
  };

  const fetchdata = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3008/api/v1/account/transfer",
        {
          to: id,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      );
      if (res.data.message === "Transfer successful") {
        navigate(`/result?success=true&message=Transfer successful&amount=${amount}&recipient=${name}`);
      } else {
        navigate(`/result?success=false&message=Insufficient balance&amount=${amount}&recipient=${name}`);
      }
    } catch (error) {
      navigate(`/result?success=false&message=An error occurred during the transfer&amount=${amount}&recipient=${name}`);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Send Money
        </h1>

        <div className="text-4xl font-bold text-green-600 text-center mb-6">
          {name ? name[0].toUpperCase() : "N/A"}
        </div>
        <div className="flex justify-center mb-6">
          <h3 className="text-3xl">{name}</h3>
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Enter Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>

        <button
          onClick={fetchdata}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default Send;