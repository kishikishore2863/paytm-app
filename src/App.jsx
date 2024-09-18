import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import Send from "./pages/Send"
import Result from './pages/Result';
import AddMoney from './pages/AddMoney';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/send" element={<Send />} />
          <Route path="/result" element={<Result />} />
          <Route path="/add-money" element={<AddMoney />} />
          <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
