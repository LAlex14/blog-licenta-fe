import BlogsService from "@/modules/blogs/services/BlogsService.js";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import store, {RootState} from "@/store";

export type State = {
  blogs: [];
  publicBlogs: [];
  categories: [];
  authors: [];
  pinnedBlogs: [];
}

export const state = (): State => ({
  blogs: [],
  publicBlogs: [],
  categories: [],
  authors: [],
  pinnedBlogs: []
})

const mutations: MutationTree<State> = {
  setBlogs(state: State, blogs: []) {
    state.blogs = blogs;
  },
  setPublicBlogs(state: State, blogs: []) {
    state.publicBlogs = blogs;
  },
  setCategories(state: State, categories: []) {
    state.categories = categories;
  },
  setAuthors(state: State, authors: []) {
    state.authors = authors;
  },
  setPinnedBlogs(state: State, blogs: []) {
    state.pinnedBlogs = blogs;
  },
};

const actions: ActionTree<State, RootState> = {
  async getPublicBlogs({commit}, params) {
    try {
      const {data} = await BlogsService.getPublicBlogs(params);
      commit('setPublicBlogs', data);
    } catch (err) {
      throw err
    }
  },

  async getBlogs({commit}, params) {
    try {
      const blogs = await BlogsService.getBlogs(params);
      commit('setBlogs', blogs);
    } catch (err) {
      throw err
    }
  },
  async getCategories({commit}, params) {
    try {
      const categories = await BlogsService.getCategories(params);
      commit('setCategories', categories);
    } catch (err) {
      throw err
    }
  },
  async getAuthors({commit}, params) {
    try {
      const authors = await BlogsService.getAuthors(params);
      commit('setAuthors', authors);
    } catch (err) {
      throw err
    }
  },
  async pinBlog({state}, params) {
    try {
      const {blogId, users} = params;
      const blog = state.blogs.find(blog => blog['id'] === blogId);
      if (blog['is_pinned']) {
        await BlogsService.unpinBlog(blogId, users);
      } else {
        await BlogsService.pinBlog(blogId, users);
      }
      // @ts-ignore
      blog['is_pinned'] = !blog['is_pinned'];
    } catch (err) {
      throw err
    }
  },
  async addViewOnBlog({state}, blogId) {
    try {
      await BlogsService.addViewOnBlog(blogId);
      const blog = state.blogs.find(blog => blog['id'] === blogId);
      blog['views']++;
    } catch (err) {
      throw err
    }
  }
};
const getters: GetterTree<State, RootState> = {
  blogs: state => store.state.auth.isLoggedIn ? state.blogs : state.publicBlogs,
  categories: state => state.categories,
  authors: state => state.authors,
}

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default module;
