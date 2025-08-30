import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ImageWithFallback from '../common/ImageWithFallback';
import './Product.css';

const ProductCard = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);
    const { addItem } = useCart();
    const { currentUser } = useAuth();

    const handleAddToCart = async () => {
        if (!currentUser) {
            alert('Please sign in to add items to cart');
            return;
        }

        setIsAdding(true);
        const result = await addItem(product.id, 1);

        if (!result.success) {
            alert(result.message || 'Failed to add item to cart');
        }

        setIsAdding(false);
    };

    const getStockStatus = () => {
        if (product.stockQuantity > 10) {
            return { text: 'In Stock', className: 'in-stock' };
        } else if (product.stockQuantity > 0) {
            return { text: `Only ${product.stockQuantity} left in stock`, className: 'low-stock' };
        } else {
            return { text: 'Out of Stock', className: 'out-of-stock' };
        }
    };

    const stockStatus = getStockStatus();

    return (
        <div className="product-card">
            <div className="product-image-container">
                <ImageWithFallback
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>

                <div className="product-price">${product.price.toFixed(2)}</div>

                <div className="product-rating">
                    <span className="product-stars">★★★★☆</span>
                    <span className="product-review-count">(123)</span>
                </div>

                {product.categories && product.categories.length > 0 && (
                    <div className="product-category">
                        {product.categories[0].name}
                    </div>
                )}

                <div className={`product-stock ${stockStatus.className}`}>
                    {stockStatus.text}
                </div>
            </div>

            <div className="product-actions">
                <button
                    className="product-add-to-cart"
                    onClick={handleAddToCart}
                    disabled={isAdding || product.stockQuantity === 0}
                >
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
