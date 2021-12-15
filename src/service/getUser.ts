import axios from "axios";

export const getUser = async (userId: number) => {
  // const jwt = localStorage.getItem('token');
  console.log("User id", userId)
  try {
    let response = await axios.get(`http://127.0.0.1:8000/api/auth/users/${userId}/`);
    console.log('user:', response.data);
    return response.data;
  } catch (e) {
    console.log("Error with the userDetails", e)
  }
}
