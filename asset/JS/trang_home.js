function phonglanhdao(){
    window.location.href = "../html/phonglanhdao.html";
}

function lanhdaodonvi(){
    window.location.href = "../html/lanhdaodonvi.html";
}

function lanhdaotruong(){
    window.location.href = "../html/lanhdaotruong.html";
}

function cacnhansu(){
    window.location.href = "../html/cacnhansu.html";
}

function thongke(){
    window.location.href = "../html/thongke.html";
}

function helpme(){
    window.location.href = "../html/trogiup.html";
}

function tranghome() {
    window.location.href = '../html/trang_home.html'
}
function back() {
    window.location.href = "../html/lanhdaodonvi.html";
}
function signout(){
    window.location.href = "#";
}



// // đăng xuất 
// const express = require('express');
// const app = express();

// app.post('/api/logout', (req, res) => {
//     // Xử lý đăng xuất tại đây (ví dụ: hủy session, xóa cookie)
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).json({ message: 'Đăng xuất thất bại.' });
//         }
//         res.clearCookie('connect.sid'); // Tên cookie session có thể khác
//         res.status(200).json({ message: 'Đăng xuất thành công.' });
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
// function signout() {
//     // Gửi yêu cầu đăng xuất đến server
//     fetch('/api/logout', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             // Đăng xuất thành công, chuyển hướng về trang đăng nhập
//             window.location.href = '../html/';
//         } else {
//             // Xử lý lỗi nếu có
//             console.error('Đăng xuất thất bại.');
//         }
//     })
//     .catch(error => {
//         console.error('Có lỗi xảy ra:', error);
//     });
// }
// // kết thúc chương trình đăng xuất
