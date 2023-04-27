<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpenAuthWindow"
      @click:outside="updateAuthWindow(false)"
      persistent
      width="600"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Auth</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                label="Email"
                required
                v-model="AuthForm.email"
              >
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                label="Password"
                type="password"
                required
                v-model="AuthForm.password"
              >
              </v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="updateAuthWindow(false)"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="authUser()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  
  
<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'AuthForm',

  data () {
    return {
      AuthForm: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    ...mapMutations('user', ['updateAuthWindow']),
    printData() {
      console.log(this.AuthForm)
    },
    authUser() {
      this.$store
      .dispatch('user/authUser', this.AuthForm)
      .then(() => {
        this.AuthForm.email = '',
        this.AuthForm.password = '',
        this.closeForm()
    })
      },

  },
  computed: mapGetters('user', ['isAuth', 'isOpenAuthWindow']),

}
  
</script>
  
<style scoped>

</style>