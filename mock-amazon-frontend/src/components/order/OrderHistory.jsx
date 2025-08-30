import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import ImageWithFallback from '../common/ImageWithFallback';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            fetchOrders();
        }
    }, [currentUser]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="order-history-loading">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return <div className="order-history-empty">You haven't placed any orders yet.</div>;
    }

    return (
        <div className="order-history">
            <h2>Your Orders</h2>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <div className="order-date">ORDER PLACED: {formatDate(order.createdAt)}</div>
                                <div className="order-total">TOTAL: ${order.totalAmount.toFixed(2)}</div>
                                <div className="order-status">STATUS: {order.status.name}</div>
                            </div>
                            <div className="order-actions">
                                <button className="order-action-btn">View Order Details</button>
                            </div>
                        </div>

                        <div className="order-items">
                            {order.items.map(item => (
                                <div key={item.id} className="order-item">
                                    <ImageWithFallback
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="order-item-image"
                                    />
                                    <div className="order-item-details">
                                        <h3 className="order-item-name">{item.product.name}</h3>
                                        <div className="order-item-quantity">Quantity: {item.quantity}</div>
                                        <div className="order-item-price">${item.price.toFixed(2)} each</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;