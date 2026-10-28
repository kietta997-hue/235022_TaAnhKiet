# Sử dụng Nginx để phục vụ trực tiếp thư mục mã nguồn frontend
FROM nginx:alpine

# Copy toàn bộ mã nguồn frontend vào thư mục mặc định của Nginx
COPY . /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]