import React, { useContext, useState } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './ItemLayout.css';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaTools } from 'react-icons/fa';
import { useDnd } from '../contexts/DndContext';
import { DndProvider } from '../contexts/DndContext';
import GaugeItem from './items/GaugeItem';
import DroppableArea from './DroppableArea';

const ItemLayout = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleIconClick = (icon) => {
    setSelectedIcon(icon === selectedIcon ? null : icon); // Toggle sidebar visibility
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <DndProvider>
    <BackendProvider backend={HTML5Backend}>
      <div className="main-container">
        <div className="sidebar">
          <ul>
            <li className={selectedIcon === 'tools' ? 'selected' : ''}>
              <a href="#" onClick={() => handleIconClick('tools')}><FaTools /></a>
            </li>
            <li className={selectedIcon === 'home' ? 'selected' : ''}>
              <a href="#" onClick={() => handleIconClick('home')}><FaHome /></a>
            </li>
            <li className={selectedIcon === 'info' ? 'selected' : ''}>
              <a href="#" onClick={() => handleIconClick('info')}><FaInfoCircle /></a>
            </li>
            <li className={selectedIcon === 'services' ? 'selected' : ''}>
              <a href="#" onClick={() => handleIconClick('services')}><FaServicestack /></a>
            </li>
            <li className={selectedIcon === 'contact' ? 'selected' : ''}>
              <a href="#" onClick={() => handleIconClick('contact')}><FaEnvelope /></a>
            </li>
          </ul>
        </div>
        {selectedIcon && (
          <div className={`second-sidebar ${selectedIcon ? 'open' : ''}`}>
            <h2>{selectedIcon.charAt(0).toUpperCase() + selectedIcon.slice(1)}</h2>
            {selectedIcon === 'tools' && (
              <div className="tools-content">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-bar"
                />
                <GaugeItem id="1" text="Gauge" />
              </div>
            )}
            {selectedIcon !== 'tools' && (
              <p>Content for {selectedIcon}</p>
            )}
          </div>
        )}
        <DroppableArea />
      </div>
    </BackendProvider>
    </DndProvider>
  );
};

export default ItemLayout;
