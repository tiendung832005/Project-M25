import axios from "axios";

// hàm lấy thông tin order
export const getAllOrderAPI = async () => {
    const response = await axios.get("http://localhost:8080/orders")
    return response.data
}

// hàm thêm thông tin order
export const addOrderAPI = async (item: any) => {
    const response: any = await axios.post(
        "http://localhost:8080/orders",
        item
    );
    return response.data;
}

// hàm cập nhật order
export const updateOrderAPI = async (item: any) => {
    const response: any = await axios.put(
        `http://localhost:8080/orders/${item.id}`,
        item
    );
    return response.data;
}