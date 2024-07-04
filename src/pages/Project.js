// Step 4: Use the Chart Component in App.js
import React, { useEffect } from 'react';
import ChartComponent from '../components/ChartComponent';
import mqtt from 'mqtt';

const Project = () => {
  const [messages, setMessages] = React.useState([]);
  useEffect(() => {
    // Initialize the MQTT client
    const mqttClient = mqtt.connect('ws://192.168.1.2:9001',{
      username: 'technivor',
      password: 'bdzaa$'
    });

    // Handle connection
    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker via Websockets');
      mqttClient.subscribe('test', (err) => {
        if (err) {
          console.error('Error subscribing to topic:', err);
        } else {
          console.log('Subscribed to test');
        }
      });
    });

    // Handle incoming messages
    mqttClient.on('message', (topic, message) => {
      const timestamp = new Date().toISOString();
      setMessages((prevMessages) => [...prevMessages, { topic, message, timestamp }]);
    });

    // Handle errors
    mqttClient.on('error', (err) => {
      console.error('Connection error:', err);
    });

    // Handle disconnection
    mqttClient.on('close', () => {
      console.log('Connection closed');
    });

    // Cleanup on unmount
    return () => {
      mqttClient.end();
      console.log('Disconnected from MQTT broker');
    };
  }, []);
  const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000).toISOString();
  const filteredMessages = messages.filter(msg => msg.timestamp > oneHourAgo);
  return (
    <div className="App">
      <header className="App-header">
        <ChartComponent data={filteredMessages}/>
      </header>
    </div>
  );
}

export default Project;