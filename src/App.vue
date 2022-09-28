<template>
  <div id="app" data-test="usersApp">
    <header data-test="header">
      <div class="left-panel">
        <a href="/"><img src="./assets/github.svg" alt="github logo"></a>
        <div class="heading">{{ constants.metaData.heading }}</div>
      </div>
      <div class="right-panel" v-if="showSearch">
        <div class="filter-component">
          <input class="search-field" tabindex="2" type="text" @keyup="viewSearch()" v-model="usersSearchQuery" :placeholder=constants.metaData.search />
        </div>
      </div>
    </header>
    <div class="container">
      <router-view />
    </div>
    <footer data-test="footer">
      <a href="/"><img src="./assets/github.svg" alt="github logo"></a>
      <div class="copyright-text">&#169; {{ constants.metaData.footer }}</div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { constants } from "./lib/constants";
export default {
  name: "App",
  data: () => {
    return {
      constants,
      usersSearchQuery: "",
    }
  },
  computed: {
    ...mapState("UsersStore", [
      "showSearch"
    ])
  },
  methods: {
    viewSearch() {
      this.setSearchQuery(this.usersSearchQuery);
    },
    ...mapMutations("UsersStore", [
      "setSearchQuery"
    ])
  },
}
</script>

<style lang="scss">
  // This will act as a global css as there is no scoped mention
  @import url('https://fonts.googleapis.com/css?family=Acme');
  @import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
  body {
    margin: 0;
    padding: 0;
    font-family: 'Acme', arial;
  }
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    width: calc(100% - 20px);
    min-height: calc(100vh - 28vh);
    background: #ffffff;
    font-family: 'Acme', arial;
    font-size: 1rem;
    font-weight: normal;
  }
  header {
    box-shadow: 0px 12px 36px rgba(204, 204, 204, 0.25);
    background: #24292F;
    padding: 20px 48px;
    height: 40px;
    color: #ffffff;
    .left-panel {
      float: left;
      .heading {
        display: inline-block;
        margin-left: 16px;
        position: absolute;
        top: 32px;
      }
    }
    .right-panel {
      float: right;
      .search-field {
        padding: 3% 4%;
        border: 1px solid #D1D1D1;
        font-size: 17px;
        border-radius: 12px;
        width: 100%;
        box-shadow: 0 5px 10px rgba(0,0,0,.2),
                    0 5px 10px rgba(0,0,0,.2);
      }
    }
  }
  footer {
    background: #24292F;
    box-shadow: 0px -12px 36px rgba(0, 0, 0, 0.25);
    color: #ffffff;
    height: 80px;
    padding: 20px 48px;
    text-align: center;
    margin: 0 auto;
    font-size: 10px;
    .copyright-text {
      margin-top: 20px;
    }
  }
</style>
