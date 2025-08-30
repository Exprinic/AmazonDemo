import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../common/Modal';
import './Auth.css';

const Register = ({ onClose, switchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError("Passwords don't match");
            return;
        }

        setIsLoading(true);
        setError('');

        const result = await register(email, password);

        if (result.success) {
            onClose();
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Create Account" size="sm">
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="auth-error">{error}</div>}

                <div className="auth-form-group">
                    <label htmlFor="reg-email">Your name</label>
                    <input
                        type="text"
                        id="name"
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label htmlFor="reg-email">Email</label>
                    <input
                        type="email"
                        id="reg-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label htmlFor="reg-password">Password</label>
                    <input
                        type="password"
                        id="reg-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label htmlFor="reg-password-confirm">Re-enter password</label>
                    <input
                        type="password"
                        id="reg-password-confirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create your Amazon account'}
                </button>
            </form>

            <div className="auth-terms">
                By creating an account, you agree to Amazon's
                <a href="#">Conditions of Use</a> and
                <a href="#">Privacy Notice</a>.
            </div>

            <div className="auth-divider">
                <span>Already have an account?</span>
            </div>

            <button
                className="auth-signin-btn"
                onClick={switchToLogin}
            >
                Sign in
            </button>
        </Modal>
    );
};

export default Register;