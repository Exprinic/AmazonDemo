import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import Modal from '../common/Modal';
import './Cart.css';

const Cart = ({ onClose }) => {
    const { cart, updateItem, removeItem, clearAll } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    if (!cart || cart.items.length === 0) {
        return (
            <Modal isOpen={true} onClose={onClose} title="Shopping Cart" size="md">
                <div className="cart-empty">
                    <p>Your Amazon Cart is empty</p>
                    <button className="cart-continue-shopping" onClick={onClose}>
                        Continue Shopping
                    </button>
                </div>
            </Modal>
        );
    }

    const handleQuantityChange = async (productId, newQuantity) => {
        setIsLoading(true);
        await updateItem(productId, newQuantity);
        setIsLoading(false);
    };

    const handleRemoveItem = async (productId) => {
        setIsLoading(true);
        await removeItem(productId);
        setIsLoading(false);
    };

    const handleClearCart = async () => {
        setIsLoading(true);
        await clearAll();
        setIsLoading(false);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Shopping Cart" size="lg">
            <div className="cart-items">
                {cart.items.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                        disabled={isLoading}
                    />
                ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total">
                    Subtotal ({cart.totalItems} items):
                    <span className="cart-total-price">${cart.totalPrice.toFixed(2)}</span>
                </div>

                <div className="cart-actions">
                    <button
                        className="cart-clear-btn"
                        onClick={handleClearCart}
                        disabled={isLoading}
                    >
                        Clear Cart
                    </button>
                    <button
                        className="cart-checkout-btn"
                        disabled={isLoading}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Cart;