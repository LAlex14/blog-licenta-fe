// @ts-nocheck
import BlogsService from "@/modules/blogs/services/BlogsService.js";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import store, {RootState} from "@/store";
import cloneDeep from 'lodash-es/cloneDeep';
import {colors} from "@/modules/common/utils/colorsUtils";

let colorsCopy = [];
export const categoryColorsClass = {}

function getColorClasses() {
  if (!colorsCopy.length) {
    colorsCopy = cloneDeep(colors);
  }
  const randomIndex = Math.floor(Math.random() * colorsCopy.length);
  const color = colorsCopy[randomIndex];
  colorsCopy.splice(randomIndex, 1);
  return `bg-${color}-100 text-${color}-800`;
}

export type State = {
  blogs: [];
  publicBlogs: [];
  categories: [];
  authors: [];
  pinnedBlogs: [];
  categoryColorsClass: {};
}

export const state = (): State => ({
  blogs: [],
  publicBlogs: [],
  categories: [],
  authors: [],
  pinnedBlogs: [],
  categoryColorsClass: categoryColorsClass,
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

  async deleteBlog({commit, state}, blogId) {
    try {
      await BlogsService.deleteBlog(blogId);
      const blogIndex = state.blogs.findIndex((item) => item.id === blogId);
      if (blogIndex === -1) {
        return
      }
      state.blogs.splice(blogIndex, 1);
    } catch (err) {
      throw err
    }
  },

  async getCategories({commit, dispatch}, params) {
    try {
      const categories = await BlogsService.getCategories(params);
      commit('setCategories', categories);
      dispatch('initCategoryColors');
    } catch (err) {
      throw err
    }
  },

  initCategoryColors({state}) {
    state.categories.forEach((category) => {
      state.categoryColorsClass[category.id] = getColorClasses(category.name);
    });
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
  blogBySlug: state => slug => {
    const blogs = store.state.auth.isLoggedIn ? state.blogs : state.publicBlogs;
    return blogs.find(blog => blog['slug'] === slug);
  },
  categoryColorsClass: state => state.categoryColorsClass,
}

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default module;
