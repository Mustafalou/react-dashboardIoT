import React, { createContext, useEffect, useState, useContext } from 'react';
import mqtt from 'mqtt';

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [data, setData] = useState({});
    useEffect(() => {
        const mqttClient = mqtt.connect('ws://192.168.1.63:9001',{
            username: 'technivor',
            password: 'bdzaa$',
          });

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
        });

        mqttClient.on('message', (topic, message) => {
            //console.log('Received message:', topic, message.toString());
            setData(prevData => ({
                ...prevData,
                [topic]: parseFloat(message.toString()),
            }));
        });

        setClient(mqttClient);
        mqttClient.subscribe('#');
        return () => {
            mqttClient.end();
        };
    }, []);

    const subscribe = (topic) => {
        if (client) {
            client.subscribe(topic, (err) => {
                if (err) {
                    console.error('Subscription error:', err);
                }
            });
        }
    };

    const unsubscribe = (topic) => {
        if (client) {
            client.unsubscribe(topic, (err) => {
                if (err) {
                    console.error('Unsubscription error:', err);
                }
            });
        }
    };

    return (
        <MqttContext.Provider value={{ data, subscribe, unsubscribe }}>
            {children}
        </MqttContext.Provider>
    );
};

export const useMqtt = () => {
    return useContext(MqttContext);
};
