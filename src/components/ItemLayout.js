import React, { useContext, useState } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './ItemLayout.css';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaTools } from 'react-icons/fa';
import { useDnd } from '../contexts/DndContext';
import { DndProvider } from '../contexts/DndContext';
import GaugeItem from './items/GaugeItem';
import DroppableArea from './DroppableArea';
import TextItem from './items/TextItem';
import NavigateItem from './items/NavigateItem';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectAdmin from '../pages/ProjectAdmin';
const ItemLayout = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {projectid, pageid}= useParams();
  const handleIconClick = (icon) => {
    setSelectedIcon(icon === selectedIcon ? null : icon); // Toggle sidebar visibility
    if (icon=="home"&& pageid!=="0") {
      navigate(`/projects/${projectid}/edit/0`);
    }else if(pageid ==="0" && icon=="tools"){
      navigate(`/projects/${projectid}/edit/1`);
    }
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
        {selectedIcon &&selectedIcon!=="home" && (
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
                <TextItem id="1" text="Text" />
                <NavigateItem id="1" text="Navigate Item" />
              </div>
            )}
            {selectedIcon !== 'tools' && (
              <p>Content for {selectedIcon}</p>
            )}
          </div>
        )}
        {pageid === '0'?<ProjectAdmin />:<DroppableArea />}
      </div>
    </BackendProvider>
    </DndProvider>
  );
};

export default ItemLayout;
