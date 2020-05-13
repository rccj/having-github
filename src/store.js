import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const store = new Vuex.Store({
  state: {
    repos: [],
    userInit: 'rccj',
    like:[],
  },
  mutations: {
    setRepos(state, data) {
      state.repos = data
    },

    addLike(state, data) {
      let findData = state.like.some(item => {
        return item.html_url == data.html_url
      })

      if (!findData) {
        state.like.push(data)
      } else {
        state.like.forEach((item, index) => {
          if (item.html_url == data.html_url) {
            state.like.splice(index, 1)
          }
        })
      }
      localStorage.setItem('likeRepos', JSON.stringify(state.like));
    },
    setLike(state) {
      state.like = JSON.parse(localStorage.getItem('likeRepos')) || []
    },
    setUser(state,payload){
      state.userInit = payload
    }
  },
  getters: {
    itemInLike(state) {
      return (data) => {
        return state.like.some(item => {
          return item.html_url == data.html_url
        })
      }
    }
  },
  actions: {
    getRepos({ commit,state }, payload) {
      axios.get(`https://api.github.com/users/${state.userInit}/repos?sort=updated&per_page=${payload}`)
        .then(res => {
          commit('setRepos', res.data)
        })
        .catch(function (error) {
          // Error
          console.log(error);
          // Error 的詳細資訊
          console.log(error.response);
        })
    }
  },
})

export default store