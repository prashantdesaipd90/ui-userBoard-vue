<template>
  <div class="users-list-wrapper" data-test="usersList">
    <div v-if="isErrorInUsersList" class="users-warnings" data-test="usersError">
      <span>{{ constants.errorInFetchingUsersList }}</span>
    </div>
    <div v-if="isUsersListLoading" class="users-warnings" data-test="usersLoading">
      <span><i class="fas fa-spinner fa-spin"></i> {{ constants.usersListLoadingMsg }}</span>
    </div>
    <UsersList/>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import UsersList from '../components/UsersList.vue';
  import { constants } from "../lib/constants";
  import { mapState } from 'vuex';

  export default {
    name: "UsersHome",
    components: {
      UsersList
    },
    data: () => {
      return {
        constants
      }
    },
    created() {
      this.setShowSearch(true);
    },
    computed: {
      ...mapState("UsersStore", [
        "isUsersListLoading",
        "isErrorInUsersList"
      ])
    },
    methods: {
      ...mapMutations("UsersStore", [
        "setShowSearch"
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .users-list-wrapper {
    width: 100%;
    max-width: calc(100% - 10%);
    .users-warnings {
      padding: 50px;
      font-size: 20px;
    }
  }
</style>
