<template>
  <div class="hello">
    <h3>Installed CLI Plugins</h3>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Please check your connection, login feature is not available offline.
    </div>

    <div
      v-show="!networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="login"
    >
      Login with Twitter
    </div>
  </div>
</template>

<script>
import Backendless from 'backendless'
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({ loginError: null }),
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  methods: {
    async login() {
      Backendless.UserService.loginWithTwitter(undefined, true)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  margin-top: 10vh;

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>
