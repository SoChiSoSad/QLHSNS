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

function helpme(){
    window.location.href = "../html/trogiup.html";
}

function tranghome() {
    window.location.href = '../html/trang_home.html'
}
function back() {
    window.location.href = "../html/lanhdaodonvi.html";
}


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