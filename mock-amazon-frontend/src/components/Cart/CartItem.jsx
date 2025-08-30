import { useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import './Cart.css';

const CartItem = ({ item, onQuantityChange, onRemove, disabled }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        onQuantityChange(item.product.id, newQuantity);
    };

    const handleRemove = () => {
        onRemove(item.product.id);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <ImageWithFallback
                    src={item.product.imageUrl}
                    alt={item.product.name}
                />
            </div>

            <div className="cart-item-details">
                <h3 className="cart-item-title">{item.product.name}</h3>
                <p className="cart-item-price">${item.product.price.toFixed(2)}</p>

                <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                    <select
                        id={`quantity-${item.id}`}
                        value={quantity}
                        onChange={handleQuantityChange}
                        disabled={disabled}
                    >
                        {[...Array(10).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="cart-item-remove"
                    onClick={handleRemove}
                    disabled={disabled}
                >
                    Delete
                </button>
            </div>

            <div className="cart-item-subtotal">
                ${(item.product.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;