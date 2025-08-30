import axios from 'axios';

export const getCart = async () => {
    const response = await axios.get('/api/cart');
    return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await axios.post('/api/cart/add', null, {
        params: { productId, quantity }
    });
    return response.data;
};

export const updateCartItem = async (productId, quantity) => {
    const response = await axios.put('/api/cart/update', null, {
        params: { productId, quantity }
    });
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await axios.delete('/api/cart/remove', {
        params: { productId }
    });
    return response.data;
};

export const clearCart = async () => {
    await axios.delete('/api/cart/clear');
};