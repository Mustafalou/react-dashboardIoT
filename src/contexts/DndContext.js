import React, { createContext, useState,useContext,useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from '../axiosConfig';

export const DndContext = createContext();

export const DndProvider = ({ children }) => {
  const {projectid, pageid} = useParams();
  const [droppedItems, setDroppedItems] = useState([]);
  const droppedItemsRef = useRef(droppedItems);

  useEffect(() => {
    axios.get(`/projects/${projectid}/pages/${pageid}/dropped-items`, {withCredentials: true})
      .then((response) => {
        setDroppedItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectid, pageid]);
  const saveDroppedItems = () => {
    axios.post(`/projects/${projectid}/pages/${pageid}/dropped-items`, { droppedItems, withCredentials: true })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error saving dropped items:', error);
      });
  };
  
  useEffect(() => {
    droppedItemsRef.current = droppedItems;
    if (droppedItemsRef.current.length > 0){
      saveDroppedItems();
    };
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
  const updateDroppedItemSettings = (id, newSettings) => {
    setDroppedItems(
      droppedItems.map((droppedItem) =>
        droppedItem.id === id ? { ...droppedItem, settings: { ...droppedItem.settings, ...newSettings } } : droppedItem
      )
    );
  };
  return (
    <DndContext.Provider value={{ droppedItems, addDroppedItem, updateDroppedItemPosition,removeDroppedItem,droppedItemsRef,updateDroppedItemSettings }}>
      {children}
    </DndContext.Provider>
  );
};
// Custom hook to use auth context
export const useDnd = () => {
    return useContext(DndContext);
};