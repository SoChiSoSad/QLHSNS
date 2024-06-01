// Hàm thêm công trình
function themCongTrinh() {
    let tenCongTrinh = document.getElementById('tenCongTrinh').value;
    let namCongBo = document.getElementById('namCongBo').value;
    let tapChi = document.getElementById('tapChi').value;

    // Tạo một đối tượng mới chứa thông tin công trình
    let congTrinhMoi = {
        ten: tenCongTrinh,
        nam: namCongBo,
        tapChi: tapChi
    };

    // Thêm công trình vào bảng và lưu vào storage cns
    themDongVaoBang(congTrinhMoi);
    luuDanhSachCongTrinh();
}

// Hàm sửa công trình
function suaCongTrinh(index) {
    let tenCongTrinh = document.getElementById('tenCongTrinh').value;
    let namCongBo = document.getElementById('namCongBo').value;
    let tapChi = document.getElementById('tapChi').value;

    // Cập nhật thông tin của công trình
    danhSachCongTrinh[index] = {
        ten: tenCongTrinh,
        nam: namCongBo,
        tapChi: tapChi
    };

    // Cập nhật dòng trong bảng và lưu vào storage cns
    capNhatDongTrongBang(index, danhSachCongTrinh[index]);
    luuDanhSachCongTrinh();
}

// Hàm thêm dòng vào bảng
function themDongVaoBang(congTrinh) {
    let tbody = document.querySelector('.table-ktkl tbody');
    let index = tbody.rows.length + 1;

    let row = `<tr>
            <td>${index}</td>
            <td>${congTrinh.ten}</td>
            <td>${congTrinh.nam}</td>
            <td>${congTrinh.tapChi}</td>
            <td>
                <input class="btn-input" type="button" value="Sửa" onclick="suaCongTrinh(${index - 1})">
                <input class="btn-input" type="button" value="Xóa" onclick="xoaCongTrinh(${index - 1})">
            </td>
        </tr>`;

    tbody.innerHTML += row;
}

// Hàm cập nhật dòng trong bảng
function capNhatDongTrongBang(index, congTrinh) {
    let tbody = document.querySelector('.table-ktkl tbody');
    let row = tbody.rows[index];

    row.cells[1].textContent = congTrinh.ten;
    row.cells[2].textContent = congTrinh.nam;
    row.cells[3].textContent = congTrinh.tapChi;
}

// Lưu danh sách công trình vào storage cns
function luuDanhSachCongTrinh() {
    localStorage.setItem('cns', JSON.stringify(danhSachCongTrinh));
}

// Gọi hàm hiển thị danh sách công trình khi trang được load
hienThiDanhSachCongTrinh();
