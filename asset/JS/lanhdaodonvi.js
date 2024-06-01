// Lấy danh sách người dùng từ local storage
let users = JSON.parse(localStorage.getItem('users')) || [];
let maxID = users.length > 0 ? Math.max(...users.map(user => parseInt(user.ID))) : 0;

// Function để thêm người dùng
function them() {
    let ID = ++maxID; // Tăng ID lớn nhất lên một đơn vị
    let fullname = document.getElementById('fullname').value;
    let DonVi = document.getElementById('DonVi').value;
    let ThanhTich = document.getElementById('ThanhTich').value;
    let DanhGia = document.getElementById('DanhGia').value;

    let user = { ID, fullname, DonVi, ThanhTich, DanhGia };
    users.push(user);

    // Cập nhật local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị lại bảng
    hienThiBang();
}

// Function để sửa người dùng
function sua(index) {
    let ID = document.getElementById('ID').value;
    let fullname = document.getElementById('fullname').value;
    let DonVi = document.getElementById('DonVi').value;
    let ThanhTich = document.getElementById('ThanhTich').value;
    let DanhGia = document.getElementById('DanhGia').value;

    users[index] = { ID, fullname, DonVi, ThanhTich, DanhGia };

    // Cập nhật local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị lại bảng
    hienThiBang();
}

// Function để xóa người dùng
function xoa(index) {
    users.splice(index, 1);

    // Cập nhật local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị lại bảng
    hienThiBang();
}

// Function để refresh
function refresh() {
    document.getElementById('ID').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('DonVi').value = '';
    document.getElementById('ThanhTich').value = '';
    document.getElementById('DanhGia').value = '';
}

// Function để điền thông tin của người dùng vào form sửa
function dienThongTin(index) {
    let user = users[index];
    document.getElementById('ID').value = user.ID;
    document.getElementById('fullname').value = user.fullname;
    document.getElementById('DonVi').value = user.DonVi;
    document.getElementById('ThanhTich').value = user.ThanhTich;
    document.getElementById('DanhGia').value = user.DanhGia;
}

// Function để hiển thị bảng
function hienThiBang() {
    let table = document.querySelector('.list-table');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th class="with-size-hoten">Họ Tên</th>
            <th>Đơn Vị</th>
            <th>Thành tích</th>
            <th>Đánh Giá</th>
            <th>Chức năng</th>
        </tr>
    `;
    users.forEach((user, index) => {
        table.innerHTML += `
            <tr>
                <td>${user.ID}</td>
                <td>${user.fullname}</td>
                <td>${user.DonVi}</td>
                <td>${user.ThanhTich}</td>
                <td>${user.DanhGia}</td>
                <td>
                    <button class="button-sua" onclick="dienThongTin(${index})">Sửa</button>
                    <button class="button-xoa" onclick="xoa(${index})">Xóa</button>
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

















// function addRecord() {
//     var id = document.getElementById("ID").value;
//     var fullname = document.getElementById("fullname").value;
//     var donVi = document.getElementById("DonVi").value;
//     var thanhTich = document.getElementById("ThanhTich").value;
//     var danhGia = document.getElementById("DanhGia").value;

//     if (id && fullname && donVi && thanhTich && danhGia) {
//         var table = document.getElementById("recordList");
//         var row = table.insertRow();
//         row.insertCell(0).innerHTML = id;
//         row.insertCell(1).innerHTML = fullname;
//         row.insertCell(2).innerHTML = donVi;
//         row.insertCell(3).innerHTML = thanhTich;
//         row.insertCell(4).innerHTML = danhGia;

//         clearForm();
//     } else {
//         alert("Please fill in all fields.");
//     }
// }

// function deleteRecord() {
//     var id = document.getElementById("ID").value;
//     var table = document.getElementById("recordList");
//     for (var i = 0; i < table.rows.length; i++) {
//         if (table.rows[i].cells[0].innerHTML === id) {
//             table.deleteRow(i);
//             clearForm();
//             return;
//         }
//     }
//     alert("Record not found.");
// }

// function editRecord() {
//     var id = document.getElementById("ID").value;
//     var fullname = document.getElementById("fullname").value;
//     var donVi = document.getElementById("DonVi").value;
//     var thanhTich = document.getElementById("ThanhTich").value;
//     var danhGia = document.getElementById("DanhGia").value;

//     var table = document.getElementById("recordList");
//     for (var i = 0; i < table.rows.length; i++) {
//         if (table.rows[i].cells[0].innerHTML === id) {
//             table.rows[i].cells[1].innerHTML = fullname;
//             table.rows[i].cells[2].innerHTML = donVi;
//             table.rows[i].cells[3].innerHTML = thanhTich;
//             table.rows[i].cells[4].innerHTML = danhGia;
//             clearForm();
//             return;
//         }
//     }
//     alert("Record not found.");
// }

// function clearForm() {
//     document.getElementById("ID").value = "";
//     document.getElementById("fullname").value = "";
//     document.getElementById("DonVi").value = "";
//     document.getElementById("ThanhTich").value = "";
//     document.getElementById("DanhGia").value = "";
// }