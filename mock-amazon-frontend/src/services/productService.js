import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error.response) {
      // 服务器返回了错误状态码
      throw new Error(`服务器错误: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // 请求已发出但没有收到响应
      throw new Error('无法连接到服务器，请检查后端服务是否启动');
    } else {
      // 其他错误
      throw new Error(`请求错误: ${error.message}`);
    }
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.response) {
      throw new Error(`服务器错误: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('无法连接到服务器，请检查后端服务是否启动');
    } else {
      throw new Error(`请求错误: ${error.message}`);
    }
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get('/products/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    if (error.response) {
      throw new Error(`服务器错误: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('无法连接到服务器，请检查后端服务是否启动');
    } else {
      throw new Error(`请求错误: ${error.message}`);
    }
  }
};
