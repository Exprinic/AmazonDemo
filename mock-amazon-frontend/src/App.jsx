import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Cart from './components/cart/Cart'
import Home from './components/Home'
import Navbar from './components/common/Navbar'
import CategoryNavbar from './components/layout/CategoryNavbar'
import './App.css'

// 主应用内容组件
function AppContent() {
    const [authModal, setAuthModal] = useState(null) // 'login' or 'register'
    const [showCart, setShowCart] = useState(false)
    const { currentUser, logout } = useAuth()
    const { cart } = useCart()

    const handleAuthModalClose = () => {
        setAuthModal(null)
    }

    const handleSwitchToRegister = () => {
        setAuthModal('register')
    }

    const handleSwitchToLogin = () => {
        setAuthModal('login')
    }

    const handleCartToggle = () => {
        if (!currentUser) {
            setAuthModal('login')
        } else {
            setShowCart(!showCart)
        }
    }

    return (
        <div className="App">
            <Navbar
                onAuthClick={() => setAuthModal('login')}
                onCartClick={handleCartToggle}
                cartItemCount={cart?.totalItems || 0}
                currentUser={currentUser}
                onLogout={logout}
            />

            <CategoryNavbar />

            <main className="main-content">
                <Home />
            </main>

            {/* 认证模态窗口 */}
            {authModal === 'login' && (
                <Login
                    onClose={handleAuthModalClose}
                    switchToRegister={handleSwitchToRegister}
                />
            )}

            {authModal === 'register' && (
                <Register
                    onClose={handleAuthModalClose}
                    switchToLogin={handleSwitchToLogin}
                />
            )}

            {/* 购物车模态窗口 */}
            {showCart && (
                <Cart onClose={() => setShowCart(false)} />
            )}
        </div>
    )
}

// 包装主应用内容
function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <AppContent />
            </CartProvider>
        </AuthProvider>
    )
}

export default App