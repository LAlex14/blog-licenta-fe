import axios from 'axios';

function commonParams(params = {}) {
  return {
    ...params,
    perPage: 9999,
  }
}

export default {

  async getBlogs(params) {
    const {data} = await axios.get('/restify/blogs?related=category,creator', {params: commonParams(params)});
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
        }
      }
    })
    return data;
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

}
