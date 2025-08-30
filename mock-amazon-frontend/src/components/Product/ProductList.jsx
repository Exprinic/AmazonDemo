import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err.response) {
        // 服务器返回了错误状态码
        setError(`服务器错误: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // 请求已发出但没有收到响应
        setError('无法连接到服务器，请检查后端服务是否启动并在端口8080上运行');
      } else {
        // 其他错误
        setError(`请求错误: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-list-loading">加载中...</div>;
  }

  if (error) {
    return (
      <div className="product-list-error">
        <p>错误: {error}</p>
        <button onClick={fetchProducts} className="retry-button">
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
