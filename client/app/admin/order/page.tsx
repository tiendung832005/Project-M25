"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'next/navigation'; 
import { getAllOrder } from "../../../store/reducers/orderReducer";
import "../../../styles/scss/order.scss";

export default function Order() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const data: any = useSelector((state) => state);
    const dispatch = useDispatch();
    const searchParams = useSearchParams(); 
    const [check1, setCheck1] = useState<boolean>(true);
    const [check2, setCheck2] = useState<boolean>(false);
    const [indexOrder, setIndexOrder] = useState<any>(null);

    useEffect(() => {
        dispatch(getAllOrder());

        const newOrderId = searchParams.get('newOrderId');
        if (newOrderId) {
            const orderIndex = data.orderReducer.orders.findIndex((order: any) => order.id === newOrderId);
            if (orderIndex !== -1) {
                setIndexOrder(orderIndex);
                setCheck1(false);
                setCheck2(true);
            }
        }
    }, [dispatch, data.orderReducer.orders, searchParams]);

    // format tiền
    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    };

    const handleViewOrder = (item: number) => {
        setIndexOrder(item);
        setCheck1(false);
        setCheck2(true);
    };

    const back = () => {
        setCheck1(true);
        setCheck2(false);
    };

    return (
        <div className="container1">
            <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
            {check1 ? (
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn hàng</th>
                                <th>Tên người nhận</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Tổng tiền (cả ship)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orderReducer.orders &&
                                data.orderReducer.orders.map((item: any, index: number) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td className="product-name">{item.name}</td>
                                        <td className="product-name">{item.phone}</td>
                                        <td className="product-name">{item.address}</td>
                                        <td>
                                            {item.cart?.length > 0
                                                ? formatVND(
                                                    item.cart
                                                        .map((i: any) => i.quantity * i.price)
                                                        .reduce((a: number, b: number) => a + b, 0) + item.ship
                                                )
                                                : formatVND(item.ship)}
                                        </td>
                                        <td>
                                            <button onClick={() => handleViewOrder(index)} className="action-button edit">
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                </div>
            ) : null}

            {check2 && data.orderReducer.orders && data.orderReducer.orders.length > 0 && (
                <div className="order-details">
                    <button onClick={back} className="back-button">Back</button>
                    <h2>Thông tin đơn hàng</h2>
                    <div className="order-info">
                        {/* Hiển thị thông tin đơn hàng và giỏ hàng trong bảng */}
                        <table className="product-list">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên người nhận</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Tổng giá sp</th>
                                    <th>Tổng tiền (cả ship)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orderReducer.orders[indexOrder]?.cart?.length > 0 ? (
                                    data.orderReducer.orders[indexOrder].cart.map((product: any, index: number) => (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{data.orderReducer.orders[indexOrder]?.id}</td>
                                            <td>{data.orderReducer.orders[indexOrder]?.name}</td>
                                            <td>{data.orderReducer.orders[indexOrder]?.phone}</td>
                                            <td>{data.orderReducer.orders[indexOrder]?.address}</td>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{formatVND(product.price)}</td>
                                            <td>{formatVND(product.quantity * product.price)}</td>
                                            <td>{formatVND(
                                                data.orderReducer.orders[indexOrder].cart
                                                    ?.map((i: any) => i.quantity * i.price)
                                                    .reduce((a: number, b: number) => a + b, 0) + data.orderReducer.orders[indexOrder]?.ship
                                            )}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10}>Không có sản phẩm trong giỏ hàng</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}