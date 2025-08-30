import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ trigger, children, position = 'left', className = '', alignWidth = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const [dropdownWidth, setDropdownWidth] = useState('auto');

    useEffect(() => {
        if (alignWidth && triggerRef.current) {
            setDropdownWidth(`${triggerRef.current.offsetWidth}px`);
        }
    }, [alignWidth]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`dropdown ${className}`} ref={dropdownRef}>
            <div className="dropdown-trigger" ref={triggerRef} onClick={toggleDropdown}>
                {trigger}
            </div>
            {isOpen && (
                <div
                    className={`dropdown-menu dropdown-menu-${position}`}
                    style={{ width: dropdownWidth }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;