import React, { createContext, useState,useContext } from 'react';

export const DndContext = createContext();

export const DndProvider = ({ children }) => {
  const [droppedItems, setDroppedItems] = useState([]);

  const addDroppedItem = (item, position) => {
    setDroppedItems((prevItems) => [...prevItems, {item, position}]);
  };

  return (
    <DndContext.Provider value={{ droppedItems, addDroppedItem }}>
      {children}
    </DndContext.Provider>
  );
};
// Custom hook to use auth context
export const useDnd = () => {
    return useContext(DndContext);
};