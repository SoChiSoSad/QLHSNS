document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

function fetchData() {
    const token =  localStorage.getItem('Token'); // Thay thế 'YOUR_ACCESS_TOKEN' bằng token thực tế của bạn

    fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // In dữ liệu trả về ra console
        displayData(data);
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
        `;
        tableBody.appendChild(row);
    });
}

// Chức năng thêm dữ liệu
function addData() {
    const token = localStorage.getItem('Token'); // Thay thế 'YOUR_ACCESS_TOKEN' bằng token thực tế của bạn
    const newData = {
        name: document.getElementById('name').value,
        date_of_birth: document.getElementById('date_of_birth').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        citizen_identification_card: document.getElementById('citizen_identification_card').value,
        address: document.getElementById('address').value,
        phone_number: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        job_position: document.getElementById('job_position').value,
        working_unit: document.getElementById('working_unit').value,
        salary_level: document.getElementById('salary_level').value,
        date_start_work: document.getElementById('date_start_work').value,
        note: document.getElementById('note').value
    };

    fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // In dữ liệu trả về ra console
        fetchData(); // Làm mới dữ liệu sau khi thêm
    })
    .catch(error => console.error('Error adding data:', error));
}

// Chức năng sửa dữ liệu
function editData() {
    const token = localStorage.getItem('Token'); // Thay thế 'YOUR_ACCESS_TOKEN' bằng token thực tế của bạn
    const id = document.getElementById('id').value;
    const updatedData = {
        name: document.getElementById('name').value,
        date_of_birth: document.getElementById('date_of_birth').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        citizen_identification_card: document.getElementById('citizen_identification_card').value,
        address: document.getElementById('address').value,
        phone_number: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        job_position: document.getElementById('job_position').value,
        working_unit: document.getElementById('working_unit').value,
        salary_level: document.getElementById('salary_level').value,
        date_start_work: document.getElementById('date_start_work').value,
        note: document.getElementById('note').value
    };

    fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // In dữ liệu trả về ra console
        fetchData(); // Làm mới dữ liệu sau khi sửa
    })
    .catch(error => console.error('Error editing data:', error));
}

// Chức năng xóa dữ liệu
function deleteData() {
    const token = localStorage.getItem('Token'); // Thay thế 'YOUR_ACCESS_TOKEN' bằng token thực tế của bạn
    const id = document.getElementById('id').value;

    fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // In dữ liệu trả về ra console
        fetchData(); // Làm mới dữ liệu sau khi xóa
    })
    .catch(error => console.error('Error deleting data:', error));
}

// Chức năng làm mới dữ liệu
function refreshData() {
    fetchData();
}

function btnthoat() {
    window.location.href = '../html/trang_home.html';
}