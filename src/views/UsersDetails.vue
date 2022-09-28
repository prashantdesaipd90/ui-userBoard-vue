<template>
  <div class="detail" data-test="detailsWrapper">
    <div id="go-back" aria-label="go-back" tabindex="1" @click="navigateToList" data-test="goBackBtn">
    </div>
    <div class="pokemon-details">
      <img v-if="usersDetails.avatar_url" class="user-image" :src=usersDetails.avatar_url :alt=usersDetails.login height=300 width=300/>
      <img v-else class="user-image" src="../assets/duck.svg" alt=usersDetails.login height=300 width=300/>
      <h1>{{ usersDetails.login }}</h1>
      <div v-for="(repo, index) in usersRepos" :key="'repo'+index" class="repo-list">
        <div class="repo-name">
          <a :href=repo.html_url target="_blank">
            {{ repo.name }}
          </a>
        </div>
        <div class="repo-watchers">{{ repo.watchers }}</div>
        <div class="repo-stars">{{ repo.forks }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
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
      const username = this.$route.path.substring(1).split('/');
      this.fetchUsersDetails(username);
      this.fetchUsersRepos(username);
      window.scrollTo(0, 0);
    },
    methods: {
      navigateToList() {
        this.$router.push({ name: "UsersList" });
      },
      ...mapActions("UsersStore", ["fetchUsersDetails", "fetchUsersRepos"])
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
    .pokemon-details {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      .user-image {
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
        .repo-name {
          text-align: left;
        }
        .repo-watchers, .repo-stars {
          text-align: right;
        }
      }
      > div {
        width: 100%;
        margin-bottom: 2%;
      }
      .image-info-panel {
        display: flex;
        .image {
          padding: 0 8% 0 0;
          img {
            background: #022964;
            border-radius: 5%;
            padding: 10px;
            width: 18em;
            height: 18em;
            box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                        0 10px 10px rgba(0, 0, 0, .2);
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: inherit;
          .data-item {
            font-size: 18px;
            padding: 2%;
            border-bottom: 1px solid #DEE4EA;
            .left {
              float: left;
            }
            .right {
              float: right;
            }
          }
        }
      }
      .types-panel, .ability-panel, .moves-panel {
        h3 {
          border-bottom: 1px solid #DEE4EA;
          margin: 0 0 15px 0;
          padding: 0 0 10px 0;
        }
        > div {
          display: inline-block;
          padding: 5px 10px;
          margin: 5px 15px 10px 0;
          border-radius: 15px;
          font-size: 18px;
          color: #ffffff;
        }
      }
      .type {
        background: #D6CD33;
      }
      .ability {
        background: #A52620;
      }
      .moves {
        background: #022964;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 919px) {
    .detail {
      width: 90%;
      .pokemon-details {
        .image-info-panel {
          .image {
            img {
              width: 8em;
              height: 8em;
            }
          }
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 519px) {
    .detail {
      .pokemon-details {
        .image-info-panel {
          display: block;
          .image {
            padding: 0;
            text-align: center;
            img {
              width: 10em;
              height: 10em;
            }
          }
        }
      }
    }
  }
</style>