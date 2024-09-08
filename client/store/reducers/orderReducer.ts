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
    extraReducers: (builder: any) => {
        builder
            .addCase(getAllOrder.pending, (state: any) => {
                console.log("Fetching orders...");
            })
            .addCase(getAllOrder.fulfilled, (state: any, action: any) => {
                console.log("Fetched orders:", action.payload);
                state.orders = action.payload;
            })
            .addCase(getAllOrder.rejected, (state: any, action: any) => {
                console.error("Failed to fetch orders:", action.error.message);
            })
            .addCase(addOrder.fulfilled, (state: any, action: any) => {
                console.log("Order added successfully:", action.payload);
                state.orders.push(action.payload);
            })
            .addCase(updateOrder.fulfilled, (state: any, action: any) => {
                const index = state.orders.findIndex((item: any) => item.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            });
    }
    
})
export default orderReducer.reducer;