import Vue from 'vue'
import Vuex from 'vuex'
import { HANDLE_POPUP } from '../constants/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Job: {
      namespaced: true,
      state: {
        openPopup: false
      },
      getters: {
        openPopup: state => {
          return state.openPopup;
        }
      },
      mutations: {
        HANDLE_POPUP: (state, payload) => {
          return state.openPopup = !state.openPopup;
        }
      },
      actions: {
        handlePopup: (context, payload) => {
          context.commit(HANDLE_POPUP, payload)
        }
      }
    }
  }
})