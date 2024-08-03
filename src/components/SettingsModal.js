import React from 'react';

const SettingsModal = ({ isOpen, onClose, onSave, settings, setSettings }) => {
    if (!isOpen) return null;

    const handleInputChange = (key, value) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };
    const handleSave = () => {
        onSave(settings);
        onClose();
    };
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000,
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2>Settings</h2>
            {Object.keys(settings).map((key) => (
                <label key={key} style={{ display: 'block', marginBottom: '10px' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                    <input
                        type="string"
                        value={settings[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            ))}
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default SettingsModal;