
import axiosService from "../lib/AxiosServices";

class AuthService {
  registerUser = async (data) => {
    const response = await axiosService.post("/auth/register", data);
    return response.data;
  };
  loginUser= async (data)=>{
    const response=await axiosService.post("auth/login",data);
    return response.data;   
  }
}

export const authService = new AuthService();
