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
        orders: [],
        loading: false,
        error: null
    },

    reducers: {
        // chứa action
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getAllOrder.pending, (state: any) => {
                state.loading = true;
                state.error = null;
                console.log("Fetching orders...");
            })
            .addCase(getAllOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                console.log("Fetched orders:", action.payload);
                state.orders = action.payload;
            })
            .addCase(getAllOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
                console.error("Failed to fetch orders:", action.error.message);
            })
            .addCase(addOrder.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                console.log("Order added successfully:", action.payload);
                state.orders.push(action.payload);
            })
            .addCase(addOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
                console.error("Failed to add order:", action.error.message);
            })
            .addCase(updateOrder.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                const index = state.orders.findIndex((item: any) => item.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
                console.error("Failed to update order:", action.error.message);
            });

    }

})
export default orderReducer.reducer;