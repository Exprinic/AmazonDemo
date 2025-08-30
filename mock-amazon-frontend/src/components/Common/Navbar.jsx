import { useAuth } from '../../context/AuthContext';
import Dropdown from '../common/Dropdown';
import './Navbar.css';

const Navbar = ({ onAuthClick, onCartClick, cartItemCount, currentUser, onLogout }) => {
    return (
        <nav className="navbar">
            <a href="#" className="navbar-logo">mockamazon</a>

            <div className="navbar-search">
                <input type="text" placeholder="Search products..." />
                <button>Search</button>
            </div>

            <div className="navbar-links">
                <Dropdown
                    trigger={
                        <a href="#" className="navbar-link">
              <span className="navbar-link-small">
                {currentUser ? `Hello, ${currentUser.firstName || currentUser.email}` : 'Hello, Sign in'}
              </span>
                            <span className="navbar-link-large">
                {currentUser ? 'Account & Lists' : 'Account & Lists'}
              </span>
                        </a>
                    }
                    position="right"
                    className="account-dropdown"
                    alignWidth={true}
                >
                    {currentUser ? (
                        <>
                            <button className="dropdown-item" onClick={() => alert('Account page would open here')}>
                                Your Account
                            </button>
                            <button className="dropdown-item" onClick={() => alert('Orders page would open here')}>
                                Your Orders
                            </button>
                            <button className="dropdown-item" onClick={() => alert('Wish List page would open here')}>
                                Your Wish List
                            </button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={onLogout}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button className="dropdown-item" onClick={onAuthClick}>
                            Sign In
                        </button>
                    )}
                </Dropdown>

                <a href="#" className="navbar-link">
                    <span className="navbar-link-small">Returns</span>
                    <span className="navbar-link-large">& Orders</span>
                </a>

                <a
                    href="#"
                    className="navbar-cart"
                    onClick={(e) => {
                        e.preventDefault();
                        onCartClick();
                    }}
                >
                    <span style={{fontSize: '20px', marginRight: '5px'}}>🛒</span>
                    <span className="navbar-link-large">Cart</span>
                    {cartItemCount > 0 && (
                        <span className="cart-badge">{cartItemCount}</span>
                    )}
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
