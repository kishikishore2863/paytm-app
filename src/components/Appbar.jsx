import { useNavigate } from 'react-router-dom';
import { Logout } from "../utils/GlobalContext";
import { DollarSign, LogOut, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


const Appbar = () => {
    const navigate = useNavigate();
    const cookies =new Cookies
    const[info,setInfo]=useState('')

    const handleLogout = () => {
      Logout();
      navigate('/login'); // Redirect to the login page after logout
    };

    const fetchData= async ()=>{
        await axios.get("http://localhost:3008/api/v1/account/info",{
        headers:{
         Authorization:`Bearer ${cookies.get("token")}`
        }
      }).then(res=>setInfo(res.data.firstName))
    }
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold">PayTM App</span>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Hello, {info}</span>
            <div className="relative">
              <UserIcon className="h-8 w-8 text-gray-500" />
            </div>
            <LogOut onClick={handleLogout} className="h-6 w-6 ml-4 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Appbar;