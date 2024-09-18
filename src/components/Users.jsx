import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Search } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:3008/api/v1/account/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`
          }
        });
        setUsers(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [filter]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user._id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3 w-10 h-10 flex justify-center items-center">
                  <span className="text-blue-800 font-semibold">
                    {user.firstName[0].toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
              </div>
              <button
                onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Send Money
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;