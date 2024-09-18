import Cookies from "universal-cookie";

export const isAuthenticated = () => {
    const cookies = new Cookies()
    const token = cookies.get("token")
    return !!token; // Returns true if token exists, otherwise false
  };