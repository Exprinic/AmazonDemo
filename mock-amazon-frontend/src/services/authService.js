import axios from 'axios';

// 设置axios默认配置
axios.defaults.baseURL = 'http://localhost:8080/api';

// 请求拦截器：添加认证token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器：处理认证错误
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // 清除本地存储的token和用户信息
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];

            // 可以在这里触发全局的登出事件或重定向到登录页
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// 认证API服务
export const authService = {
    // 用户登录
    login: async (email, password) => {
        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Login failed',
                error: error
            };
        }
    },

    // 用户注册
    register: async (email, password, firstName, lastName) => {
        try {
            const response = await axios.post('/auth/register', {
                email,
                password,
                firstName,
                lastName
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Registration failed',
                error: error
            };
        }
    },

    // 获取当前用户信息
    getCurrentUser: async () => {
        try {
            const response = await axios.get('/auth/user');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to get user info',
                error: error
            };
        }
    },

    // 更新用户信息
    updateUser: async (userId, userData) => {
        try {
            const response = await axios.put(`/users/${userId}`, userData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to update user',
                error: error
            };
        }
    },

    // 修改密码
    changePassword: async (userId, currentPassword, newPassword) => {
        try {
            const response = await axios.post(`/auth/change-password`, {
                userId,
                currentPassword,
                newPassword
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to change password',
                error: error
            };
        }
    },

    // 请求密码重置
    requestPasswordReset: async (email) => {
        try {
            const response = await axios.post('/auth/forgot-password', { email });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to request password reset',
                error: error
            };
        }
    },

    // 重置密码
    resetPassword: async (token, newPassword) => {
        try {
            const response = await axios.post('/auth/reset-password', {
                token,
                newPassword
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to reset password',
                error: error
            };
        }
    },

    // 验证token
    verifyToken: async (token) => {
        try {
            const response = await axios.post('/auth/verify-token', { token });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Token verification failed',
                error: error
            };
        }
    },

    // 登出
    logout: () => {
        // 清除本地存储
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];

        return {
            success: true,
            message: 'Logged out successfully'
        };
    },

    // 检查认证状态
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    // 获取存储的token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // 获取存储的用户信息
    getUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // 设置认证token
    setAuthToken: (token) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    // 设置用户信息
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

export default authService;