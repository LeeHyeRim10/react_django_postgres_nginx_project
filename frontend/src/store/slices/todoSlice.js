import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoAllGetApi, todoDeleteApi, todoPostApi, todoPutApi, todoTogglePutApi } from "../apis/todo.api"


export const todoAllGetSlice = createAsyncThunk(
    "todoAllGetSlice",
    async (_, thunkAPI) => {
        try {
            return await todoAllGetApi();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoPostSlice = createAsyncThunk(
    "todoPostSlice",
    async (dataObj, thunkAPI) => {
        try {
            return await todoPostApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoPutSlice = createAsyncThunk(
    "todoPutSlice",
    async (dataObj, thunkAPI) => {
        try {
            return await todoPutApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoTogglePutSlice = createAsyncThunk(
    "todoTogglePutSlice",
    async (dataObj, thunkAPI) => {
        try {
            const newObj = {...dataObj, checked: !dataObj.checked}
            return await todoTogglePutApi(newObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoDeleteSlice = createAsyncThunk(
    "todoDeleteSlice",
    async (id, thunkAPI) => {
        try {
            return await todoDeleteApi(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initObj = { id: "", subject: "", checked: false }

const initialState = {
    todoList: [],
    todoObj: initObj
}


const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        change: (state, action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name]: action.payload.value
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todoAllGetSlice.pending, (state) => { // 데이터 로딩  시,
                state.loading = true
                state.error = null
            })
            .addCase(todoAllGetSlice.fulfilled, (state, action) => { // fulfilled 로딩 끝 데이터 넣기
                state.todoList = action.payload
                state.loading = false
            })
            .addCase(todoAllGetSlice.rejected, (state, action) => { // fulfilled 실패 시,
                state.loading = false
                state.error = action.payload
            })
            .addCase(todoPostSlice.rejected, (state, action) => { // fulfilled 실패 시,
                state.todoList = [...state.todoObj, action.payload]
                state.loading = false
            })
            .addCase(todoPutSlice.rejected, (state, action) => { 
                state.todoList = [...state.todoObj, action.payload]
                state.loading = false
            })
            .addCase(todoTogglePutSlice.rejected, (state, action) => { 
                state.todoList = state.todoList.map(i => (
                        i.id === action.payload ?
                            { ...i, checked: !i.checked }
                            : i
                    ))
                state.loading = false
            })
            .addCase(todoDeleteSlice.rejected, (state, action) => {
                state.todoList = state.todoList.map(i => (
                        i.id === action.payload.id ?
                            { ...i, subject: action.payload.value }
                            : i
                        ))
                state.loading = false
            })

    }
})

export const { remove, setTodo, addTodo, toggle, change } = todoSlice.actions;
export default todoSlice.reducer;
