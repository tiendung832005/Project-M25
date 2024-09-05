import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserAPI, getAllUserAPI, updateUserAPI, updateUserCartAPI } from "../../services//user.service";

// hàm lấy thông tin user
export const getAllUser: any = createAsyncThunk("users/getAllUser", getAllUserAPI);

// hàm thêm thông tin user
export const addUser: any = createAsyncThunk("users/addUser", addUserAPI);

// hàm cập nhật user
export const updateUser: any = createAsyncThunk("users/updateUser", updateUserAPI);

// hàm cập nhập giỏ hàng của user
export const updateUserCart: any = createAsyncThunk("users/updateUserCart", updateUserCartAPI);

const userReducer = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        // chứa action
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state, action) => {
                console.log('chờ call API');
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                console.log('thất bại');
            })
            // thêm
            .addCase(addUser.fulfilled, (state: any, action: any) => {
                state.users.push(action.payload);
            })
            // cập nhập
            .addCase(updateUser.fulfilled, (state: any, action: any) => {
                const index = state.users.findIndex((item: any) => {
                    return item.id === action.payload.id;
                });
                if (index != -1) {
                    state.users[index] = action.payload;
                }
            })
            // cập nhập giỏ hàng user
            .addCase(updateUserCart.fulfilled, (state: any, action: any) => {
                const index = state.users.findIndex((item: any) => {
                    return item.id === action.payload.id;
                });
                if (index != -1) {
                    state.users[index].cart = action.payload.cart;
                }
            });
    }
});
export default userReducer.reducer;
