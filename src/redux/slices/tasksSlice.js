import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('/tasks');
    return response.data;  
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
    const response = await axios.post('/tasks', newTask);
    return response.data;  
});


export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
    await axios.delete(`/tasks/${taskId}`);
    return taskId;  
});


export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask) => {
    const response = await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
    return response.data;  
});

const initialState = {
    tasks: [],
    status: 'idle',
    error: null
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;  
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                
                state.status = 'idle';
                state.tasks = [...state.tasks, action.payload]; 
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                
                state.status = 'idle';
                // state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
               
                state.status = 'idle';
                // const index = state.tasks.findIndex(task => task.id === action.payload.id);
                // if (index >= 0) {
                //     state.tasks[index] = action.payload;
                // }
            });
    }
});

export const { setStatus } = taskSlice.actions;

export default taskSlice.reducer;
