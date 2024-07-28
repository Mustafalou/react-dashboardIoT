import { useDnd } from '../contexts/DndContext';
import { DndProvider } from '../contexts/DndContext';
import GaugeItem from './items/GaugeItem';
import React, { useContext, useState, useEffect } from 'react';
import { DndProvider as BackendProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const DroppableArea = () => {
    const {droppedItems,addDroppedItem,updateDroppedItemPosition,removeDroppedItem,droppedItemsRef} = useDnd();
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'GAUGE',
      drop: (item, monitor) =>{
        const offset = monitor.getClientOffset();
        const currentDroppedItems = droppedItemsRef.current;
        console.log("before",currentDroppedItems)
        console.log(item.id)
        const existingItem = currentDroppedItems.find(droppedItem => droppedItem.id === item.id);
        if (existingItem){
          updateDroppedItemPosition(item.id, offset);
        } else {
          addDroppedItem(item, offset);
        }
      } ,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));
    useEffect(() => {
      console.log("after",droppedItems);
    }, [droppedItems]);
    return (
      <div
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
            <GaugeItem
            id={item.id}
            style={{ position: 'absolute', left: item.position.x, top: item.position.y }}
          />
        ))}
      </div>
    );
  };
  export default DroppableArea;