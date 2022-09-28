<template>
  <div class="detail" data-test="detailsWrapper">
    <div id="go-back" aria-label="go-back" tabindex="1" @click="navigateToList" data-test="goBackBtn">
    </div>
    <div class="users-details">
      <img v-if="usersDetails.avatar_url" class="user-image" :src=usersDetails.avatar_url :alt=usersDetails.login />
      <img v-else class="user-image" src="../assets/duck.svg" alt=usersDetails.login />
      <h1>{{ usersDetails.login }}</h1>
      <div v-for="(repo, index) in usersRepos" :key="'repo'+index" class="repo-list">
        <div class="repo-name">
          <a :href=repo.html_url target="_blank">
            {{ repo.name }}
          </a>
        </div>
        <div class="repo-watchers">
          <img class="user-watcher" src="../assets/watcher.svg" alt="watcher"/>
          {{ repo.watchers }}
        </div>
        <div class="repo-stars">
          <img class="user-star" src="../assets/star.svg" alt="star"/>
          {{ repo.forks }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  import { constants } from "../lib/constants";
  export default {
    name: "UsersDetails",
    data: () => {
        return {
          constants
        }      
    },
    computed: {
      usersDetails() {
        return this.usersDetails;
      },
      usersRepos() {
        return this.usersRepos;
      },
      ...mapState("UsersStore", ["usersDetails", "usersRepos"])
    },
    created() {
      this.setShowSearch(false);
      const username = this.$route.path.substring(1).split('/');
      this.fetchUsersDetails(username);
      this.fetchUsersRepos(username);
      window.scrollTo(0, 0);
    },
    methods: {
      navigateToList() {
        this.$router.push({ name: "usersList" });
      },
      ...mapActions("UsersStore", ["fetchUsersDetails", "fetchUsersRepos"]),
      ...mapMutations("UsersStore", ["setShowSearch"])
    }
  }
</script>

<style lang="scss" scoped>
  .detail {
    padding: 50px;
    width: 90%;
    #go-back {
      background-image: url("../assets/back.svg");
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
    .users-details {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      .user-image {
        height: 32%;
        width: 32%;
        border-radius: 50%;
        box-shadow: 0 15px 30px rgba(0,0,0,.1),
                  0 10px 10px rgba(0,0,0,.1);
      }
      h1 {
        margin: 30px 0;
        font-size: 40px;
        color: #000000;
        font-weight: bold;
      }
      .repo-list {
        display:inline-grid;
        grid-template-columns: 3fr 1fr 1fr;
        font-size: 20px;
        grid-gap: 20px;
        .repo-name {
          text-align: left;
          a {
            text-decoration: none;
            color: #54A3FF;
          }
        }
        .repo-watchers, .repo-stars {
          text-align: left;
          float: right;
        }
      }
      > div {
        width: 100%;
        margin-bottom: 1%;
      }
    }
  }
</style>