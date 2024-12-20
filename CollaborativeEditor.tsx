
import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateContent, setContent, setUsers } from '../redux/collaborationSlice';

const CollaborativeEditor: React.FC = () => {
    const dispatch = useDispatch();
    const content = useSelector((state: RootState) => state.collaboration.content);
    const users = useSelector((state: RootState) => state.collaboration.users);
    const ws = useRef<WebSocket | null>(null);
    const quillRef = useRef<ReactQuill | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'user_connected' || data.type === 'user_disconnected') {
                dispatch(setUsers(data.count));
            } else if (data.type === 'content_update') {
                dispatch(setContent(data.content));
                if (quillRef.current) {
                    quillRef.current.getEditor().setContents(data.content);
                }
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        eturn () => {
            ws.current?.close();
        };
    }, [dispatch]);

    const handleChange = (content: string, delta: any, source: string, editor: any) => {
        if (source === 'user') {
            dispatch(updateContent(content));
            ws.current?.send(JSON.stringify({ type: 'content_update', content }));
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Collaborative Editor</h2>
            <p className="mb-4">Active Users: {users}</p>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleChange}
                className="h-96"
            />
        </div>
    );
};

export default CollaborativeEditor;
