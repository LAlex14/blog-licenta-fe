import axios from 'axios';
import {hasToken} from "@/modules/auth/utils/tokenUtils";

export default {

  async getPublicBlogs(params) {
    let endpoint = '/blogs'
    if (hasToken()) {
      endpoint = '/restify/blogs'
    }
    const {data} = await axios.get(endpoint, {params});
    console.log(data)
    return data;
  },

}
