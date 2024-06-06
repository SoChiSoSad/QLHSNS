// Hàm để bật/tắt hiển thị mật khẩu
const togglePasswordVisibility = () => {
    // Lấy phần tử input mật khẩu theo ID của nó
    const passwordInput = document.getElementById('mat-khau');
    
    // Chọn tất cả các phần tử có thể đại diện cho biểu tượng mắt
    const eyeIcons = document.querySelectorAll('.fa-eye, .fa-eye-slash');
    
    // Thêm sự kiện click cho mỗi biểu tượng mắt
    eyeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Nếu mật khẩu đang bị ẩn
            if (passwordInput.type === 'password') {
                // Hiển thị mật khẩu
                passwordInput.type = 'text';
                // Đổi biểu tượng để hiển thị rằng mật khẩu đang hiện
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                // Nếu mật khẩu đang hiện, ẩn nó
                passwordInput.type = 'password';
                // Đổi biểu tượng để hiển thị rằng mật khẩu đang bị ẩn
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
  };
  
  // Gọi hàm để kích hoạt chức năng bật/tắt hiển thị mật khẩu
  togglePasswordVisibility();
  


// Chọn phần tử nút đăng nhập
const loginButton = document.querySelector('.btn');

// Thêm sự kiện click cho nút đăng nhập
loginButton.addEventListener('click', async () => {
    // Lấy giá trị của input tên đăng nhập và mật khẩu
    const username = document.getElementById('Tai-Khoan').value.trim();
    const password = document.getElementById('mat-khau').value.trim();
    
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    if (username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
        return; // Thoát khỏi hàm nếu một trong hai trường bị trống
    }
    
    try {
        // Gửi yêu cầu POST tới API đăng nhập với tên đăng nhập và mật khẩu
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Kiểm tra mã trạng thái của phản hồi
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            // Kiểm tra xem đăng nhập thành công và có thông tin người dùng cần thiết
            if (data.status === 'success' && data.user && data.user.token) {
                alert('Đăng nhập thành công!');
                // Lưu token vào localStorage
                localStorage.setItem('Token', data.user.token);
                // Lưu các thông tin khác nếu cần thiết
                localStorage.setItem('UserID', data.user.user_id);
                localStorage.setItem('Username', data.user.username);
                localStorage.setItem('Role', JSON.stringify(data.user.role));
                localStorage.setItem('Permissions', JSON.stringify(data.user.permissions));
                
                // Chuyển hướng tới trang chủ
                window.location.href = '../html/trang_home.html';
            } else {
                // Thông báo cho người dùng biết thông tin đăng nhập không đúng
                alert('Tên đăng nhập hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
            }
        } else {
            // Xử lý lỗi HTTP
            alert('Đã xảy ra lỗi khi đăng nhập, xin vui lòng thử lại sau!');
        }
    } catch (error) {
        // Xử lý lỗi mạng hoặc các lỗi khác
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi kết nối tới server, xin vui lòng thử lại sau!');
    }
});





//  // Chọn phần tử nút đăng nhập
// const loginButton = document.querySelector('.btn');

// // Thêm sự kiện click cho nút đăng nhập
// loginButton.addEventListener('click', async () => {
//     // Lấy giá trị của input tên đăng nhập và mật khẩu
//     const username = document.getElementById('Tai-Khoan').value.trim();
//     const password = document.getElementById('mat-khau').value.trim();
    
//     // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
//     if (!username || !password) {
//         alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
//         return; // Thoát khỏi hàm nếu một trong hai trường bị trống
//     }
    
//     try {
//         // Gửi yêu cầu POST tới API đăng nhập với tên đăng nhập và mật khẩu
//         const response = await fetch('http://localhost:8000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         // Nếu phản hồi OK (mã trạng thái 200-299)
//         if (response.ok) {
//             const data = await response.json();
//             // Kiểm tra xem đăng nhập thành công và có thông tin người dùng cần thiết
//             if (data.success && data.user && data.user.id && data.user.token && data.user.role && username === username && password === password) {
//                 alert('Đăng nhập thành công!');
//                 // Lưu ID người dùng, token và vai trò vào localStorage
//                 localStorage.setItem('ID', data.user.id);
//                 localStorage.setItem('Token', data.user.token);
//                 localStorage.setItem('Role', data.user.role);
//                 // Chuyển hướng tới trang chủ
//                 window.location.href = '../html/trang_home.html';
//                 console.log(id)
//                 console.log(user);
//                 console.log(token);
//                 console.log(role);
//             } else {
//                 // Thông báo cho người dùng biết thông tin đăng nhập không đúng
//                 alert('Tên đăng nhập hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
//             }
//         } else {
//             // Xử lý lỗi HTTP
//             alert('Đã xảy ra lỗi khi đăng nhập, xin vui lòng thử lại sau!');
//         }
//     } catch (error) {
//         // Xử lý lỗi mạng hoặc các lỗi khác
//         console.error('Error:', error);
//         alert('Đã xảy ra lỗi khi kết nối tới server, xin vui lòng thử lại sau!');
//     }
// });
