import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductAPI, deleteProductAPI, getProducts, updateProductAPI } from "../../services/products.service";

// lấy thông tin tất cả products
export const getAllProduct: any = createAsyncThunk("products/getAllProduct", getProducts)

// hàm xóa thông tin product
export const deleteProduct: any = createAsyncThunk("products/deleteProduct", deleteProductAPI)

// hàm thêm product
export const addProduct: any = createAsyncThunk("products/addProduct", addProductAPI);

// hàm cập nhật sản phẩm
export const updateProduct: any = createAsyncThunk("products/updateProduct", updateProductAPI);

const productReducer = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        // chứa action
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state, action) => {
                console.log('chờ call API');
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                console.log('thất bại');
            })

            // thêm product
            .addCase(addProduct.fulfilled, (state:any, action:any) => {
                state.products.push(action.payload);
            })

            // xóa
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product: any) => product.id !== action.meta.arg);
            })

            // cập nhật sản phẩm
            .addCase(updateProduct.fulfilled, (state:any, action:any) => {
                const index = state.products.findIndex((product: any) => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    }
})
export default productReducer.reducer;