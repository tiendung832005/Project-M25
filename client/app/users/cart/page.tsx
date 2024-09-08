"use client";
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../contexts/page'; // Sử dụng hook từ CartContext để quản lý giỏ hàng
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart(); // Lấy danh sách sản phẩm trong giỏ hàng và các hàm để xóa và cập nhật số lượng
    const router = useRouter(); // Sử dụng useRouter để điều hướng

    const handleRemove = (id: number) => {
        removeFromCart(id); // Xử lý xóa sản phẩm khỏi giỏ hàng
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity > 0) {
            updateQuantity(id, quantity); // Xử lý thay đổi số lượng sản phẩm trong giỏ hàng
        }
    };

    const handlePay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const note = "Ghi chú ở đây"; // Ghi chú có thể truyền qua cho trang thanh toán
        router.push(`/users/pay?note=${encodeURIComponent(note)}&totalPrice=${totalPrice}`); // Truyền giá trị totalPrice qua URL
    };

    // Tính tổng tiền của giỏ hàng
    const totalPrice = cartItems.reduce((total:any, item:any) => total + (item.price || 0) * (item.quantity || 0), 0);

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-center text-2xl mb-5">Giỏ hàng của bạn</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p>Giỏ hàng của bạn trống</p>
                </div>
            ) : (
                <>
                    <div className="text-center mb-5">
                        <p>Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng</p>
                    </div>
                    {cartItems.map(item => (
                        <div className="flex items-center border-b border-gray-300 py-2" key={item.id}>
                            {/* Sử dụng Image của Next.js để tối ưu hóa hình ảnh */}
                            <Image className="w-20 h-20 object-cover mr-5" src={item.images} alt={item.name} width={80} height={80} />
                            <div className="flex-1">
                                <h3 className="m-0 text-lg">{item.name}</h3>
                                <div className="flex items-center mt-2">
                                    <button className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p className="text-red-500 font-bold mt-2">{item.price.toLocaleString('vi-VN')}₫</p>
                            </div>
                            <button className="bg-none border-none cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleRemove(item.id)}>
                                <FaTrash /> {/* Button xóa sản phẩm */}
                            </button>
                        </div>
                    ))}
                    <div className="text-right mt-5">
                        <h2 className="mb-2 text-xl">Thông tin đơn hàng</h2>
                        <p className="text-lg font-bold mb-2">Tổng tiền: <span>{totalPrice.toLocaleString('vi-VN')}₫</span></p>
                        <button onClick={handlePay} className="bg-red-500 text-white px-4 py-2 border-none cursor-pointer text-lg hover:bg-red-700">THANH TOÁN</button> {/* Button thanh toán */}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
