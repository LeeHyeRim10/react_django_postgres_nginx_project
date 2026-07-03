import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLoginApi, userRegisterApi } from "../apis/user.api"

export const userLoginSlice = createAsyncThunk(
    "userLoginSlice",
    async (userObj, thunkApi) => {
        try {
            const user = await userLoginApi(userObj)
            localStorage.setItem("user", JSON.stringify(user))
            // console.log("slice", user)
            return user 
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const userRegisterSlice = createAsyncThunk(
    "userRegisterSlice",
    async (userObj, thunkApi) => {
        try {
            const user = await userRegisterApi(userObj)
            return user 
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
    
)

export const userLogoutSlice = createAsyncThunk(
    "userLogoutSlice",
    async (_, thunkApi) => {
        try {
            localStorage.removeItem("user")
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
    
)

export const getUser = () => {
    // console.log("local", localStorage)
    return JSON.parse(localStorage.getItem("user"))
}


const initialState = {
    userList: [],
    user: {},
    isLogin: false,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
       
        },
     extraReducers: (builder) => {
            builder // get 방식
                .addCase(userLoginSlice.pending, (state) => { // 데이터 로딩  시,
                    state.loading = true
                    state.error = null
                })
                .addCase(userLoginSlice.fulfilled, (state, action) => { // fulfilled 로딩 끝 데이터 넣기
                    const user = getUser();
                    console.log(user)
                    if(user.username === action.payload.username
                        && user.password === action.payload.password
                    ){
                        console.log(user)
                        state.isLogin = true
                        state.user = action.payload
                    }
                    state.loading = false
                })
                .addCase(userLoginSlice.rejected, (state, action) => { // fulfilled 실패 시,
                    state.loading = false
                    state.error = action.payload
                })
                .addCase(userRegisterSlice.fulfilled, (state, action) => { // fulfilled 로딩 끝 데이터 넣기
                    state.userList = [...state.users, action.payload]
                    state.loading = false
                })
                .addCase(userLogoutSlice.fulfilled, (state, action) => { // fulfilled 로딩 끝 데이터 넣기
                    state.user = {}
                    state.isLogin = false
                    state.loading = false
                })
            }
})

export default userSlice.reducer