
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
