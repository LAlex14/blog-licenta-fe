import BlogsService from "@/modules/blogs/services/BlogsService.js";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState} from "@/store";

export type State = {
  blogs: object;
}

export const state = (): State => ({
  blogs: {}
})

const mutations: MutationTree<State> = {
  setBlogs(state: State, blogs: object) {
    state.blogs = blogs;
  },
};

const actions: ActionTree<State, RootState> = {
  async getPublicBlogs({commit, dispatch}, params) {
    try {
      const {data} = await BlogsService.getPublicBlogs(params);
      commit('setBlogs', data);
    } catch (err) {
      console.warn(err)
    }
  },
};
const getters: GetterTree<State, RootState> = {
  blogs: state => state.blogs,
}

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default module;
