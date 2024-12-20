import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollaborationState {
    content: string;
    users: number;
}

const initialState: CollaborationState = {
    content: '',
    users: 1,
};
const collaborationSlice = createSlice({
    name: 'collaboration',
    initialState,
    reducers: {
        setContent(state, action: PayloadAction<string>) {
            state.content = action.payload;
        },
        updateContent(state, action: PayloadAction<string>) {
            state.content = action.payload;
        },
        setUsers(state, action: PayloadAction<number>) {
            state.users = action.payload;
        },
    },
});
export const { setContent, updateContent, setUsers } = collaborationSlice.actions;
export default collaborationSlice.reducer;
