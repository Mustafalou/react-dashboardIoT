import { useParams } from 'react-router-dom';
import { useDnd } from '../contexts/DndContext';
import { DndProvider } from '../contexts/DndContext';
import DroppedItem from './items/DroppedItem';
import GaugeItem from './items/GaugeItem';
import React, { useContext, useState, useEffect } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const DroppableArea = () => {
    const {projectid,pageid} = useParams();
    const {droppedItems,addDroppedItem,updateDroppedItemPosition,removeDroppedItem,droppedItemsRef} = useDnd();
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ['TEXT',"GAUGE","NAV"],
      drop: (item, monitor) => {
        const offset = monitor.getClientOffset();
        const dropArea = document.getElementById('drop-area').getBoundingClientRect();
        const x = offset.x - dropArea.left-item.offset.x;
        const y = offset.y - dropArea.top-item.offset.y;

        const currentDroppedItems = droppedItemsRef.current;
        const existingItem = currentDroppedItems.find(droppedItem => droppedItem.id === item.id);
        if (existingItem) {
            updateDroppedItemPosition(item.id, { x, y });
        } else {
            addDroppedItem(item, { x, y });
            
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));
    useEffect(() => {
      console.log("after",droppedItems);
    }, [droppedItems]);
    return (
      <div
      id='drop-area'
      ref={drop}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'darkgray',
        position: 'relative',
      }}
    >
        {droppedItems.length === 0 && <p>Drop items here</p>}
        {droppedItems.map((item, index) => (
            <DroppedItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    );
  };
  export default DroppableArea;