import axios from 'axios';

export default {

  async getBlogs(params) {
    const {data} = await axios.get('/restify/blogs', {params});
    return data;
  },
}
