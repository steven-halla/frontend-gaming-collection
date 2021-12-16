import axios from "axios";
import {loginUser} from "./loginUser";

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
}

//create service function in new file from services folder I need to do something simliar to this function
// but i must also pass in a game id and use id
export const registerUser = async (request: RegisterRequest) => {
  console.log(request);
  try {
    console.log("try clause")
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', request);
    console.log(response);
    if (response.status != 200) {
      console.log("error occurred during signup, don't login");
      // alert error
      // return
    }

    await loginUser({
      'username': request.username,
      'password': request.password
    });
    console.log(request);
    // @ts-ignore
    window.location = '/';

  } catch (error) {
    console.log(error, 'error with register user');
  }
}
