"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAllUser, updateUserCart } from '../../../store/reducers/userReducer';
import { addOrder, getAllOrder, updateOrder } from '../../../store/reducers/orderReducer';
import { getAllProduct, updateProduct } from '../../../store/reducers/productReducer';
import "../../../styles/scss/pay.scss";

const Pay: React.FC = () => {
    const router = useRouter();
    const [note, setNote] = useState<string>(''); // Tạo một state để giữ giá trị của "note"
    const [totalPrice, setTotalPrice] = useState<number>(0); // Tạo một state để giữ giá trị tổng tiền sản phẩm

    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = new URLSearchParams(window.location.search);
        const noteParam = queryParams.get('note');
        const totalPriceParam = queryParams.get('totalPrice'); // Lấy giá trị totalPrice từ URL
        if (noteParam) {
            setNote(noteParam); // Lưu giá trị "note" vào state
        }
        if (totalPriceParam) {
            setTotalPrice(Number(totalPriceParam)); // Chuyển giá trị totalPrice từ chuỗi thành số và lưu vào state
        }
    }, []);

    const data: any = useSelector(state => state);
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [mess1, setMess1] = useState<boolean>(false);
    const [mess2, setMess2] = useState<boolean>(false);
    const [mess3, setMess3] = useState<boolean>(false);
    const [mess4, setMess4] = useState<boolean>(false);
    const [mess5, setMess5] = useState<boolean>(false);
    const [mess6, setMess6] = useState<boolean>(false);
    const [cart, setCart] = useState<any[]>([]); // State lưu dữ liệu giỏ hàng
    const dispatch = useDispatch();

    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = new URLSearchParams(window.location.search);
        const noteParam = queryParams.get('note');
        const totalPriceParam = queryParams.get('totalPrice'); // Lấy giá trị totalPrice từ URL
        const cartParam = queryParams.get('cart'); // Lấy dữ liệu giỏ hàng từ URL
        if (noteParam) {
            setNote(noteParam); // Lưu giá trị "note" vào state
        }
        if (totalPriceParam) {
            setTotalPrice(Number(totalPriceParam)); // Chuyển giá trị totalPrice từ chuỗi thành số và lưu vào state
        }
        if (cartParam) {
            const parsedCart = JSON.parse(decodeURIComponent(cartParam)); // Giải mã và chuyển dữ liệu từ chuỗi JSON về đối tượng
            setCart(parsedCart); // Lưu dữ liệu giỏ hàng vào state
        }
    }, []);

    const formatVND = (value: any) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    const indexUser: number = data.userReducer.users.findIndex((user: any) => user.id === loggedInUser?.id);

    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<any>('');

    const [moneyShip, setMoneyShip] = useState<number>(0);
    const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'HaNoi') {
            setMoneyShip(30000);
        } else {
            setMoneyShip(50000);
        }
    }

    const [payTo, setpayTo] = useState<string>('');
    const handleAddressSelectPay = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'NhanHang') {
            setpayTo('NhanHang');
        } else {
            setpayTo('ChuyenKhoan');
        }
    }

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    function generateRandomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        for (let i = 0; i < length; i++) {
            if (i < 5) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            } else if (i === 5) {
                result += '-';
            } else {
                result += digits.charAt(Math.floor(Math.random() * digits.length));
            }
        }
        return result;
    }

    const handleSavePay = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMess1(false);
        setMess2(false);
        setMess3(false);
        setMess4(false);
        setMess5(false);
    
        let check: boolean = true;
        if (name === '') {
            setMess3(true);
            setTimeout(() => {
                setMess3(false);
            }, 3000);
            check = false;
        }
        if (phone === '') {
            setMess4(true);
            setTimeout(() => {
                setMess4(false);
            }, 3000);
            check = false;
        }
        if (address === '') {
            setMess5(true);
            setTimeout(() => {
                setMess5(false);
            }, 3000);
            check = false;
        }
        if (moneyShip === 0) {
            setMess2(true);
            setTimeout(() => {
                setMess2(false);
            }, 3000);
            check = false;
        }
        if (payTo === '') {
            setMess1(true);
            setTimeout(() => {
                setMess1(false);
            }, 3000);
            check = false;
        }
    
        if (check) {
            // Chỉ sử dụng sản phẩm đầu tiên từ giỏ hàng
            const firstProduct = cart[0];  // Nếu bạn chỉ muốn lưu 1 sản phẩm
    
            const newOrder = {
                id: generateRandomString(10),
                name: name,
                status: 'choDuyet',
                phone: phone,
                address: address,
                created_at: formattedDate,
                updated_at: formattedDate,
                note: note,
                ship: moneyShip,
                payTo: payTo,
                totalPrice: totalPrice + moneyShip, // Tổng tiền sản phẩm và phí ship
                productName: firstProduct?.name,  // Tên sản phẩm đầu tiên trong giỏ hàng
                quantity: firstProduct?.quantity  // Số lượng sản phẩm đầu tiên
            };
    
            // Gọi action để lưu đơn hàng mới vào db.json
            dispatch(addOrder(newOrder));
            setMess6(true);
            setTimeout(() => {
                setMess6(false);
                const updatedUser = { ...data.userReducer.users[indexUser], cart: [] };
                dispatch(updateUserCart(updatedUser));
    
                // Chuyển hướng đến trang order và truyền id của đơn hàng mới qua query parameters
                router.push(`/users/home`);
            }, 2000);
        }
    };
    
    

    return (
        <div className="shipping-form">
            <div className="shipping-form-child">
                <h1>Thanh toán</h1>
                <h3>Thông tin giao hàng</h3>
                <form onSubmit={handleSavePay}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Họ và tên"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                    />
                    {mess3 && <div className="shipping-form-child-address">Vui lòng nhập tên người nhận hàng!</div>}
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPhone(e.target.value);
                        }}
                        type="tel"
                        value={phone}
                        placeholder="Số điện thoại"
                    />
                    {mess4 && <div className="shipping-form-child-address">Vui lòng nhập số điện thoại người nhận hàng!</div>}
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setAddress(e.target.value);
                        }}
                        type="text"
                        value={address}
                        placeholder="Địa chỉ"
                    />
                    {mess5 && <div className="shipping-form-child-address">Vui lòng nhập địa chỉ nhận hàng!</div>}
                    <select onChange={handleAddressSelect}>
                        <option>Chọn tỉnh / thành</option>
                        <option value="HaNoi">Hà Nội</option>
                        <option value="unHaNoi">Ngoại thành</option>
                    </select>
                    {mess2 && <div className="shipping-form-child-address">Vui lòng chọn địa chỉ!</div>}
                    <select onChange={handleAddressSelectPay}>
                        <option>Chọn phương thức thanh toán</option>
                        <option value="NhanHang">Thanh toán khi nhận hàng</option>
                    </select>
                    {mess1 && <div className="shipping-form-child-address">Vui lòng chọn phương thức thanh toán!</div>}
                    <button type="submit">Thanh toán</button>
                    <div style={{ display: `${mess6 ? 'block' : 'none'}` }} className="notification">
                        <div className="notification-icon">✔</div>
                        <div className="notification-message">Đã đặt hàng thành công</div>
                    </div>
                </form>
            </div>
            <div className="shipping-form-2">
                <div className="cart-summary">
                    {cart.map((item: any) => (
                        <div className="item" key={item.id}>
                            <img src={item.images} alt="product" />
                            <div className="item-div">{item.quantity}</div>
                            <span className="item-span1">{item.name}</span>
                            <span className="item-span2">{formatVND(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <div className="total">
                        <span>Tạm tính</span>
                        <span>{formatVND(totalPrice)}</span> {/* Hiển thị giá trị tổng tiền từ giỏ hàng */}
                    </div>
                    <div className="shipping-fee">
                        <span>Phí vận chuyển</span>
                        <span>{formatVND(moneyShip)}</span> {/* Hiển thị phí vận chuyển */}
                    </div>
                    <div className="grand-total">
                        <b>Tổng cộng</b>
                        <span className="grand-total-all">{formatVND(totalPrice + moneyShip)}</span> {/* Hiển thị tổng cộng tiền sản phẩm và phí ship */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
