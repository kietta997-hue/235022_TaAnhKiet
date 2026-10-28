# Hệ thống Quản lý Sách trên Nền tảng Đám mây

- **Học phần:** Điện toán đám mây
- **MSSV:** 235022
- **Họ tên:** Tạ Anh Kiệt

## 1. Giới thiệu đề tài
Xây dựng ứng dụng quản lý sách full-stack gồm giao diện frontend, backend API và cơ sở dữ liệu MongoDB Atlas; quản lý mã nguồn bằng Git/GitHub; đóng gói ứng dụng bằng Docker, đẩy image lên Docker Hub và triển khai hệ thống trên Render.

## 2. Công nghệ sử dụng
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Version Control:** Git, GitHub
- **Containerization:** Docker, Docker Hub
- **Cloud Deployment:** Render

## 3. Cấu trúc dự án
```text
235022_TaAnhKiet/
├── backend/          # Mã nguồn API (Node.js & Express)
├── frontend/         # Mã nguồn giao diện (React)
├── .gitignore        # Các tệp và thư mục bỏ qua không đẩy lên Git
└── README.md         # Tài liệu hướng dẫn dự án
```

## 4. Hướng dẫn cài đặt và chạy chương trình (Local)
### Bước 1: Clone repository
```bash
git clone https://github.com/kietta977-hue/235022_TaAnhKiet.git
cd 235022_TaAnhKiet
```

### Bước 2: Cài đặt và chạy Backend
```bash
cd backend
npm install
```
- Tạo tệp `.env` trong thư mục `backend` với nội dung:
  ```env
  PORT=5000
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/235022_TaAnhKiet?retryWrites=true&w=majority
  ```
- Chạy server:
  ```bash
  node server.js
  ```

### Bước 3: Cài đặt và chạy Frontend
Mở một terminal mới:
```bash
cd frontend
npm install
npm run dev
```
