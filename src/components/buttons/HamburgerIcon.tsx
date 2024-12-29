import React, { useState } from 'react';
import './HamburgerIcon.css'; // Import your CSS file for styling

interface HamburgerIconProps {
  onClick: () => void;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <div className="bar" />
      <div className="bar" />
    </div>
  );
};

export default HamburgerIcon;
