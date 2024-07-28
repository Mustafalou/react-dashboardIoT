import React, { useContext, useState } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import GaugeChart from 'react-gauge-chart';
import { useDnd } from '../../contexts/DndContext';
const GaugeItem = ({id, style}) => {
  const { removeDroppedItem } = useDnd();
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'GAUGE',
      item: { id},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    return (
      <div ref={drag} style={{...style,opacity: isDragging ? 0.5 : 1, cursor: 'move', position: 'relative' }}>
      <GaugeChart
        id={`gauge-chart-${id}`}
        nrOfLevels={30}
        percent={0.6}
        textColor="black"
        arcPadding={0.02}
        cornerRadius={3}
        arcWidth={0.3}
        colors={["#FF5F6D", "#FFC371"]}
        style={{ width: '100%', height: '100%' }}
      />
      <button
        onClick={() => removeDroppedItem(id)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '2px 5px',
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>

    );
  };
export default GaugeItem;