import publicBlogsService from "@/modules/blogs/services/publicBlogsService.js";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState} from "@/store";

export type State = {
  blogs: [];
}

export const state = (): State => ({
  blogs: []
})

const mutations: MutationTree<State> = {
  setBlogs(state: State, blogs: []) {
    state.blogs = blogs;
  },
};

const actions: ActionTree<State, RootState> = {
  async getPublicBlogs({commit, dispatch}, params) {
    try {
      const {data} = await publicBlogsService.getBlogs(params);
      commit('setBlogs', data);
    } catch (err) {
      console.warn(err)
    }
  },
  async getBlogBySlug({state}, slug) {
    const blog = state.blogs.find(blog => blog['slug'] === slug)
    if (blog) {
      return blog;
    }

    return await publicBlogsService.getBlogBySlug(slug);
  }
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
