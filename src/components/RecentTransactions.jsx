/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3008/api/recent-transactions', {
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`
          }
        });
        setTransactions(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setIsLoading(false);
        console.log(err)
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map(transaction => (
          <li key={transaction.id} className="py-3">
            <div className="flex justify-between items-center">
              <span>{transaction.type === 'payment' ? `Payment to ${transaction.otherParty}` : `Received from ${transaction.otherParty}`}</span>
              <span className={transaction.type === 'payment' ? 'text-red-500' : 'text-green-500'}>
                {transaction.type === 'payment' ? '-' : '+'}${transaction.amount.toFixed(2)}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(transaction.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;














// const RecentTransactions = () => {
//   // This is a placeholder component. You can implement the actual logic for recent transactions here.
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
//       <ul className="divide-y divide-gray-200">
//         <li className="py-3">
//           <div className="flex justify-between items-center">
//             <span>Payment to John Doe</span>
//             <span className="text-red-500">-$50.00</span>
//           </div>
//           <span className="text-sm text-gray-500">2023-09-18 10:30 AM</span>
//         </li>
//         <li className="py-3">
//           <div className="flex justify-between items-center">
//             <span>Received from Jane Smith</span>
//             <span className="text-green-500">+$75.00</span>
//           </div>
//           <span className="text-sm text-gray-500">2023-09-17 3:45 PM</span>
//         </li>
//         {/* Add more transaction items as needed */}
//       </ul>
//     </div>
//   );
// };

// export default RecentTransactions;