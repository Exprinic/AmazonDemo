import { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryMenu.css';

const CategoryMenu = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories/top');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="category-menu-loading">Loading categories...</div>;
    }

    return (
        <div className="category-menu">
            <h3 className="category-menu-title">Shop by Category</h3>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.id} className="category-item">
                        <button
                            className="category-link"
                            onClick={() => onCategorySelect(category)}
                        >
                            {category.name}
                        </button>
                        {category.children && category.children.length > 0 && (
                            <ul className="subcategory-list">
                                {category.children.map(subcategory => (
                                    <li key={subcategory.id} className="subcategory-item">
                                        <button
                                            className="subcategory-link"
                                            onClick={() => onCategorySelect(subcategory)}
                                        >
                                            {subcategory.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryMenu;