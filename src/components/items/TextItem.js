import React, { useContext, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useDnd } from '../../contexts/DndContext';
import SettingsModal from '../SettingsModal';

const TextItem = ({ id, style,settingsData }) => {
  const { removeDroppedItem ,updateDroppedItemSettings} = useDnd();
  const [settings, setSettings] = useState(settingsData?settingsData:{ title: "text item"});
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TEXT',
    item: (monitor) => {
      const clientOffset = monitor.getClientOffset();
      const element = monitor.getSourceClientOffset();
      const offset = {
        x: clientOffset.x - element.x,
        y: clientOffset.y - element.y,
      };
      return { id, offset, type: 'TEXT', settings };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    updateDroppedItemSettings(id, newSettings);
  };

  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <h3 style={{ textAlign: "center" }}>{settings.title}</h3>
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

export default TextItem;
