import jwtDecode from "jwt-decode";

export const getAuthToken = () => {
  return localStorage.getItem('token');
}

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
}

export const deleteAuthToken = () => {
  localStorage.removeItem("token");
}

export const getLoggedInUserId = () => {
  const token = getAuthToken();
  if (!token) {
    console.log("token is null");
    return null;
  }
  const decodedJwt = jwtDecode(token);
  console.log("decodedJwt", decodedJwt);
  // @ts-ignore
  return decodedJwt.user_id;
}
