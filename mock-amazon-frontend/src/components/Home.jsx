import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Carousel from './common/Carousel';
import ProductCard from './product/ProductCard';
import Footer from './layout/Footer';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const { currentUser } = useAuth();

    // 轮播图图片路径
    const carouselImages = [
        '/images/carousel/carousel_1.jpg',
        '/images/carousel/carousel_2.jpg',
        '/images/carousel/carousel_3.jpg'
    ];

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            // 模拟API调用，实际项目中应该从API获取
            setTimeout(() => {
                const mockProducts = [
                    {
                        id: 1,
                        name: "Wireless Earbuds with Noise Cancellation",
                        price: 59.99,
                        imageUrl: "/images/products/wireless-earbuds.jpg",
                        stockQuantity: 100,
                        categories: [{ name: "Electronics" }]
                    },
                    {
                        id: 2,
                        name: "Smart Watch with Fitness Tracker",
                        price: 89.99,
                        imageUrl: "/images/products/smart-watch.jpg",
                        stockQuantity: 75,
                        categories: [{ name: "Electronics" }]
                    },
                    {
                        id: 3,
                        name: "Portable Bluetooth Speaker",
                        price: 39.99,
                        imageUrl: "/images/products/bluetooth-speaker.jpg",
                        stockQuantity: 50,
                        categories: [{ name: "Electronics" }]
                    },
                    {
                        id: 4,
                        name: "USB-C Charging Cable (3ft)",
                        price: 12.99,
                        imageUrl: "/images/products/usb-cable.jpg",
                        stockQuantity: 200,
                        categories: [{ name: "Electronics" }]
                    },
                    {
                        id: 5,
                        name: "Wireless Charging Pad",
                        price: 24.99,
                        imageUrl: "/images/products/wireless-charger.jpg",
                        stockQuantity: 80,
                        categories: [{ name: "Electronics" }]
                    }
                ];
                setFeaturedProducts(mockProducts);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching featured products:', error);
            setLoading(false);
        }
    };

    const handleSlideChange = (index) => {
        setCurrentSlideIndex(index);
    };

    return (
        <div
            className="home"
            style={{
                backgroundImage: `url(${carouselImages[currentSlideIndex]})`,
            }}
        >
            <div className="home-overlay">
                {/* 轮播图部分 */}
                <section className="carousel-section">
                    <div className="container">
                        <Carousel
                            images={carouselImages}
                            onSlideChange={handleSlideChange}
                        />
                    </div>
                </section>

                {/* 特色商品部分 */}
                <section className="featured-products">
                    <div className="container">
                        <h2 className="section-title">Featured Products</h2>

                        {loading ? (
                            <div className="loading">Loading products...</div>
                        ) : (
                            <div className="products-grid">
                                {featuredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* 底部导航栏 */}
                <Footer />
            </div>
        </div>
    );
};

export default Home;