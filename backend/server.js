const crypto = require('crypto');
global.crypto = crypto;
globalThis.crypto = crypto; // Đảm bảo tương thích hoàn toàn với MongoDB driver mới trên Render

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas kèm log chi tiết lỗi
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/235022_TaAnhKiet';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('CHI TIET LOI MONGODB:', err.message);
    console.error('Error code:', err.code);
  });

// Cập nhật Schema khớp với giao diện nhập sách (bookId, title, author, genre, quantity)
const BookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: String,
  genre: String,
  quantity: Number
});

const Book = mongoose.model('Book', BookSchema, 'books');

// Route kiểm tra server
app.get('/', (req, res) => {
  res.send('API Quan ly sach - 235022 Tạ Anh Kiệt đang hoạt động!');
});

// Lấy danh sách sách
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm sách mới (có kiểm tra trùng mã bookId)
app.post('/api/books', async (req, res) => {
  try {
    const { bookId } = req.body;
    
    const existingBook = await Book.findOne({ bookId });
    if (existingBook) {
      return res.status(400).json({ error: 'Mã bookId đã tồn tại!' });
    }

    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});