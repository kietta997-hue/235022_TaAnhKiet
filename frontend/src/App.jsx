import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://two35022-taanhkiet-backend.onrender.com/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ bookId: '', title: '', author: '', category: '', quantity: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (query = '') => {
    try {
      const url = query ? `${API_URL}?search=${query}` : API_URL;
      const res = await axios.get(url);
      setBooks(res.data);
    } catch (err) {
      console.error("Lỗi tải sách:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { ...form, quantity: Number(form.quantity), publishYear: 2024 });
      setForm({ bookId: '', title: '', author: '', category: '', quantity: '' });
      fetchBooks();
    } catch (err) {
      alert("Lỗi khi thêm sách (Mã bookId có thể đã tồn tại)");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Xóa sách này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBooks();
      } catch (err) {
        console.error("Lỗi khi xóa:", err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Hệ Thống Quản Lý Sách - Tạ Anh Kiệt (235022)</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '5px' }}>
        <h3>Thêm sách mới</h3>
        <input placeholder="Mã sách (bookId)" value={form.bookId} onChange={e => setForm({...form, bookId: e.target.value})} required style={{marginRight: '10px', padding: '5px'}} />
        <input placeholder="Tên sách" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{marginRight: '10px', padding: '5px'}} />
        <input placeholder="Tác giả" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required style={{marginRight: '10px', padding: '5px'}} />
        <input placeholder="Thể loại" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required style={{marginRight: '10px', padding: '5px'}} />
        <input placeholder="Số lượng" type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required style={{marginRight: '10px', padding: '5px'}} />
        <button type="submit" style={{padding: '6px 12px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer'}}>Thêm sách</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Tìm kiếm theo tên, tác giả..." value={search} onChange={e => setSearch(e.target.value)} style={{padding: '6px', width: '300px', marginRight: '10px'}} />
        <button onClick={() => fetchBooks(search)} style={{padding: '6px 12px', cursor: 'pointer'}}>Tìm kiếm</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr><td colSpan="6" style={{textAlign: 'center'}}>Chưa có dữ liệu sách</td></tr>
          ) : (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.quantity}</td>
                <td>
                  <button onClick={() => handleDelete(book._id)} style={{background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer'}}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;