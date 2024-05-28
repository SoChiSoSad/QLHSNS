const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Tạo kết nối với cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'QLHSNS'
});

// Kết nối tới cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại: ' + err.stack);
    return;
  }
  console.log('Đã kết nối với ID: ' + connection.threadId);
});

// API Đăng Nhập
app.post('/api/login', (req, res) => {
  const { username, pass } = req.body;
  const query = 'SELECT * FROM users WHERE Username = ? AND Pass = ?';
  
  connection.query(query, [username, pass], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
      return;
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'Đăng nhập thành công' });
    } else {
      res.json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  });
});

// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Máy chủ đang chạy trên cổng 3000');
});


document.querySelector('.btn').addEventListener('click', function() {
    const username = document.getElementById('Tai-Khoan').value;
    const pass = document.getElementById('mat-khau').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, pass })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Đăng nhập thành công!'); // Chuyển hướng đến index.html khi đăng nhập thành công
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});