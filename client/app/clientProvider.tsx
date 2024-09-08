"use client"; // Đánh dấu là Client Component

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { CartProvider } from '../app/users/contexts/page';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartProvider>
        {children}
      </CartProvider>
    </Provider>
  );
}
