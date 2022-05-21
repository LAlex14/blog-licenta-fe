import axios from 'axios';

export default {

  async getBlogs(params) {
    const {data} = await axios.get('/blogs', {params});
    return data;
  },

  async getBlogBySlug(slug) {
    console.log('getbyslug')
    const {data} = await axios.get(`/blogs/${slug}`);
    return data;
  }
}
