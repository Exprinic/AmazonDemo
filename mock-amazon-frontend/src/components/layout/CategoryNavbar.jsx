import { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import './CategoryNavbar.css';

const CategoryNavbar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            // 从API获取分类数据
            const result = await categoryService.getAllCategories();

            if (result.success) {
                setCategories(result.data);
            } else {
                setError(result.message);

                // 如果API失败，使用数据库中的分类名称作为模拟数据
                const dbCategories = [
                    { id: 1, name: "Electronics" },
                    { id: 2, name: "Computers & Accessories" },
                    { id: 3, name: "Smartphones & Accessories" },
                    { id: 4, name: "Home & Kitchen" },
                    { id: 5, name: "Furniture" },
                    { id: 6, name: "Appliances" },
                    { id: 7, name: "Books" },
                    { id: 8, name: "Fiction" },
                    { id: 9, name: "Non-Fiction" }
                ];
                setCategories(dbCategories);
            }
        } catch (err) {
            setError('Failed to fetch categories');
            console.error('Error fetching categories:', err);

            // 使用数据库中的分类名称作为模拟数据
            const dbCategories = [
                { id: 1, name: "Electronics" },
                { id: 2, name: "Computers & Accessories" },
                { id: 3, name: "Smartphones & Accessories" },
                { id: 4, name: "Home & Kitchen" },
                { id: 5, name: "Furniture" },
                { id: 6, name: "Appliances" },
                { id: 7, name: "Books" },
                { id: 8, name: "Fiction" },
                { id: 9, name: "Non-Fiction" }
            ];
            setCategories(dbCategories);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <nav className="category-navbar">
                <div className="category-navbar-container">
                    <div className="category-navbar-loading">Loading categories...</div>
                </div>
            </nav>
        );
    }

    if (error && categories.length === 0) {
        return (
            <nav className="category-navbar">
                <div className="category-navbar-container">
                    <div className="category-navbar-error">{error}</div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="category-navbar">
            <div className="category-navbar-container">
                <ul className="category-navbar-list">
                    {/* 添加"All"分类 */}
                    <li key="all" className="category-navbar-item">
                        <a href="#" className="category-navbar-link">
                            All
                        </a>
                    </li>

                    {/* 显示数据库中的分类 */}
                    {categories.map(category => (
                        <li key={category.id} className="category-navbar-item">
                            <a href="#" className="category-navbar-link">
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default CategoryNavbar;