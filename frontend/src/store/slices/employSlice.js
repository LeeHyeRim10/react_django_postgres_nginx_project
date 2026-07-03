import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { employeeAllGetApi, employeePostApi, employeePutApi, employeeDeleteApi } from "../apis/employee.api";


export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
    async (_, thunkAPI) => {
        try {
            return await employeeAllGetApi();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const employeePostSlice = createAsyncThunk(
    "employeePostSlice",
    async (dataObj, thunkAPI) => {
        try {
            return await employeePostApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const employeePutSlice = createAsyncThunk(
    "employeePutSlice",
    async (dataObj, thunkAPI) => {
        try {
            return await employeePutApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
    async (id, thunkAPI) => {
        try {
            return await employeeDeleteApi(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)




const initialEmp = {
    id: '', name: '', email: '', job: '', pay: null
}

const initialState = {
    empTable: [],
    emp: initialEmp,
    mode: '',
    selectedId: '',
    loading: false,
    error: null
}

const employSlice = createSlice({
    name: "employSlice",
    initialState,
    reducers: {
        select: (state, action) => {
            state.selectedId = action.payload
        },
        setEmp: (state, action) => {
            state.emp = action.payload || initialEmp;
        },
        remove: (state) => {
            state.empTable = state.empTable.filter(i => (
                i.id !== state.selectedId
            ))
        },
        setMode: (state, action) => {
            state.mode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder // get 방식
            .addCase(employeeAllGetSlice.pending, (state) => { // 데이터 로딩  시,
                state.loading = true
                state.error = null
            })
            .addCase(employeeAllGetSlice.fulfilled, (state, action) => { // fulfilled 로딩 끝 데이터 넣기
                state.empTable = action.payload
                state.loading = false
            })
            .addCase(employeeAllGetSlice.rejected, (state, action) => { // fulfilled 실패 시,
                state.loading = false
                state.error = action.payload
            })
            .addCase(employeePostSlice.fulfilled, (state, action) => {
                state.empTable = [...state.empTable, action.payload]
                state.loading = false
            })
            .addCase(employeePutSlice.fulfilled, (state, action) => {
                state.empTable = state.empTable.map(i => (
                        i.id === action.payload.id ?
                            action.payload : i
                ))
                state.loading = false
            })
            .addCase(employeeDeleteSlice.fulfilled, (state) => {
                state.empTable = state.empTable.filter(i => (
                        i.id !== state.selectedId
                ))
                state.loading = false
            })
    }
})

export const { select, setEmp, addEmp, update, remove, setMode } = employSlice.actions;
export default employSlice.reducer