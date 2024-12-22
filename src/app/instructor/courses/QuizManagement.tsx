import React, { useState, useEffect } from 'react';

const QuizManagement = ({ moduleId }) => {
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['']);

    useEffect(() => {
        // Fetch existing quiz questions for the module from the API
        fetch(`/api/modules/${moduleId}/quiz`)
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, [moduleId]);

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCreateQuestion = () => {
        const newQuestion = { text: questionText, options };
        fetch(`/api/modules/${moduleId}/quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQuestion),
        })
        .then(response => response.json())
        .then(data => {
            setQuestions([...questions, data]);
            setQuestionText('');
            setOptions(['']);
        });
    };

    return (
        <div>
            <h1>Quiz Management</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateQuestion(); }}>
                <input 
                    type="text" 
                    value={questionText} 
                    onChange={(e) => setQuestionText(e.target.value)} 
                    placeholder="Question" 
                    required 
                />
                {options.map((option, index) => (
                    <input 
                        key={index} 
                        type="text" 
                        value={option} 
                        onChange={(e) => handleOptionChange(index, e.target.value)} 
                        placeholder={`Option ${index + 1}`} 
                        required 
                    />
                ))}
                <button type="button" onClick={handleAddOption}>Add Option</button>
                <button type="submit">Create Question</button>
            </form>
            <h2>Existing Questions</h2>
            <ul>
                {questions.map(question => (
                    <li key={question.id}>{question.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizManagement;
