import { constants } from "@/lib/constants";
import axios from "axios";

const USERS_LIST_API = constants.githubUserURL;

export default {
  axios,
  fetchUsersList() {
    return axios.get(USERS_LIST_API);
  },

  fetchUsersDetails(username) {
    return axios.get("https://api.github.com/users/" + username);
  },

  fetchUsersRepos(username) {
    return axios.get("https://api.github.com/users/" + username + "/repos");
  }
};
