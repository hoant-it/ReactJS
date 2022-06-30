import axios from 'axios';

// console.log(process.env);

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  //`https://tiktok.fullstack.edu.vn/api/`
  // document.location.origin + document.location.pathname,
});

export const get = async (path, options = {}) => {
  try {
    const response = await httpRequest.get(path, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default httpRequest;
