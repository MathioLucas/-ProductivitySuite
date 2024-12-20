
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WritingAssistant from './components/WritingAssistant';
import CollaborativeEditor from './components/CollaborativeEditor';
import { Provider } from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <nav className="p-4 bg-gray-200 flex space-x-4">
                    <Link to="/" className="text-blue-500">AI Writing Assistant</Link>
                    <Link to="/editor" className="text-blue-500">Collaborative Editor</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<WritingAssistant />} />
                    <Route path="/editor" element={<CollaborativeEditor />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
