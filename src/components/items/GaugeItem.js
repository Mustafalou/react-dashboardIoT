import React, { useContext, useState, useEffect } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import GaugeChart from 'react-gauge-chart';
import { useDnd } from '../../contexts/DndContext';
import { useMqtt } from '../../contexts/MqttContext';
import SettingsModal from '../SettingsModal';

const GaugeItem = ({id, style, settingsData}) => {
  const { removeDroppedItem, updateDroppedItemSettings } = useDnd();
  const [settings, setSettings] = useState(settingsData?settingsData:{title:"gauge chart",data_name:"test" });
  const { data, subscribe, unsubscribe } = useMqtt();
  const [{ isDragging }, drag] = useDrag(() => ({
      type: 'GAUGE',
      item: (monitor)=>{ 
        const clientOffset = monitor.getClientOffset();
          const element = monitor.getSourceClientOffset();
          const offset = {
              x: clientOffset.x - element.x,
              y: clientOffset.y - element.y,
          };
          console.log(id)
          return { id, offset, type: 'GAUGE', settings };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSettingsSave = (newSettings) => {
      if (id!=="1" && newSettings.data_name !== settings.data_name) {
          unsubscribe(settings.data_name);
          subscribe(newSettings.data_name);
          console.log("subscribed to",newSettings.data_name)
      }
      setSettings(newSettings);
      updateDroppedItemSettings(id, newSettings);
    };
    useEffect(() => {
      if (settings.data_name) {
          subscribe(settings.data_name);
      }

      return () => {
          if (settings.data_name) {
              unsubscribe(settings.data_name);
          }
      };
    }, [settings.data_name, subscribe, unsubscribe]); 
    /*useEffect(() => {
      console.log("data",data)
    }, [data]);*/
    return (
      <div ref={drag} style={{...style,opacity: isDragging ? 0.5 : 1, cursor: 'move'}}>
      <h3 style={{textAlign:"center"}}>{settings.title}</h3> {/* Add your title here */}
      <GaugeChart
        id={`gauge-chart-${id}`}
        nrOfLevels={3}
        percent={id==='1'?0.6:data[settings.data_name]/100 || 0}
        textColor="black"
        arcPadding={0.02}
        cornerRadius={3}
        arcWidth={0.3}
        colors={["#FF5F6D", "#FFC371"]}
        style={{ width: '100%', height: '100%' }}
        animate={false}
      />
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
export default GaugeItem;