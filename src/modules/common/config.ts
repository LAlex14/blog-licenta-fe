import {DEFAULT_API_URL} from "@/modules/common/utils/linkUtils";

const apiHost = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

const BASE_URL = apiHost;
export const API_URL = `${BASE_URL}/api`;
export const DEFAULT_APP_TITLE = 'Blog Licenta'

export default {
  BASE_URL,
  API_URL,
};
