import axios from "axios";

// hàm lấy thông tin Category
export const getAllCategoryAPI = async () => {
    const response = await axios.get("http://localhost:8080/classify")
    return response.data
}

// hàm xóa thông tin Category
export const deleteCategoryAPI = async (id: number) => {
    await axios.delete(`http://localhost:8080/classify/${id}`);
    return id;
}

// hàm thêm thông tin Category
export const addCategoryAPI = async (category: any) => {
    const response: any = await axios.post(
        "http://localhost:8080/classify",
        category
    );
    return response.data;
}

// hàm cập nhật Category
export const updateCategoryAPI = async (item: any) => {
    const response: any = await axios.put(
        `http://localhost:8080/classify/${item.id}`,
        item
    );
    return response.data;
}