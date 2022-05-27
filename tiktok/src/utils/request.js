import axios from 'axios';

const request = axios.create({
  baseURL: `https://tiktok.fullstack.edu.vn/api/`,
});

export const get = async (path, optinos = {}) => {
  try {
    const response = await request.get(path, optinos);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default request;
