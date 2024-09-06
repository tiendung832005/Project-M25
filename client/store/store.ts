import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";

const store = configureStore({
    reducer:{
        productReducer,
        categoryReducer,
        userReducer,
        orderReducer
    }
})
export default store