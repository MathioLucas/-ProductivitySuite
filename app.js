import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import AIWritingAssistant from './pages/AIWritingAssistant';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskManager />} />
                <Route path="/ai-assistant" element={<AIWritingAssistant />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
