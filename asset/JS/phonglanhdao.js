// Khi trang web được tải, gọi hàm fetchData để lấy dữ liệu từ máy chủ
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

// Hàm fetchData gửi yêu cầu lấy dữ liệu từ máy chủ thông qua API
function fetchData() {
    // Lấy token từ localStorage
    const token = localStorage.getItem('Token');

    // Gửi yêu cầu GET đến API với token để xác thực
    fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    // Xử lý phản hồi từ máy chủ
    .then(response => {
        // Kiểm tra nếu yêu cầu thành công
        if (response.ok) {
            // Kiểm tra kiểu dữ liệu phản hồi
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Nếu kiểu dữ liệu là JSON, chuyển đổi phản hồi thành JSON
                return response.json();
            } else {
                // Nếu không phải JSON, đọc phản hồi dưới dạng văn bản
                return response.text();
            }
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        // Kiểm tra nếu phản hồi là JSON
        if (typeof data === 'object' && data !== null) {
            // Hiển thị dữ liệu trên giao diện người dùng
            displayData(data.data);
        } else {
            console.error('Phản hồi không phải là JSON:', data);
        }
    })
    // Bắt lỗi nếu có
    .catch(error => console.error('Error fetching data:', error));
}

// Hàm displayData hiển thị dữ liệu trả về từ máy chủ lên giao diện người dùng
function displayData(data) {
    // Lấy phần tử tbody của bảng
    const tableBody = document.getElementById('table-body');
    // Xóa dữ liệu cũ trong tbody
    tableBody.innerHTML = '';

    // Duyệt qua mảng dữ liệu và tạo các hàng cho bảng
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.date_of_birth}</td>
            <td>${item.gender === 1 ? 'Nam' : 'Nữ'}</td>
            <td>${item.citizen_identification_card}</td>
            <td>${item.address}</td>
            <td>${item.phone_number}</td>
            <td>${item.email}</td>
            <td>${item.job_position}</td>
            <td>${item.working_unit}</td>
            <td>${item.salary_level}</td>
            <td>${item.date_start_work}</td>
            <td>${item.note}</td>
        `;
        // Thêm sự kiện click để điền dữ liệu vào form khi người dùng nhấp vào hàng
        row.addEventListener('click', () => {
            fillForm(item);
        });
        // Thêm hàng vào tbody
        tableBody.appendChild(row);
    });
}

// Hàm fillForm điền dữ liệu của một người dùng vào form khi người dùng nhấp vào một hàng trong bảng
function fillForm(user) {
    // Điền thông tin của người dùng vào các trường input tương ứng
    // document.getElementById('id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('date_of_birth').value = user.date_of_birth;
    document.getElementById('citizen_identification_card').value = user.citizen_identification_card;
    document.getElementById('address').value = user.address;
    document.getElementById('phone_number').value = user.phone_number;
    document.getElementById('email').value = user.email;
    document.getElementById('job_position').value = user.job_position;
    document.getElementById('working_unit').value = user.working_unit;
    document.getElementById('salary_level').value = user.salary_level;
    document.getElementById('date_start_work').value = user.date_start_work;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;
    document.getElementById('note').value = user.note;

    // Kiểm tra giới tính và chọn đúng radio button
    if (user.gender === 1) {
        document.getElementById('male').checked = true;
    } else {
        document.getElementById('female').checked = true;
    }
}

// Hàm addData gửi yêu cầu POST để thêm một người dùng mới vào cơ sở dữ liệu
function addData() {
    // Lấy token từ localStorage
    const token = localStorage.getItem('Token');
    if (!token) {
        console.error('No token found in localStorage');
        alert('No authentication token found. Please login again.');
        return;
    }

    // Lấy CSRF token từ meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Lấy dữ liệu người dùng từ form
    const newUser = getUserFormData();
    console.log('Attempting to add user with data:', newUser);

    // Sử dụng axios để gửi yêu cầu POST với dữ liệu người dùng và headers xác thực
    axios.post('http://localhost:8000/api/users', newUser, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-CSRF-TOKEN': csrfToken
        }
    })
    .then(response => {
        const data = response.data;
        if (data.success) {
            console.log('User added:', data);
            alert('User successfully added!');
            fetchData();
        } else {
            console.error('Failed to add user:', data.message);
            alert('Failed to add user: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding user:', error);
        alert('Error adding user: ' + error.message);
    });
}

// Hàm editData gửi yêu cầu PUT để sửa thông tin của một người dùng
function editData() {
    // Lấy token từ localStorage
    const token = localStorage.getItem('Token');
    // Lấy dữ liệu người dùng đã cập nhật từ form
    const updatedUser = getUserFormData();

    // Gửi yêu cầu PUT đến API với dữ liệu người dùng và headers xác thực
    fetch(`http://localhost:8000/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User updated:', data);
        // Sau khi sửa thành công, làm mới dữ liệu trong bảng
        fetchData();
    })
    .catch(error => console.error('Error updating user:', error));
}

// Hàm deleteData gửi yêu cầu DELETE để xóa một người dùng khỏi cơ sở dữ liệu
function deleteData() {
    // Lấy token từ localStorage
    const token = localStorage.getItem('Token');
    // Lấy ID người dùng từ form
    const userId = document.getElementById('id').value;

    // Gửi yêu cầu DELETE đến API với ID người dùng và headers xác thực
    fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('User deleted:', data);
        // Sau khi xóa thành công, làm mới dữ liệu trong bảng
        fetchData();
    })
    .catch(error => console.error('Error deleting user:', error));
}

// Hàm refreshData gọi hàm resetData để xóa dữ liệu đang nhập trên form
function refreshData() {
    resetData();
}

// Hàm resetData xóa dữ liệu đang nhập trên form bằng cách đặt giá trị rỗng cho các trường input
function resetData() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('date_of_birth').value = '';
    document.getElementById('citizen_identification_card').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone_number').value = '';
    document.getElementById('email').value = '';
    document.getElementById('job_position').value = '';
    document.getElementById('working_unit').value = '';
    document.getElementById('salary_level').value = '';
    document.getElementById('date_start_work').value = '';
    document.getElementById('note').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
}

// Hàm getUserFormData lấy dữ liệu từ các trường input trên form và trả về dưới dạng một đối tượng JSON
function getUserFormData() {
    // Tạo đối tượng userData chứa dữ liệu từ form
    const userData = {
        // id: document.getElementById('id').value, // Lấy ID người dùng nếu có (cho edit)
        name: document.getElementById('name').value,
        date_of_birth: document.getElementById('date_of_birth').value,
        citizen_identification_card: document.getElementById('citizen_identification_card').value,
        address: document.getElementById('address').value,
        phone_number: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        job_position: document.getElementById('job_position').value,
        working_unit: document.getElementById('working_unit').value,
        salary_level: document.getElementById('salary_level').value,
        date_start_work: document.getElementById('date_start_work').value,
        note: document.getElementById('note').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        gender: document.querySelector('input[name="gender"]:checked').value
    };

    // Trả về đối tượng userData
    return userData;
}

// Hàm btnthoat thực hiện các hành động khi người dùng nhấp vào nút "Thoát"
function btnthoat() {
    // Thực hiện hành động cụ thể khi người dùng thoát, ví dụ: điều hướng về trang chủ hoặc đóng form
    // Ví dụ: điều hướng về trang chủ
    window.location.href = '../html/trang_home.html';
}