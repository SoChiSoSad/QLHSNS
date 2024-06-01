// Lấy danh sách người dùng từ local storage
let users = JSON.parse(localStorage.getItem('dataUser')) || [];

// Function để thêm người dùng
function them() {
    let ID = document.getElementById('ID').value;
    let fullname = document.getElementById('fullname').value;
    let Chucvu = document.getElementById('Chucvu').value;
    let DonVi = document.getElementById('DonVi').value;
    let ThanhTich = document.getElementById('ThanhTich').value;
    let DanhGia = document.getElementById('DanhGia').value;
    let kiemDuyet = document.getElementById('good').checked ? "Hoàn thành" : "Chưa hoàn thành";

    let user = { ID, fullname, Chucvu, DonVi, ThanhTich, DanhGia, kiemDuyet };
    users.push(user);

    // Cập nhật local storage
    localStorage.setItem('dataUser', JSON.stringify(users));

    // Hiển thị lại bảng
    hienThiBang();

    // Làm mới các trường nhập dữ liệu
    refresh();
}

// Function để sửa người dùng
function sua(index) {
    let ID = document.getElementById('ID').value;
    let fullname = document.getElementById('fullname').value;
    let Chucvu = document.getElementById('Chucvu').value;
    let DonVi = document.getElementById('DonVi').value;
    let ThanhTich = document.getElementById('ThanhTich').value;
    let DanhGia = document.getElementById('DanhGia').value;
    let kiemDuyet = document.getElementById('good').checked ? "Hoàn thành" : "Chưa hoàn thành";

    users[index] = { ID, fullname, Chucvu, DonVi, ThanhTich, DanhGia, kiemDuyet };

    // Cập nhật local storage
    localStorage.setItem('dataUser', JSON.stringify(users));

    // Hiển thị lại bảng
    hienThiBang();
}

// Function để xóa người dùng
function xoa(index) {
    users.splice(index, 1);

    // Cập nhật local storage
    localStorage.setItem('dataUser', JSON.stringify(users));

    // Hiển thị lại bảng
    hienThiBang();
}

// Function để refresh
function refresh() {
    document.getElementById('ID').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('Chucvu').value = '';
    document.getElementById('DonVi').value = '';
    document.getElementById('ThanhTich').value = '';
    document.getElementById('DanhGia').value = '';
    document.getElementById('good').checked = false;
}

// Function để hiển thị bảng
function hienThiBang() {
    let table = document.querySelector('.list-table');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Phòng ban</th>
            <th>Đơn vị</th>
            <th>Thành tích</th>
            <th>Đánh Giá</th>
            <th>Kiểm duyệt</th>
            <th>Chức năng</th>
        </tr>
    `;
    users.forEach((user, index) => {
        table.innerHTML += `
            <tr>
                <td>${user.ID}</td>
                <td class="with-size-hoten">${user.fullname}</td>
                <td>${user.Chucvu}</td>
                <td>${user.DonVi}</td>
                <td>${user.ThanhTich}</td>
                <td>${user.DanhGia}</td>
                <td>${user.kiemDuyet}</td>
                <td>
                    <button class="capnhap" onclick="sua(${index})">Cập nhập</button>
                </td>
            </tr>
        `;
    });
}

// Gọi hàm hiển thị bảng khi tải trang
hienThiBang();

// Hàm để quay về trang chính
function quayve() {
    window.location.href = './trang_home.html';
}
