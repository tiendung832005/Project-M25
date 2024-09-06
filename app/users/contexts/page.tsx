"use client"; 
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
    images: string;
    quantity: number;
}

interface CartContextProps {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    getTotalItems: () => number;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    fetchCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const userId = 522535593; // Giả sử userId đã được lấy từ đâu đó (authentication)

    // Lấy giỏ hàng khi component được mount
    useEffect(() => {
        fetchCart(); // Gọi hàm fetchCart để lấy dữ liệu giỏ hàng từ API
    }, []);

    // Hàm để lấy giỏ hàng từ backend
    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}`);
            setCartItems(response.data.cart || []); // Gán dữ liệu giỏ hàng lấy được vào state
        } catch (error) {
            console.error('Error fetching cart:', error); // Xử lý lỗi nếu có
        }
    };

    // Hàm để thêm sản phẩm vào giỏ hàng
    const addToCart = async (product: Product) => {
        const existingProduct = cartItems.find(item => item.id === product.id); // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        let updatedCart;
        
        if (existingProduct) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên
            updatedCart = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // Nếu chưa tồn tại, thêm sản phẩm mới với số lượng ban đầu là 1
            updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }

        setCartItems(updatedCart); // Cập nhật state giỏ hàng
        await updateUserCartInDb(userId, updatedCart); // Cập nhật giỏ hàng trên DB
        await fetchCart(); // Lấy lại giỏ hàng từ API sau khi cập nhật
    };

    // Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
    const getTotalItems = () => {
        return cartItems.reduce((total, product) => total + product.quantity, 0); // Tính tổng số lượng sản phẩm trong giỏ hàng
    };

    // Hàm để xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = async (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id); // Lọc ra những sản phẩm không có id trùng với id được xóa
        setCartItems(updatedCart); // Cập nhật state giỏ hàng
        await updateUserCartInDb(userId, updatedCart); // Cập nhật giỏ hàng trên DB
        await fetchCart(); // Lấy lại giỏ hàng từ API sau khi cập nhật
    };

    // Hàm để cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = async (id: number, quantity: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === id
                ? { ...item, quantity: quantity } // Cập nhật số lượng mới cho sản phẩm
                : item
        );
        setCartItems(updatedCart); // Cập nhật state giỏ hàng
        await updateUserCartInDb(userId, updatedCart); // Cập nhật giỏ hàng trên DB
        await fetchCart(); // Lấy lại giỏ hàng từ API sau khi cập nhật
    };

    // Hàm để cập nhật giỏ hàng trên DB (patch yêu cầu)
    const updateUserCartInDb = async (userId: number, cart: Product[]) => {
        try {
            await axios.patch(`http://localhost:8080/users/${userId}`, { cart });
            console.log('Cart updated in DB:', cart); // In ra console để kiểm tra cập nhật thành công
        } catch (error) {
            console.error('Error updating cart in DB:', error); // Xử lý lỗi nếu có
        }
    };

    return (
        // Truyền các hàm và state liên quan đến giỏ hàng vào context provider
        <CartContext.Provider value={{ cartItems, addToCart, getTotalItems, removeFromCart, updateQuantity, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook để sử dụng giỏ hàng trong các component khác
export const useCart = () => {
    const context = useContext(CartContext); // Lấy context từ CartContext
    if (!context) {
        throw new Error('useCart must be used within a CartProvider'); // Nếu không tìm thấy context, ném lỗi
    }
    return context; // Trả về context để sử dụng
};
