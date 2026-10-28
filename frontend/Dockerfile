# Giai đoạn 1: Build ứng dụng React với Node 20
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn 2: Phục vụ bằng Nginx
FROM nginx:alpine
# Xóa sạch trang HTML mặc định của Nginx để không bị ghi đè/trùng lặp
RUN rm -rf /usr/share/nginx/html/*
# Copy các file sau khi build (thư mục dist) vào thư mục của Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]