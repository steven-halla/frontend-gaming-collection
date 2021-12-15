import {useContext, useEffect} from "react";
import {getLoggedInUserId} from "../Auth";
import {AppContext} from "../context/AppContext";
import {getUser} from "../service/getUser";
import {User} from "../model/User";

export const useLoadLoggedInUser = (): User | undefined => {
  const {user, setUser} = useContext(AppContext);

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId != null) {
      console.log("logged in user id: " + userId);
      getUser(userId).then(user => {
        console.log("logged in user: " + JSON.stringify(user));
        setUser(user);
      });
    }
  }, []);

  return user;
}
