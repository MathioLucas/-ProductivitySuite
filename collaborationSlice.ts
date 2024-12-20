import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollaborationState {
    content: string;
    users: number;
}

const initialState: CollaborationState = {
    content: '',
    users: 1,
};
