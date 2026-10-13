import axiosService from "@/lib/AxiosServices";

class UserService{
getMe= async ()=>{
 const response= await axiosService.get("/user/me");
 return response;
}
}

const userService= new UserService();

export default userService