import axios from "axios";

// hàm lấy thông tin order
export const getAllOrderAPI = async () => {
    const response = await axios.get("http://localhost:8080/orders");
    console.log("Orders fetched from API:", response.data); // Kiểm tra phản hồi API
    return response.data;
};


// hàm thêm thông tin order
export const addOrderAPI = async (item: any) => {
    console.log("Order data to send to API:", item); // Log dữ liệu trước khi gửi API
    const response: any = await axios.post("http://localhost:8080/orders", item);
    console.log("API response:", response.data); // Log phản hồi từ API
    return response.data;
};


// hàm cập nhật order
export const updateOrderAPI = async (item: any) => {
    const response: any = await axios.put(
        `http://localhost:8080/orders/${item.id}`,
        item
    );
    return response.data;
}