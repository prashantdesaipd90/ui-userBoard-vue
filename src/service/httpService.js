import { constants } from "@/lib/constants";
import axios from "axios";

const USERS_LIST_API = constants.githubUserURL;

export default {
  axios,
  fetchUsersList() {
    return axios.get(USERS_LIST_API + "?per_page=15");
  },

  fetchUsersDetails(username) {
    return axios.get(USERS_LIST_API + "/" + username);
  },

  fetchUsersRepos(username) {
    return axios.get(USERS_LIST_API + "/" + username + "/repos");
  }
};
