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
    if (username === "" || password === "") {
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

        // Kiểm tra phản hồi có phải là JSON không
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server response is not JSON');
        }

        // Nếu phản hồi OK (mã trạng thái 200-299)
        if (response.ok) {
            const data = await response.json();
            // Kiểm tra xem đăng nhập thành công và có thông tin người dùng cần thiết
            if (data.status === 'success' && data.user && data.user.user_id && data.user.token && data.user.role) {
                alert('Đăng nhập thành công!');
                // Lưu ID người dùng, token và vai trò vào localStorage
                localStorage.setItem('Token', data.user.token);
                localStorage.setItem('Role', JSON.stringify(data.user.role));
                localStorage.setItem('User', JSON.stringify(data));
                localStorage.setItem('Role', JSON.stringify(data.role));
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

