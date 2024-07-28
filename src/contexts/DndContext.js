import React, { createContext, useState,useContext,useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const DndContext = createContext();

export const DndProvider = ({ children }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const droppedItemsRef = useRef(droppedItems);
  useEffect(() => {
    droppedItemsRef.current = droppedItems;
  }, [droppedItems]);
  const addDroppedItem = (item, position) => {
    const newItem = {...item, id: uuidv4(), position};
    setDroppedItems((prevItems) => [...prevItems, newItem]);
  };
  const updateDroppedItemPosition = (id, position) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, position } : item
      )
    );
  };
  const removeDroppedItem = (id) => {
    setDroppedItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };
  return (
    <DndContext.Provider value={{ droppedItems, addDroppedItem, updateDroppedItemPosition,removeDroppedItem,droppedItemsRef }}>
      {children}
    </DndContext.Provider>
  );
};
// Custom hook to use auth context
export const useDnd = () => {
    return useContext(DndContext);
};