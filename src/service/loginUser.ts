import axios from "axios";
import {setAuthToken} from "../Auth";

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginUser = async (loginRequest: LoginRequest) => {
  console.log("Inside loginUser function app.js");
  console.log("loginRequest", loginRequest);
  try {
    // first login
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginRequest);
    console.log("login response", response);
    setAuthToken(response.data.access);
    // @ts-ignore
    window.location = '/';

  } catch (error) {
    console.log('error with logged in user', error);
    return error
  }
}
