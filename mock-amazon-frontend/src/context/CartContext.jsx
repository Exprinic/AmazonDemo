import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            fetchCart();
        } else {
            setCart(null);
            setLoading(false);
        }
    }, [currentUser]);

    const fetchCart = async () => {
        try {
            const cartData = await getCart();
            setCart(cartData);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (productId, quantity = 1) => {
        try {
            const updatedCart = await addToCart(productId, quantity);
            setCart(updatedCart);
            return { success: true };
        } catch (error) {
            console.error('Error adding item to cart:', error);
            return { success: false, message: error.response?.data || 'Failed to add item to cart' };
        }
    };

    const updateItem = async (productId, quantity) => {
        try {
            const updatedCart = await updateCartItem(productId, quantity);
            setCart(updatedCart);
            return { success: true };
        } catch (error) {
            console.error('Error updating cart item:', error);
            return { success: false, message: error.response?.data || 'Failed to update item' };
        }
    };

    const removeItem = async (productId) => {
        try {
            const updatedCart = await removeFromCart(productId);
            setCart(updatedCart);
            return { success: true };
        } catch (error) {
            console.error('Error removing item from cart:', error);
            return { success: false, message: error.response?.data || 'Failed to remove item' };
        }
    };

    const clearAll = async () => {
        try {
            await clearCart();
            setCart(null);
            return { success: true };
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { success: false, message: error.response?.data || 'Failed to clear cart' };
        }
    };

    const value = {
        cart,
        loading,
        addItem,
        updateItem,
        removeItem,
        clearAll,
        refreshCart: fetchCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};