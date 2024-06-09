document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

function fetchData() {
    const token = localStorage.getItem('Token'); // Lấy token từ localStorage
    fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.user);
        console.log(data.success); // In dữ liệu trả về ra console
        if (data.success) {
            displayData(data.data); // Chuyển data.data thay vì data.success
            console.log(data.data);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayData(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

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
            <td>${item.taikhoan}</td>
            <td>${item.matkhau}</td>
        `;
        row.addEventListener('click', () => {
            fillForm(item);
        });
        tableBody.appendChild(row);
    });
}

function fillForm(user) {
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
    document.getElementById('note').value = user.note;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;

    if (user.gender === 1) {
        document.getElementById('male').checked = true;
    } else {
        document.getElementById('female').checked = true;
    }
}
// function addData() {
//     const token = localStorage.getItem('Token');
//     const newUser = getUserFormData();

//     fetch('http://localhost:8000/api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(newUser)
//     })
//     .then(response => {
//         // Kiểm tra xem phản hồi có phải là JSON không
//         if (response.status === 302) {
//             // Xử lý chuyển hướng tại đây
//             // Ví dụ: bạn có thể gọi hàm để xử lý chuyển hướng
//             handleRedirect(response);
//         } else if (!response.ok) {
//             return response.text().then(text => { throw new Error(text) });
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('User added:', data);
//     })
//     .catch(error => {
//         console.error('Error adding user:', error);
//         // In thêm thông tin về lỗi nếu có
//         console.error('Error response text:', error.message);
//     });
// }

// // Hàm xử lý chuyển hướng
// function handleRedirect(response) {
//     // Thực hiện xử lý chuyển hướng ở đây
//     // Ví dụ: bạn có thể chuyển hướng trang web hoặc thực hiện các hành động khác
//     console.log('Redirecting...');
// }

function addData() {
    const token = localStorage.getItem('Token');
    const newUser = getUserFormData();

    fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser),
        redirect: 'follow'  // Allow fetch to follow redirects automatically
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('User added:', data);
    })
    .catch(error => {
        console.error('Error adding user:', error);
    });
}



function editData() {
    const token = localStorage.getItem('Token');
    const updatedUser = getUserFormData();

    fetch(`http://localhost:8000/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => {
        // Kiểm tra xem phản hồi có phải là JSON không
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log('User updated:', data);
        fetchData(); // Refresh the table
    })
    .catch(error => {
        console.error('Error updating user:', error);
        console.error('Error response text:', error.message);
    });
}

function deleteData() {
    const token = localStorage.getItem('Token');
    const userId = document.getElementById('id').value;

    fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        // Kiểm tra xem phản hồi có phải là JSON không
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log('User deleted:', data);
        fetchData(); // Refresh the table
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        console.error('Error response text:', error.message);
    });
}

function refreshData() {
    fetchData();
    resetForm();
}

function resetForm() {
    // document.getElementById('id').value = '';
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

function getUserFormData() {
    return {
        // id: document.getElementById('id').value,
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
        taikhoan: document.getElementById('username').value,
        matkhau: document.getElementById('password').value,
        gender: document.querySelector('input[name="gender"]:checked').value
    };
}

function btnthoat() {
    // Thêm chức năng thoát nếu cần, ví dụ như điều hướng về trang chủ hoặc đóng form
    // console.log('Thoát');
    window.location.href = '../html/trang_home.html'; // Điều hướng về trang chủ
}
