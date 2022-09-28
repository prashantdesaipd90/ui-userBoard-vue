import service from "@/service/httpService";

const state = {
  usersList: [],
  usersDetails: {},
  usersRepos: [],
  isUsersListLoading: false,
  isUsersDetailsLoading: false,
  isErrorInUsersList: false,
  isErrorInUsersDetails: false,
  isErrorInUsersRepos: false,
  selectedUsersName: "",
  searchQuery: null,
  showSearch: false,
};
const getters = {};
const mutations = {
  setUsersList(state, usersList) {
    state.usersList = usersList;
  },
  setUsersDetails(state, usersDetails) {
    state.usersDetails = usersDetails;
  },
  setUsersRepos(state, usersRepos) {
    state.usersRepos = usersRepos;
  },
  setIsErrorInUsersList(state, isErrorInUsersList) {
    state.isErrorInUsersList = isErrorInUsersList;
  },
  setIsErrorInUsersDetails(state, isErrorInUsersDetails) {
    state.isErrorInUsersDetails = isErrorInUsersDetails;
  },
  setIsErrorInUsersRepos(state, isErrorInUsersRepos) {
    state.isErrorInUsersRepos = isErrorInUsersRepos;
  },
  setIsUsersListLoading(state, isUsersListLoading) {
    state.isUsersListLoading = isUsersListLoading;
  },
  setIsUsersDetailsLoading(state, isUsersDetailsLoading) {
    state.isUsersDetailsLoading = isUsersDetailsLoading;
  },
  setSelectedUsersName(state, selectedUsersName) {
    state.selectedUsersName = selectedUsersName;
  },
  setSearchQuery(state, searchQuery) {
    state.searchQuery = searchQuery;
  },
  setShowSearch(state, showSearch) {
    state.showSearch = showSearch;
  },
};
const actions = {
  async fetchUsersList({ commit }) {
    commit("setIsUsersListLoading", true);
    try {
      const resp = await service.fetchUsersList();
      commit("setUsersList", resp.data);
      commit("setIsErrorInUsersList", false);
    } catch(error) {
      commit("setIsErrorInUsersList", true);
    } finally {
      commit("setIsUsersListLoading", false);
    }
  },
  async fetchUsersDetails({ commit }, username) {
    commit("setIsUsersDetailsLoading", true);
    try {
      const resp = await service.fetchUsersDetails(username);
      commit("setUsersDetails", resp.data);
      commit("setIsErrorInUsersDetails", false);
    } catch(error) {
      commit("setIsErrorInUsersDetails", true);
    } finally {
      commit("setIsUsersDetailsLoading", false);
    }
  },
  async fetchUsersRepos({ commit }, username) {
    try {
      const resp = await service.fetchUsersRepos(username);
      commit("setUsersRepos", resp.data);
    } catch(error) {
      commit("setIsErrorInUsersRepos", true);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
