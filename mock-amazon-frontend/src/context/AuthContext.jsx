import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(JSON.parse(userData));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            const { token, email: userEmail, firstName, lastName } = response.data;

            localStorage.setItem('token', token);
            const user = { email: userEmail, firstName, lastName };
            localStorage.setItem('user', JSON.stringify(user));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(user);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Login failed'
            };
        }
    };

    const register = async (firstName, lastName, email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                firstName,
                lastName,
                email,
                password
            });
            const { token, email: userEmail, firstName: userFirstName, lastName: userLastName } = response.data;

            localStorage.setItem('token', token);
            const user = { email: userEmail, firstName: userFirstName, lastName: userLastName };
            localStorage.setItem('user', JSON.stringify(user));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(user);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

