import AuthService from "@/modules/auth/services/AuthService.js";
import {error} from '@/components/common/NotificationPlugin';
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState} from "@/store";
import router from "@/router/router";

export type State = {
  isLoggedIn: boolean;
  user: object;
}

export const state = (): State => ({
  isLoggedIn: false,
  user: {},
})

const mutations: MutationTree<State> = {
  setLoggedIn(state: State, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn;
  },
  setUser(state: State, value: object) {
    state.user = value;
  },
};

const actions: ActionTree<State, RootState> = {
  async login({commit}, loginData) {
    try {
      const {user, token} = await AuthService.login(loginData);
      const {plainTextToken} = token;
      commit('setLoggedIn', true);
      commit('setUser', user);
      AuthService.setToken(plainTextToken);
      await router.push('/');
    } catch (err) {
      throw err
    }
  },
  async register({commit}, data) {
    try {
      await AuthService.register(data)
    } catch (err) {
      throw err
      throw err
    }
  },
  async getProfile({commit}) {
    try {
      const res = await AuthService.getProfile();
      const user = {
        ...res?.attributes,
        id: res.id,
      }
      commit('setLoggedIn', true);
      commit('setUser', user);
    } catch (err) {
      if (err.handled || err.code.includes('ECONNABORTED')) {
        return
      }
      error('An error occurred while trying to update the profile')
    }
  },
  async updateProfile({commit, state}, data) {
    try {
      const res = await AuthService.updateProfile(data);
      const user = {
        ...state.user,
        ...res?.data?.attributes,
      }
      commit('setUser', user)
    } catch (err) {
      if (err.handled) {
        return
      }
      error('Could not update your profile.')
    }
  },
  async logout({commit}) {
    await window.stop();
    commit('setLoggedIn', false);
    await AuthService.resetData();
  }
};
const getters: GetterTree<State, RootState> = {
  user: state => state.user,
}

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default module;
