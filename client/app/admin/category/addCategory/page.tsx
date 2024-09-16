"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/Sidebar";
import "../../../../styles/scss/addProducts.scss";

export default function AddCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState({
    id: 0,
    name: "",
    description: "",
    status: true, // Thêm trạng thái vào state
  });

  const router = useRouter();

  // Tạo ID tự động
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/classify?_sort=id&_order=desc&_limit=1"
        );
        if (response.ok) {
          const data = await response.json();
          const maxId = data.length > 0 ? data[0].id : 0;
          setCategory((prevCategory) => ({ ...prevCategory, id: maxId + 1 }));
        } else {
          console.error("Failed to fetch the maximum ID.");
        }
      } catch (error) {
        console.error("Error fetching the maximum ID:", error);
      }
    };

    fetchMaxId();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      status: value === "true",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra xem danh mục với tên này đã tồn tại hay chưa
    try {
      const existingCategoryResponse = await fetch(
        `http://localhost:8080/classify?name=${category.name}`
      );
      const existingCategoryData = await existingCategoryResponse.json();

      if (existingCategoryData.length > 0) {
        // Nếu danh mục đã tồn tại, hiển thị thông báo lỗi và dừng quá trình thêm mới
        alert("Danh mục đã tồn tại!");
        return;
      }

      // Nếu không có danh mục trùng tên, tiến hành thêm mới
      const response = await fetch("http://localhost:8080/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        router.push("/admin/category"); // Điều hướng sau khi thêm danh mục thành công
      } else {
        console.error("Thêm danh mục thất bại");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi kiểm tra danh mục:", error);
    }
  };

  return (
    <div className="container1">
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className="add-product-page">
        <button className="back-button">
          <Link href={"/admin/category"}>Back</Link>
        </button>
        <h1>Add Category</h1>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Nhập tên danh mục"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={category.description}
              onChange={handleChange}
              placeholder="Nhập mô tả danh mục"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={category.status ? "true" : "false"}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="true">Hoạt động</option>
              <option value="false">Ngừng hoạt động</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
