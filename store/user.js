import { axios_request, BASE_URL } from '~/api/post'
export const state = () => ({
    userToken: null,
    userID: null,
    username: null,
    avatar: null,

    someUserData: {},

    authWindowIsOpen: false,
    registerWindowIsOpen: false

  })

  export const actions = {
    async createUser (ctx, regForm) {
      const FD = new FormData()
      FD.append('username', regForm.username)
      FD.append('email', regForm.email)
      FD.append('password', regForm.password)
      FD.append('avatar', regForm.avatar[0])
      try {
        // console.log('creating', regForm)
        const { data } = await axios_request
        .post('/signup/', FD, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        ctx.commit('updateUser', data)
        this.dispatch('user/authUser', data)
      }
      catch (e) {
        return e
      }
    },

    async changeUserData (ctx, changingForm) {
      // const token = localStorage.getItem('token')
      const FD = new FormData()
      FD.append('username', changingForm.username)
      FD.append('email', changingForm.email)
      if (changingForm.newAvatar) {
        FD.append('avatar', changingForm.newAvatar[0])
      }
      await axios_request
        .patch('/me/', FD, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: 'Token ' + token
          }
        }
        )
        .then((res) => { if (res.status === 204) { this.dispatch('getUser') } })
        .catch((err) => { return err })
    },

    async authUser (ctx, authForm) {
      try {
        const { data } = await axios_request
          .post('/token/login/', {
            email: authForm.email,
            password: authForm.password
          })
          ctx.commit('updateUser', { token: data.access })
          localStorage.setItem('token', data.access)
          this.dispatch('user/getUser', data.access)
      }
      catch (e) {
        console.log(e)
        return e
      }
    },

    logoutUser (ctx) {
      // localStorage.removeItem('token')
      const null_data = {
        token: null,
        id: null,
        username: null
      }
      ctx.commit('updateUser', null_data)
    },

    async getUser (ctx, token=localStorage.getItem('token')) {
      // const token = localStorage.getItem('token')
      // const token = ''
      if (token) {
        await axios_request.get('/me/', {
          headers: {
            Authorization: 'Token ' + token
          }
        })
          .then((res) => {
            if (res.statusText === 'OK') {
              const server_data = {
                // token,
                id: res.data.id,
                username: res.data.username,
                avatar: BASE_URL + res.data.avatar
              }
              ctx.commit('updateUser', server_data)
            }
          })
      }
    },

    async getOtherUser (ctx, id) {
      try {
        const { data } = await axios_request('/users/?id=' + id)
        return {
          username: data.username,
          email: data.email,
          avatar: BASE_URL + data.avatar
        }
      } catch (err) {
        // todo
      }
    }
  }

  export const mutations = {
    updateUser (state, some_data) {
      state.userToken = some_data.token || null
      state.userID = some_data.id || state.userID
      state.username = some_data.username || state.username
      state.avatar = some_data.avatar || state.avatar
    },

    updateAuthWindow (state, status) {
      state.authWindowIsOpen = status
    },

    updateRegisterWindow (state, status) {
      state.registerWindowIsOpen = status
    }

  }

  export const getters = {
    isAuth (state) {
      return !!state.userToken
    },

    getUsername (state) {
      return state.username
    },

    getUserId (state) {
      return state.userID
    },

    getMyAva (state) {
      return state.avatar
    },

    isOpenAuthWindow (state) {
      return state.authWindowIsOpen
    },

    isOpenRegisterWindow (state) {
      return state.registerWindowIsOpen
    }
  }
