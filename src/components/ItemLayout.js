import React, { useContext, useState } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './ItemLayout.css';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaTools } from 'react-icons/fa';
import { useDnd } from '../contexts/DndContext';
import { DndProvider } from '../contexts/DndContext';
const DraggableItem = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        border: '1px solid gray',
        marginBottom: '4px',
      }}
    >
      {text}
    </div>
  );
};

const DroppableArea = () => {
  const {droppedItems,addDroppedItem} = useDnd();
  console.log(droppedItems);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) =>{
      const offset = monitor.getClientOffset();
      addDroppedItem(item, offset);

    } ,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'darkgray',
        padding: '0px',
      }}
    >
{droppedItems.length === 0 && <p>Drop items here</p>}
      {droppedItems.map((item, index) => (
        <div 
          key={index} 
          style={{ 
            padding: '8px', 
            border: '1px solid black', 
            margin: '4px', 
            position: 'absolute',
            left: item.position.x - 50, // Adjust the x and y position to center the item
            top: item.position.y - 50   // Adjust the x and y position to center the item
          }}
        >
          {item.item.text}
        </div>
      ))}
    </div>
  );
};

const ItemLayout = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ];

  const handleIconClick = (icon) => {
    setSelectedIcon(icon === selectedIcon ? null : icon); // Toggle sidebar visibility
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDrop = (id) => {
    const droppedItem = items.find((item) => item.id === id);
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
                {items.map((item) => (
                  <DraggableItem key={item.id} id={item.id} text={item.text} />
                ))}
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
