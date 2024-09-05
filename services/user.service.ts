import axios from "axios";

// hàm lấy thông tin user
export const getAllUserAPI = async () => {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
}

// hàm thêm thông tin user
export const addUserAPI = async (user: any) => {
    const response: any = await axios.post("http://localhost:8080/users", user);
    return response.data;
}

// hàm cập nhật user
export const updateUserAPI = async (item: any) => {
    const response: any = await axios.put(`http://localhost:8080/users/${item.id}`, item);
    return response.data;
}

// hàm cập nhật giỏ hàng user
export const updateUserCartAPI = async (item: any) => {
    const response: any = await axios.patch(`http://localhost:8080/users/${item.id}`, { cart: item.cart });
    return response.data;
}
