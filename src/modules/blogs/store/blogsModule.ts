// @ts-nocheck
import BlogsService from "@/modules/blogs/services/BlogsService.js";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import store, {RootState} from "@/store";
import cloneDeep from 'lodash-es/cloneDeep';

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
  updateBlog(state: State, blog: {}) {
    const index = state.blogs.findIndex((item) => item.id === blog.id);
    state.blogs[index] = blog;
  }
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
  },

  async postComment({state, dispatch}, params) {
    try {
      const comment = await BlogsService.postComment(params);
      await dispatch('updateBlogComments', {
        comment,
        action: 'add'
      });
    } catch (err) {
      throw err
    }
  },

  async updateComment({state, dispatch}, params) {
    try {
      const {commentId, text} = params;
      const comment = await BlogsService.saveComment(commentId, text);
      await dispatch('updateBlogComments', {
        comment,
        action: 'update'
      });
    } catch (err) {
      throw err
    }
  },

  async deleteComment({state, dispatch}, comment) {
    try {
      await BlogsService.deleteComment(comment.id);
      await dispatch('updateBlogComments', {
        comment,
        action: 'delete'
      });
    } catch (err) {
      throw err
    }
  },

  async updateBlogComments({state, commit}, params) {
    const {comment, action} = params;
    const blogCopy = cloneDeep(state.blogs.find(blog => String(blog['id']) === String(comment['blog_id'])));

    if (action === 'add') {
      blogCopy['comments'].push(comment);
    }

    if (action === 'delete') {
      const index = blogCopy['comments'].findIndex(blogComm => blogComm['id'] === comment['id']);
      blogCopy['comments'].splice(index, 1);
    }

    if (action === 'update') {
      const index = blogCopy['comments'].findIndex(blogComm => blogComm['id'] === comment['id']);
      blogCopy['comments'][index] = comment;
    }

    commit('updateBlog', blogCopy);
  },
};
const getters: GetterTree<State, RootState> = {
  blogs: state => store.state.auth.isLoggedIn ? state.blogs : state.publicBlogs,
  categories: state => state.categories,
  authors: state => state.authors,
  authorById: state => authorId => state.authors.find(author => author['id'] === String(authorId)),
  blogBySlug: state => slug => state.blogs.find(blog => blog['slug'] === slug),
}

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default module;
