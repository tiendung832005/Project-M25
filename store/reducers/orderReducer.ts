import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrderAPI, getAllOrderAPI, updateOrderAPI } from "../../services/orders.service";

// hàm lấy thông tin order
export const getAllOrder: any = createAsyncThunk("orders/getAllOrder", getAllOrderAPI)

// hàm thêm thông tin order
export const addOrder: any = createAsyncThunk(
    "orders/addOrder", addOrderAPI
);

// hàm cập nhật order
export const updateOrder: any = createAsyncThunk(
    "orders/updateOrder", updateOrderAPI
);

const orderReducer = createSlice({
    name: "orders",
    initialState: {
        orders: []
    },
    reducers: {
        // chứa action
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            //thêm
            .addCase(addOrder.fulfilled, (state: any, action: any) => {
                state.orders.push(action.payload);
            })
            // cập nhập
            .addCase(updateOrder.fulfilled, (state: any, action:any) => {
                const index = state.orders.findIndex((item: any) => {
                    return item.id === action.payload.id;
                });
                if (index != -1) {
                    state.orders[index] = action.payload;
                }
            })
    }
})
export default orderReducer.reducer;