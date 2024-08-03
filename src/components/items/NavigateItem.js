import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDnd } from '../../contexts/DndContext';
import SettingsModal from '../SettingsModal';
import { useNavigate } from 'react-router-dom';

const NavigateItem = ({ id, style,settingsData }) => {
  const { removeDroppedItem, updateDroppedItemSettings } = useDnd();
  const [settings, setSettings] = useState(settingsData?settingsData:{ title: "Navigate Item", goto: "2" });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NAV',
    item: (monitor) => {
      const clientOffset = monitor.getClientOffset();
      const element = monitor.getSourceClientOffset();
      const offset = {
        x: clientOffset.x - element.x,
        y: clientOffset.y - element.y,
      };
      return { id, offset, type: 'NAV', settings };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    updateDroppedItemSettings(id, newSettings);
  };

  const handleClick = () => {
    if (id !== "1") {
      navigate(`/projects/1/edit/${settings.goto}`);
    }
  };

  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <div onClick={handleClick} style={{minWidth:'60px',textAlign: 'center', lineHeight: '50px', backgroundColor: '#f0f0f0', borderRadius: '4px', cursor: 'pointer' }}>
        {settings.title}
      </div>
      {id !== "1" && (
        <>
          <label
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'absolute',
              top: 0,
              right: 24,
              padding: '2px 5px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            ⚙
          </label>
          <label
            onClick={() => removeDroppedItem(id)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '2px 5px',
              fontSize: '12px',
              cursor: 'pointer',
              color: 'red',
            }}
          >
            X
          </label>
        </>
      )}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSettingsSave}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
};

export default NavigateItem;
