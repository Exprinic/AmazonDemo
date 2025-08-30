import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../common/Modal';
import './Auth.css';

const Login = ({ onClose, switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await login(email, password);

        if (result.success) {
            onClose();
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Sign In" size="sm">
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="auth-error">{error}</div>}

                <div className="auth-form-group">
                    <label htmlFor="email">Email or mobile phone number</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="auth-terms">
                By continuing, you agree to Amazon's
                <a href="#">Conditions of Use</a> and
                <a href="#">Privacy Notice</a>.
            </div>

            <div className="auth-help">
                <a href="#">Need help?</a>
            </div>

            <div className="auth-divider">
                <span>New to Amazon?</span>
            </div>

            <button
                className="auth-create-account-btn"
                onClick={switchToRegister}
            >
                Create your Amazon account
            </button>
        </Modal>
    );
};

export default Login;