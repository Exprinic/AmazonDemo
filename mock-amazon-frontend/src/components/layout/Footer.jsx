import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* 返回顶部 */}
                <div className="footer-back-to-top">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Back to top
                    </button>
                </div>

                {/* 主要链接部分 */}
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>Get to Know Us</h3>
                        <ul>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">About Amazon</a></li>
                            <li><a href="#">Investor Relations</a></li>
                            <li><a href="#">Amazon Devices</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Make Money with Us</h3>
                        <ul>
                            <li><a href="#">Sell products on Amazon</a></li>
                            <li><a href="#">Sell on Amazon Business</a></li>
                            <li><a href="#">Sell apps on Amazon</a></li>
                            <li><a href="#">Become an Affiliate</a></li>
                            <li><a href="#">Advertise Your Products</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Amazon Payment Products</h3>
                        <ul>
                            <li><a href="#">Amazon Business Card</a></li>
                            <li><a href="#">Shop with Points</a></li>
                            <li><a href="#">Reload Your Balance</a></li>
                            <li><a href="#">Amazon Currency Converter</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Let Us Help You</h3>
                        <ul>
                            <li><a href="#">Amazon and COVID-19</a></li>
                            <li><a href="#">Your Account</a></li>
                            <li><a href="#">Your Orders</a></li>
                            <li><a href="#">Shipping Rates & Policies</a></li>
                            <li><a href="#">Returns & Replacements</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="footer-bottom">
                    <div className="footer-logo">
                        <span>mockamazon</span>
                    </div>
                    <div className="footer-copyright">
                        &copy; {new Date().getFullYear()} Mock Amazon. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;