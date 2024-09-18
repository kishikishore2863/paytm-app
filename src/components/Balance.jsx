import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Balance = () => {
  const [amount, setAmount] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3008/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      );
      setAmount(res.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleSubmit = ()=>{
    navigate("/add-money")
  }


  useEffect(() => {
    
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Balance</h2>
        <div className="text-3xl font-bold text-blue-600">${amount}</div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            add Money
          </button>
        </div>
      </div>
    </>
  );
};

export default Balance;
