import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const AddMoney = () => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const cookie = new Cookies();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(
        "http://localhost:3008/api/v1/account/add-money",
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`
          }
        }
      );
      console.log(res.data);
      navigate("/dashboard"); // Redirect to dashboard or success page
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Money
        </h1>
        <div className="text-4xl font-bold text-green-600 text-center mb-6">
          To Your Wallet
        </div>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
          >
            {isLoading ? 'Processing...' : 'Initiate Transfer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoney;