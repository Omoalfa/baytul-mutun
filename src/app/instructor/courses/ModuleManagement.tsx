import React, { useState, useEffect } from 'react';

const ModuleManagement = ({ courseId }) => {
    const [modules, setModules] = useState([]);
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');

    useEffect(() => {
        // Fetch existing modules for the course from the API
        fetch(`/api/courses/${courseId}/modules`)
            .then(response => response.json())
            .then(data => setModules(data));
    }, [courseId]);

    const handleCreateModule = () => {
        // Logic to create a new module
        const newModule = { name: moduleName, description: moduleDescription };
        fetch(`/api/courses/${courseId}/modules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newModule),
        })
        .then(response => response.json())
        .then(data => {
            setModules([...modules, data]);
            setModuleName('');
            setModuleDescription('');
        });
    };

    return (
        <div>
            <h1>Module Management</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateModule(); }}>
                <input 
                    type="text" 
                    value={moduleName} 
                    onChange={(e) => setModuleName(e.target.value)} 
                    placeholder="Module Name" 
                    required 
                />
                <textarea 
                    value={moduleDescription} 
                    onChange={(e) => setModuleDescription(e.target.value)} 
                    placeholder="Module Description" 
                    required 
                />
                <button type="submit">Create Module</button>
            </form>
            <h2>Existing Modules</h2>
            <ul>
                {modules.map(module => (
                    <li key={module.id}>{module.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ModuleManagement;
