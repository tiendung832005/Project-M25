import axios from "axios";

// API lấy thông tin tất cả products
export const getProducts = async () => {
    const res: any = await axios.get("http://localhost:8080/products")
    return res.data
}

// hàm xóa thông tin products
export const deleteProductAPI = async (id: number) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    return id; // Trả về id của sản phẩm đã xóa
}

// hàm thêm product
export const addProductAPI = async (product: any) => {
    const response = await axios.post('http://localhost:8080/products', product);
    return response.data;
};

// hàm cập nhật product
export const updateProductAPI = async (product: any) => {
    const response = await axios.put(`http://localhost:8080/products/${product.id}`, product);
    return response.data;
};