import axios from 'axios';

function commonParams(params = {}) {
  return {
    ...params,
    perPage: 9999,
  }
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
