
import Cookies from "universal-cookie";
export const Auth =()=>{
    const token = localStorage.getItem("token")
    if(!token){
        return false;
    }
    return true;
}

export const Logout = ()=>{

    const cookies =new Cookies()
   cookies.remove("token")

}