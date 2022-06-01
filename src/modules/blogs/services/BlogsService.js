import axios from 'axios';
import {toBase64} from "@/modules/common/utils/imageUtils";

function commonParams(params = {}) {
  return {
    ...params,
    perPage: 9999,
  }
}

async function blogToSend(blog) {
  blog.category_id = blog.category.id;
  delete blog.category;
  blog.private = blog.private ? 1 : 0;
  console.log(blog)
  if (typeof blog.image !== 'string') {
    blog.image = await toBase64(blog.image);
  }
  return blog;
}

export default {

  async getPublicBlogs(params) {
    const {data} = await axios.get('/blogs', {params: commonParams(params)});
    return data;
  },

  async getBlogs(params) {
    const {data} = await axios.get('/restify/blogs?related=category,creator,comments', {params: commonParams(params)});
    data.forEach((blog, index) => {
      data[index] = {
        id: blog.id,
        ...blog.attributes,
        category: {
          ...blog.relationships.category.attributes,
          id: blog.relationships.category.id
        },
        creator: {
          ...blog.relationships.creator.attributes,
          id: blog.relationships.creator.id
        },
        comments: [
          ...blog.relationships.comments.map(el => {
            return {
              ...el.attributes,
              id: el.id
            }
          })
        ]
      }
    })
    return data;
  },

  async createBlog(blog) {
    blog = await blogToSend(blog);
    console.log(blog)
    try {
      const {data} = await axios.post(`/restify/blogs/`, blog);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async editBlog(blog, blogId) {
    blog = await blogToSend(blog);
    try {
      const {data} = await axios.post(`/restify/blogs/${blogId}`, blog);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async deleteBlog(blogId) {
    try {
      await axios.delete(`/restify/blogs/${blogId}`);
    } catch (error) {
      throw error;
    }
  },

  async saveComment(commentId, text) {
    const {data} = await axios.put('/restify/comments/' + commentId, {
      text
    });
    return {
      ...data.attributes,
      id: data.id
    }
  },

  async postComment(params) {
    const {data} = await axios.post('/restify/comments', params);
    return {
      ...data.attributes,
      id: data.id
    }
  },

  async deleteComment(commentId) {
    await axios.delete('/restify/comments/' + commentId);
  },

  async getCategories(params) {
    const {data} = await axios.get('/restify/categories', {params: commonParams(params)});
    data.forEach((category, index) => {
      data[index] = {
        id: category.id,
        name: category.attributes.name
      }
    })
    return data;
  },

  async getAuthors(params) {
    const {data} = await axios.get('/restify/users', {params: commonParams(params)});
    data.forEach((author, index) => {
      data[index] = {
        id: author.id,
        ...author.attributes
      }
    })
    return data;
  },

  async pinBlog(blogId, users) {
    const {data} = await axios.post(`/restify/blogs/${blogId}/attach/users`, {users});
    return data;
  },

  async unpinBlog(blogId, users) {
    const {data} = await axios.post(`/restify/blogs/${blogId}/detach/users`, {users});
    return data;
  },

  async addViewOnBlog(blogId) {
    await axios.post(`/restify/blogs/${blogId}/actions?action=add-view-on-blog`);
  },

  async addReadingOnBlog(blogId) {
    await axios.post(`/restify/blogs/${blogId}/actions?action=add-readings-on-blog`);
  }
}
