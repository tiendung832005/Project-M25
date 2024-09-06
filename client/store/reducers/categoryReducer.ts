import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategoryAPI, deleteCategoryAPI, getAllCategoryAPI, updateCategoryAPI } from "../../services/category.service";

// hàm lấy thông tin Category
export const getAllCategory: any = createAsyncThunk("classify/getAllCategory", getAllCategoryAPI)

// hàm xóa thông tin Category
export const deleteCategory: any = createAsyncThunk("classify/deleteCategory", deleteCategoryAPI)

// hàm thêm thông tin Category
export const addCategory: any = createAsyncThunk(
    "classify/addCategory", addCategoryAPI
);

// hàm cập nhật Category
export const updateCategory: any = createAsyncThunk(
    "classify/updateCategory", updateCategoryAPI
);

const categoryReducer = createSlice({
    name: "classify",
    initialState: {
        classify: []
    },
    reducers: {
        // chứa action
    },
    extraReducers: (builder:any) => {
        builder
            .addCase(getAllCategory.pending, (state:any, action:any) => {
                console.log('chờ call API');
            })
            .addCase(getAllCategory.fulfilled, (state:any, action:any) => {
                state.classify = action.payload
            })
            .addCase(getAllCategory.rejected, (state:any, action:any) => {
                console.log('thất bại');
            })
            //thêm
            .addCase(addCategory.fulfilled, (state: any, action: any) => {
                state.classify.push(action.payload);
            })
            // xóa
            .addCase(deleteCategory.fulfilled, (state:any, action:any) => {
                state.classify = state.classify.filter((category: any) => category.id !== action.meta.arg);
            })

            // cập nhập
            .addCase(updateCategory.fulfilled, (state: any, action:any) => {
                const index = state.users.findIndex((item: any) => {
                    return item.id === action.payload.id;
                });
                if (index != -1) {
                    state.classify[index] = action.payload;
                }
            });
    }
})
export default categoryReducer.reducer;