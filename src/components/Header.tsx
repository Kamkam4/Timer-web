import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { FiSettings } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userControlsRef = useRef<HTMLDivElement>(null);

  // გარეთ დაკლიკების ლოგიკა
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userControlsRef.current && !userControlsRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header">
      <div className="logo">
        <NavLink to="/">ტაიმერი</NavLink>
      </div>
      
      <div className="user-controls" ref={userControlsRef}>
        <div className={`inline-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><NavLink to="/">ტაიმერი</NavLink></li>
            <li><NavLink to="/presets">შაბლონები</NavLink></li>
          </ul>
        </div>

        <button 
          className="settings-btn" 
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <FiSettings size={24} />
        </button>

        {/* პროფილის სურათი (ავატარი) წაშლილია */}
      </div>
    </header>
  );
};

export default Header;