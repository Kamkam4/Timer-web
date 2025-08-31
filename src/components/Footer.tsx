import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  // ვიღებთ მიმდინარე წელს ავტომატურად
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>
        &copy; {currentYear} გიორგი კამკამიძე <a href="https://github.com"></a>
      </p>
    </footer>
  );
};

export default Footer;