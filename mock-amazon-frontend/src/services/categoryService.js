import axios from 'axios';

export const categoryService = {
    // 获取所有分类
    getAllCategories: async () => {
        try {
            const response = await axios.get('/api/categories');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to fetch categories',
                error: error
            };
        }
    },

    // 获取顶级分类
    getTopLevelCategories: async () => {
        try {
            const response = await axios.get('/api/categories/top');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to fetch top categories',
                error: error
            };
        }
    },

    // 获取子分类
    getSubcategories: async (parentId) => {
        try {
            const response = await axios.get(`/api/categories/${parentId}/subcategories`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to fetch subcategories',
                error: error
            };
        }
    },

    // 搜索分类
    searchCategories: async (query) => {
        try {
            const response = await axios.get(`/api/categories/search?q=${query}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to search categories',
                error: error
            };
        }
    },

    // 根据ID获取分类
    getCategoryById: async (id) => {
        try {
            const response = await axios.get(`/api/categories/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to fetch category',
                error: error
            };
        }
    },

    // 创建分类
    createCategory: async (categoryData) => {
        try {
            const response = await axios.post('/api/categories', categoryData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to create category',
                error: error
            };
        }
    },

    // 更新分类
    updateCategory: async (id, categoryData) => {
        try {
            const response = await axios.put(`/api/categories/${id}`, categoryData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to update category',
                error: error
            };
        }
    },

    // 删除分类
    deleteCategory: async (id) => {
        try {
            await axios.delete(`/api/categories/${id}`);
            return {
                success: true,
                message: 'Category deleted successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Failed to delete category',
                error: error
            };
        }
    }
};

export default categoryService;