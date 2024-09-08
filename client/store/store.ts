import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';
import productReducer from './reducers/productReducer';

export const store = configureStore({
  reducer: {
    userReducer,
    orderReducer,
    productReducer,
  },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
