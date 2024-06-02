// Hàm xử lý khi người dùng nhấn vào nút Phòng lãnh đạo
function phonglanhdao() {
    window.location.href = "../html/phonglanhdao.html"; // Chuyển hướng đến trang phòng lãnh đạo
}

// Hàm xử lý khi người dùng nhấn vào nút Lãnh đạo các đơn vị
function lanhdaodonvi() {
    window.location.href = "../html/lanhdaodonvi.html"; // Chuyển hướng đến trang lãnh đạo các đơn vị
}

// Hàm xử lý khi người dùng nhấn vào nút Lãnh đạo trường
function lanhdaotruong() {
    window.location.href = "../html/lanhdaotruong.html"; // Chuyển hướng đến trang lãnh đạo trường
}

// Hàm xử lý khi người dùng nhấn vào nút Các nhân sự
function cacnhansu() {
    window.location.href = "../html/cacnhansu.html"; // Chuyển hướng đến trang các nhân sự
}

// Hàm xử lý khi người dùng nhấn vào nút Trợ giúp
function helpme() {
    window.location.href = "../html/trogiup.html"; // Chuyển hướng đến trang trợ giúp
}

// Hàm xử lý khi người dùng nhấn vào nút Trang chủ
function tranghome() {
    window.location.href = '../html/trang_home.html'; // Chuyển hướng đến trang chủ
}

// Hàm xử lý khi người dùng nhấn vào nút Quay lại
function back() {
    window.location.href = "../html/lanhdaodonvi.html"; // Chuyển hướng trở lại trang lãnh đạo các đơn vị
}

// Bắt đầu chương trình đăng xuất

// Hàm xử lý khi người dùng nhấn vào nút Đăng xuất
function signout() {
    sessionStorage.setItem('signedOut', 'true'); // Lưu trạng thái đăng xuất vào sessionStorage
    window.location.href = "../html/login.html"; // Chuyển hướng đến trang đăng nhập
}

// Kiểm tra nếu trạng thái đăng xuất đã được lưu và ngăn người dùng quay lại
window.onload = function() {
    if (sessionStorage.getItem('signedOut')) { // Kiểm tra trạng thái đăng xuất trong sessionStorage
        sessionStorage.removeItem('signedOut'); // Xóa trạng thái đăng xuất để ngăn chặn việc chuyển hướng lại khi làm mới trang
        window.location.href = "../html/login.html"; // Chuyển hướng đến trang đăng nhập nếu trạng thái đăng xuất đã được lưu
    }
}

// Ngăn người dùng sử dụng nút back trong trình duyệt
history.pushState(null, null, location.href); // Đẩy trạng thái mới vào history
window.onpopstate = function () {
    history.go(1); // Ngăn người dùng quay lại trang trước
};

// Gán sự kiện click cho nút Đăng xuất
document.getElementById('signout').addEventListener('click', function() {
    localStorage.removeItem('Token'); // Xóa token từ localStorage
    localStorage.removeItem('Role'); // Xóa vai trò từ localStorage
    window.location.href = '../html/login.html'; // Chuyển hướng người dùng đến trang đăng nhập
});

// Lấy vai trò của người dùng từ localStorage
const userRole = localStorage.getItem('Role');

// Gọi hàm để hiển thị các nút tương ứng với vai trò của người dùng
showButtonsForUserRole(userRole);

// Hàm hiển thị các nút tương ứng với vai trò của người dùng
function showButtonsForUserRole(userRole) {
    switch (userRole) {
        case 'admin':
            break; // Không cần thay đổi gì vì admin có quyền truy cập vào tất cả các nút
        case 'leader':
            // Chặn sự kiện click của nút phonglanhdao
            document.getElementById('phonglanhdao').addEventListener('click', function(event) {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                window.location.href = '../html/trang_home.html'; // Chuyển hướng về trang chủ
                alert('Bạn không có quyền truy cập vào Phòng lãnh đạo!'); // Thông báo không có quyền truy cập
            });
            break;
        case 'personnel':
            // Chặn sự kiện click của nút phonglanhdao
            document.getElementById('phonglanhdao').addEventListener('click', function(event) {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                window.location.href = '../html/trang_home.html'; // Chuyển hướng về trang chủ
                alert('Bạn không có quyền truy cập vào Phòng lãnh đạo!'); // Thông báo không có quyền truy cập
            });
            // Chặn sự kiện click của nút lanhdaodonvi
            document.getElementById('lanhdaodonvi').addEventListener('click', function(event) {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                window.location.href = '../html/trang_home.html'; // Chuyển hướng về trang chủ
                alert('Bạn không có quyền truy cập vào Lãnh đạo các đơn vị!'); // Thông báo không có quyền truy cập
            });
            // Chặn sự kiện click của nút lanhdaotruong
            document.getElementById('lanhdaotruong').addEventListener('click', function(event) {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                window.location.href = '../html/trang_home.html'; // Chuyển hướng về trang chủ
                alert('Bạn không có quyền truy cập vào Lãnh đạo trường!'); // Thông báo không có quyền truy cập
            });
            break;
        default:
            alert('Vai trò của bạn không được hỗ trợ!'); // Thông báo vai trò không được hỗ trợ
            break;
    }
}
