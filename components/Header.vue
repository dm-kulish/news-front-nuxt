<template>
  <client-only> 
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >

  <v-tabs id="tabs">
    <v-tab v-show="$route.path!='/'">
      <Nuxt-link to="/">Main Page</Nuxt-link>
    </v-tab>
  </v-tabs>

  <div
    id="not-authed-user-bar"
    v-if="!isAuth"
  >

    <v-btn
      id="head-btn-auth"
      color="black"
      elevation="15"
      large
      v-on:click="updateAuthWindow(true)"
    >
      Sign In
    </v-btn>

    <AuthForm
    />

    <v-btn
      id="head-btn-register"
      color="purple darken-1"
      elevation="15"
      large
      v-on:click="updateRegisterWindow(true)"
    >
      Sign Up
    </v-btn>

    <RegisterForm
    />

  </div>

  <div
    v-else
    id="auth-user-bar"
  >

    <v-chip
      id="user-label"
      close-icon="mdi-close-outline"
      color="green"
    >
      <Nuxt-link :to="{name: 'users', params: {id: getUserId }}">{{ getUsername }}</Nuxt-link>
    </v-chip>

    <v-avatar
      id="avatar"
      color="teal"
      size="46"
    >
      <v-img
        :src="getMyAva"
      >
      </v-img>
    </v-avatar>

    <v-btn
      id="head-btn-logout"
      color="teal lighten-1"
      elevation="15"
      large
      v-on:click="logoutUser()"
    >
      Log Out
    </v-btn>
  
  </div>

  </v-app-bar>
  </client-only>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';


export default {
  name: 'Header',

  methods: {
    ...mapMutations('user', ['updateAuthWindow', 'updateRegisterWindow']),
    ...mapActions('user', ['logoutUser']),
  },

  // async mounted() {
  //   await this.$store.dispatch('user/getUser');
  // },

  computed: mapGetters('user', ['isAuth', 'getUsername', 'getMyAva', 'getUserId']),
}
</script>


<style scoped>
  #head {
    min-width: 400px;
  }
  #head *{
    display: flex;
    justify-content: space-between;
  }

  #not-authed-user-bar {
    margin-right: 45px;
  }

  #auth-user-bar {
    margin-right: 15px;
  }

  #head-btn-register {
    order: -1;
    margin-right: 10px;
  }

  #head-btn-logout {
    margin-right: -20px;
  }
  #user-label, .v-avatar {
    place-self: center;
    margin-right: 8px;
  }

  .v-application a {
    color: white;
    text-decoration: none;
  }

  .v-toolbar__content, .v-toolbar__extension {

}
  .v-chip {
    cursor: pointer;
  }
</style>