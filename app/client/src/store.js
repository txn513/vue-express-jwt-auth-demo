import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

import { goRegister, goLogin } from './api'

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    ['AUTH_REQUEST'](state) {
        state.status = 'loading';
    },
    ['AUTH_SUCCESS'](state, token, user) {
        state.status = 'success';
        state.token = token;
        state.user = user;
    },
    ['AUTH_ERROR'](state) {
        state.status = 'error';
    },
    ['LOGOUT'](state) {
        state.status = ''; 
        state.token = '';
    }
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('AUTH_REQUEST')
          goLogin(user)
          .then(res => {
            const token = res.data.token
            const user = res.data.user
            commit('AUTH_SUCCESS', token, user)
            resolve(res)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    register({commit}, user){
        return new Promise((resolve, reject) => {
          commit('AUTH_REQUEST')
          goRegister(user)
          .then(res => {
            const token = res.data.token
            const user = res.data.user
            commit('AUTH_SUCCESS', token, user)
            resolve(res)
          })
          .catch(err => {
            commit('AUTH_ERROR', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      logout({commit}){
        return new Promise((resolve, reject) => {
          commit('LOGOUT')
          localStorage.removeItem('token')
          resolve()
        })
      }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})