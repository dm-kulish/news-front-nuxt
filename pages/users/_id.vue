<template>
  <div id="user-page">
    <div
      v-if="id"
      id="card-and-modal"
    >
      <v-card id="user-card" tile max-width="400">
        <v-col>
          <v-avatar size="150">
            <v-img :src="UserDataForm.avatar" />
          </v-avatar>
        </v-col>
        <v-col id="data-and-buttons">
          <div id="username">
            {{ UserDataForm.username }}
          </div>
          <div id="email">
            {{ UserDataForm.email }}
          </div>
          <div
            v-if="showUserActions()"
            id="user-btns"
          >
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="openOrCloseEditProfileWindow(true)"
            >
              Edit profile
            </v-btn>

            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="openPostFormToAdd"
            >
              Add Post
            </v-btn>
          </div>
        </v-col>
      </v-card>
      <v-dialog
        v-model="isOpenEditWindow"
        transition="dialog-top-transition"
      >
        <v-card
          id="edit-profile-form"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="UserDataForm.username"
                  label="Username"
                />

                <v-text-field
                  v-model="UserDataForm.email"
                  label="Email"
                  required
                />
              </v-col>
              <v-col>
                <v-file-input
                  v-model="UserDataForm.newAvatar"
                  chips
                  multiple
                  label="Change your ava?"
                  accept="image/*"
                  hint="not required"
                />

                <v-btn
                  @click="changeUserData"
                >
                  Change
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
    <div v-else>
      <v-progress-circular
        :size="100"
        :width="7"
        color="purple"
        indeterminate
      />
    </div>

    <v-alert
      v-show="!posts.length"
      outlined
      type="success"
      text
    >
      there are no posts yet :)
    </v-alert>

    <v-progress-circular
      v-show="!posts"
      :size="100"
      :width="7"
      color="purple"
      indeterminate
    />

    <Posts
      :filtered-posts="posts"
    />

    <PostForm
      v-if="$store.state.post.postWindow.isOpen"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserPage',

  data () {
    return {
      UserDataForm: {
        username: '',
        email: '',
        avatar: '',
        newAvatar: null
      },

      posts: [],

      isOpenEditWindow: false
    }
  },

  methods: {
    ...mapActions(['post/fetchPosts', 'post/getSomeUserPosts', 'user/getOtherUser']),
    async getUserData () {
      const { username, email, avatar } = await this.getOtherUser(this.id)
      this.UserDataForm.username = username
      this.UserDataForm.email = email
      this.UserDataForm.avatar = avatar
    },

    async getUserPosts () {
      this.posts = await this.getSomeUserPosts(this.id)
    },

    changeUserData () {
      this.$store.dispatch('changeUserData', this.UserDataForm)
        .then(() => {
          this.getUserData()
        })
        .then(() => this.openOrCloseEditProfileWindow(false))
    },

    openOrCloseEditProfileWindow (status) {
      this.isOpenEditWindow = status
    },

    showUserActions () {
      return this.id == this.$store.getters.getUserId
    },

    openPostFormToAdd () {
      this.$store.commit('updatePostWindow', { isOpen: true })
    },

    getUsername () {
      return this.UserDataForm.username
    }
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler () {
        this.getUserData()
      }
    },
    async allPosts () {
      await this.getUserPosts()
    }
  },

  async created () {
    this.fetchPosts()
    this.getUserData()
    this.getUserPosts()
  },

  computed: {
    ...mapGetters(['post/isOpenPostWindow', 'post/allPosts'])
  },

  props: ['id']
}
</script>

<style>
  #user-page {
  }

  #card-and-modal {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }

  @media (width < 801px) {
    #card-and-modal {
      justify-content: space-between;
    }
  }

  @media (width < 601px) {
    #card-and-modal {
      width: 90%;
      flex-direction: column;
      justify-content: center;
    }

    #user-card {

    }
    #edit-profile-form {

    }
  }

  #alerts-and-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #user-card {
    display: flex;
    align-self: center;
  }

  #data-and-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #user-btns {
    display: flex;;
    flex-direction: column;
    justify-content: center;
  }

  #edit-profile-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #add-post-form-card {
    overflow: hidden;
  }

</style>
