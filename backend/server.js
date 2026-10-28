const crypto = require('crypto');
global.crypto = crypto; // <-- Bắt buộc gán vào global để thư viện MongoDB trên Render nhận diện được

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/235022_TaAnhKiet';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Cập nhật Schema khớp với giao diện nhập sách (bookId, title, author, genre, quantity)
const BookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true, required: true }, // Mã sách (đảm bảo không trùng)
  title: { type: String, required: true },                 // Tên sách
  author: String,                                          // Tác giả
  genre: String,                                           // Thể loại
  quantity: Number                                         // Số lượng
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
    
    // Kiểm tra xem bookId đã tồn tại trong database chưa
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