// Hàm xử lý khi người dùng nhấn vào nút Phòng lãnh đạo
function phonglanhdao() {
    window.location.href = "../html/phonglanhdao.html";
}

// Hàm xử lý khi người dùng nhấn vào nút Lãnh đạo các đơn vị
function lanhdaodonvi() {
    window.location.href = "../html/lanhdaodonvi.html";
}

// Hàm xử lý khi người dùng nhấn vào nút Lãnh đạo trường
function lanhdaotruong() {
    window.location.href = "../html/lanhdaotruong.html";
}

// Hàm xử lý khi người dùng nhấn vào nút Các nhân sự
function cacnhansu() {
    window.location.href = "../html/cacnhansu.html";
}

// Hàm xử lý khi người dùng nhấn vào nút Trợ giúp
function helpme() {
    window.location.href = "../html/trogiup.html";
}

function tranghome() {
    window.location.href = '../html/trang_home.html'
}
function back() {
    window.location.href = "../html/lanhdaodonvi.html";
}

// bắt đầu chương trình đăng xuất
// đăng xuất tài khoản

function signout() {
    sessionStorage.setItem('signedOut', 'true');
    window.location.href = "../html/login.html";
}

// Kiểm tra nếu trạng thái đăng xuất đã được lưu và ngăn người dùng quay lại
window.onload = function() {
    if (sessionStorage.getItem('signedOut')) {
        // Xóa trạng thái đăng xuất để ngăn chặn việc chuyển hướng lại khi làm mới trang
        sessionStorage.removeItem('signedOut');
        // Chuyển hướng đến trang đăng nhập nếu trạng thái đăng xuất đã được lưu
        window.location.href = "../html/login.html";
    }
}

// Ngăn người dùng sử dụng nút back trong trình duyệt
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};


// Gán sự kiện click cho nút Đăng xuất
document.getElementById('signout').addEventListener('click', function() {
    // Xóa token và vai trò từ localStorage
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    // Chuyển hướng người dùng đến trang đăng nhập
    window.location.href = '../html/login.html';
});

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
                event.preventDefault();
                window.location.href = '../html/trang_home.html'
                alert('Bạn không có quyền truy cập vào Phòng lãnh đạo!');
            });
            break;
        case 'personnel':
            // Chặn sự kiện click của nút phonglanhdao và lanhdaodonvi
            document.getElementById('phonglanhdao').addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = '../html/trang_home.html'
                alert('Bạn không có quyền truy cập vào Phòng lãnh đạo!');
            });
            document.getElementById('lanhdaodonvi').addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = '../html/trang_home.html'
                alert('Bạn không có quyền truy cập vào Lãnh đạo các đơn vị!');
            });
            document.getElementById('lanhdaotruong').addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = '../html/trang_home.html'
                alert('Bạn không có quyền truy cập vào Lãnh đạo trường!');
            });
            break;
        default:
            alert('Vai trò của bạn không được hỗ trợ!');
            break;
    }
}



