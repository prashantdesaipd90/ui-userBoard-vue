<template>
  <div class="user-list" data-test="userList">
    <h1>{{ constants.metaData.listHeading }}</h1>
    <div class="list">
      <article v-for="(user, index) in filteredUsersList"
      :key="'user'+index" tabindex="6">
        <img v-if="user.avatar_url" class="user-image" :src=user.avatar_url :alt=user.login height=250 width=250/>
        <img v-else class="user-image" src="../assets/duck.svg" alt=user.login height=250 width=250/>
        <div @click="navigateToDetails(user.login)" class="user-name">{{ user.login }}</div>
        <a class="github-link" :href=user.html_url target="_blank">
          <img src="../assets/attachment.svg" alt="go to github repo" />
          {{ constants.metaData.githubList }}
        </a>
      </article>
    </div>
    <div v-if="filteredUsersList.length === 0" class="no-result-found">
      <span>{{ constants.metaData.noResult }}</span>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  import { constants } from "../lib/constants";
  export default {
    data: () => {
      return {
        constants
      }
    },
    computed: {
      filteredUsersList() {
        let filterUsersList = this.usersList;

        // search users by name
        if (this.searchQuery) {
          filterUsersList = filterUsersList.filter((user) => {
            return user.login.toLowerCase().includes(this.searchQuery.toLowerCase());
         });
        }

        return filterUsersList;
      },
      ...mapState("UsersStore", [
        "usersList",
        "searchQuery"
      ])
    },
    methods: {
      navigateToDetails(username) {
        this.setSelectedUsersName(username);
        this.$router.push({ 
          name: "UsersDetails",
          params: { username: username }
        });
      },
      ...mapActions("UsersStore", ["fetchUsersList"]),
      ...mapMutations("UsersStore", [
        "setSelectedUsersName"
      ])
    },
    created() {
      this.fetchUsersList();
    }
  }
</script>

<style lang="scss" scoped>
  .user-list {
    h1 {
      padding: 30px auto;
      font-size: 48px;
      color: #000000;
      text-align: center;
    }
    .list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-gap: 50px;
      margin-bottom: 20px;

      article {
        text-align: center;
        .user-image {
          border-radius: 50%;
          box-shadow: 0 15px 30px rgba(0,0,0,.1),
                    0 10px 10px rgba(0,0,0,.1);
        }
        .user-name {
          font-size: 20px;
          color: #000000;
          margin-top: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .github-link {
          font-size: 12px;
          color: #54A3FF;
          cursor: pointer;
          text-decoration: none;
          img {
            position: relative;
            top: 5px;
          }
        }
      }
    }
    .no-result-found {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
