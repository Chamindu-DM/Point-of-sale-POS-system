import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidePanel.css';

const SidePanel = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState('');
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: 'fas fa-tachometer-alt',
            path: '/'
        },
        {
            title: 'Sales',
            icon: 'fas fa-shopping-cart',
            path: '/sales'
        },
        {
            title: 'Products',
            icon: 'fas fa-box',
            submenu: [
                { title: 'View Products', path: '/products' },
                { title: 'Add Product', path: '/products/add' },
                { title: 'Inventory', path: '/inventory' }
            ]
        },
        /*
        {
            title: 'Reports',
            icon: 'fas fa-chart-bar',
            path: '/reports'
        }
        */
    ];

    const handleSubmenuToggle = (itemTitle) => {
        setActiveSubmenu(activeSubmenu === itemTitle ? '' : itemTitle);
    };

    return (
        <div className={`side-panel ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="branch-selector">
                <select>
                    <option>Main Branch</option>
                    <option>Branch 2</option>
                    <option>Branch 3</option>
                </select>
            </div>

            <nav className="side-nav">
                {menuItems.map((item) => (
                    <div key={item.title} className="nav-item-container">
                        <Link
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => item.submenu && handleSubmenuToggle(item.title)}
                        >
                            <i className={item.icon}></i>
                            <span>{item.title}</span>
                            {item.submenu && (
                                <svg
                                    className={`chevron-icon ${activeSubmenu === item.title ? 'rotate' : ''}`}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </Link>
                        {item.submenu && activeSubmenu === item.title && (
                            <div className="submenu">
                                {item.submenu.map((subitem) => (
                                    <Link
                                        key={subitem.title}
                                        to={subitem.path}
                                        className={`submenu-item ${location.pathname === subitem.path ? 'active' : ''}`}
                                    >
                                        {subitem.title}
                                    </Link>
                                    
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
            </button>

            <div className="bottom-nav">
                <Link to="/settings" className="nav-item">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                </Link>
                <button className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SidePanel;