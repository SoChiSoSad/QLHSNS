// // Khi trang web được tải, gọi hàm fetchData để lấy dữ liệu từ máy chủ
// document.addEventListener('DOMContentLoaded', function () {
//     fetchData();
// });

// // Hàm fetchData gửi yêu cầu lấy dữ liệu từ máy chủ thông qua API
// function fetchData() {
//     const token = localStorage.getItem('Token');

//     if (!token) {
//         alert('Bạn cần đăng nhập để lấy dữ liệu.');
//         return;
//     }

//     fetch('http://localhost:8000/api/users', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             // Đọc và log nội dung phản hồi trong trường hợp có lỗi
//             return response.text().then(text => { throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`); });
//         }
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             return response.json();
//         } else {
//             // Nếu phản hồi không phải là JSON, ném ra một lỗi và log nội dung phản hồi
//             return response.text().then(text => { throw new Error(`Unexpected response type: ${contentType}, Response: ${text}`); });
//         }
//     })
//     .then(data => {
//         if (typeof data === 'object' && data !== null) {
//             displayData(data.data);
//         } else {
//             console.error('Phản hồi không phải là JSON:', data);
//         }
//     })
//     .catch(error => console.error('Error fetching data:', error)); // Bắt lỗi xảy ra trong quá trình fetch dữ liệu
// }



// // Hàm displayData hiển thị dữ liệu trả về từ máy chủ lên giao diện người dùng
// function displayData(data) {
//     // Lấy phần tử tbody của bảng
//     const tableBody = document.getElementById('table-body');
//     // Xóa dữ liệu cũ trong tbody
//     tableBody.innerHTML = '';

//     // Duyệt qua mảng dữ liệu và tạo các hàng cho bảng
//     data.forEach(item => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.name}</td>
//             <td>${item.date_of_birth}</td>
//             <td>${item.gender === 1 ? 'Nam' : 'Nữ'}</td>
//             <td>${item.citizen_identification_card}</td>
//             <td>${item.address}</td>
//             <td>${item.phone_number}</td>
//             <td>${item.email}</td>
//             <td>${item.job_position}</td>
//             <td>${item.working_unit}</td>
//             <td>${item.salary_level}</td>
//             <td>${item.date_start_work}</td>
//             <td>${item.note}</td>
//         `;
//         // Thêm sự kiện click để điền dữ liệu vào form khi người dùng nhấp vào hàng
//         row.addEventListener('click', () => {
//             fillForm(item);
//         });
//         // Thêm hàng vào tbody
//         tableBody.appendChild(row);
//     });
// }

// // Hàm fillForm điền dữ liệu của một người dùng vào form khi người dùng nhấp vào một hàng trong bảng
// function fillForm(user) {
//     // Điền thông tin của người dùng vào các trường input tương ứng
//     document.getElementById('id').value = user.id;
//     document.getElementById('name').value = user.name;
//     document.getElementById('date_of_birth').value = user.date_of_birth;
//     document.getElementById('citizen_identification_card').value = user.citizen_identification_card;
//     document.getElementById('address').value = user.address;
//     document.getElementById('phone_number').value = user.phone_number;
//     document.getElementById('email').value = user.email;
//     document.getElementById('job_position').value = user.job_position;
//     document.getElementById('working_unit').value = user.working_unit;
//     document.getElementById('salary_level').value = user.salary_level;
//     document.getElementById('date_start_work').value = user.date_start_work;
//     document.getElementById('username').value = user.username;
//     document.getElementById('password').value = user.password;
//     document.getElementById('note').value = user.note;

//     // Kiểm tra giới tính và chọn đúng radio button
//     if (user.gender === 1) {
//         document.getElementById('male').checked = true;
//     } else {
//         document.getElementById('female').checked = true;
//     }
// }

// // Function to add new data
// function addData() {
//     const token = localStorage.getItem('Token');
//     if (!token) {
//         alert('Bạn cần đăng nhập trước khi thêm dữ liệu.');
//         return;
//     }

//     const data = {
//         fullname: document.getElementById('name').value,
//         birthday: document.getElementById('date_of_birth').value,
//         gender: document.querySelector('input[name="gender"]:checked').value,
//         cccd: document.getElementById('citizen_identification_card').value,
//         address: document.getElementById('address').value,
//         phonenumber: document.getElementById('phone_number').value,
//         email: document.getElementById('email').value,
//         jobposition: document.getElementById('job_position').value,
//         workingunit: document.getElementById('working_unit').value,
//         salarylevel: document.getElementById('salary_level').value,
//         datestartwork: document.getElementById('date_start_work').value,
//         note: document.getElementById('note').value,
//         username: document.getElementById('username').value,
//         password: document.getElementById('password').value
//     };

//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(data)
//     };

//     fetch('http://localhost:8000/api/users', options)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json(); // Chỉ cố gắng parse JSON nếu phản hồi là OK
//     })
//     .then(serverData => {
//         console.log('Server Response:', serverData);

//         // Save data to localStorage
//         localStorage.setItem('userData', JSON.stringify(data));

//         // Display data on screen
//         displayData(data);
//     })
//     .catch(error => {
//         console.error('There was a problem with your fetch operation:', error);
//     });
// }

// function displayData(data) {
//     const dataContainer = document.getElementById('dataContainer');
//     dataContainer.innerHTML = `
//         <p>Full Name: ${data.fullname}</p>
//         <p>Birthday: ${data.birthday}</p>
//         <p>Gender: ${data.gender}</p>
//         <p>Citizen Identification Card: ${data.cccd}</p>
//         <p>Address: ${data.address}</p>
//         <p>Phone Number: ${data.phonenumber}</p>
//         <p>Email: ${data.email}</p>
//         <p>Job Position: ${data.jobposition}</p>
//         <p>Working Unit: ${data.workingunit}</p>
//         <p>Salary Level: ${data.salarylevel}</p>
//         <p>Date Start Work: ${data.datestartwork}</p>
//         <p>Note: ${data.note}</p>
//         <p>Username: ${data.username}</p>
//         <p>Password: ${data.password}</p>
//     `;
// }

// // Add a container in your HTML to display the data
// // <div id="dataContainer"></div>

// // Hàm editData gửi yêu cầu PUT để sửa thông tin của một người dùng
// function editData() {
//     const token = localStorage.getItem('Token');
//     const updatedUser = getUserFormData();

//     fetch(`http://localhost:8000/api/users/${updatedUser.id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(updatedUser)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('User updated:', data);
//         fetchData(); // Refresh the data table after editing the record
//     })
//     .catch(error => console.error('Error updating user:', error));
// }

// // Hàm deleteData gửi yêu cầu DELETE để xóa một người dùng khỏi cơ sở dữ liệu
// function deleteData() {
//     const token = localStorage.getItem('Token');
//     const userId = document.getElementById('id').value;

//     fetch(`http://localhost:8000/api/users/${userId}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('User deleted:', data);
//         fetchData(); // Refresh the data table after deleting the record
//     })
//     .catch(error => console.error('Error deleting user:', error));
// }

// // Hàm refreshData gọi hàm resetData để xóa dữ liệu đang nhập trên form
// function refreshData() {
//     resetData();
// }

// // Hàm resetData xóa dữ liệu đang nhập trên form bằng cách đặt giá trị rỗng cho các trường input
// function resetData() {
//     document.getElementById('id').value = '';
//     document.getElementById('name').value = '';
//     document.getElementById('date_of_birth').value = '';
//     document.getElementById('citizen_identification_card').value = '';
//     document.getElementById('address').value = '';
//     document.getElementById('phone_number').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('job_position').value = '';
//     document.getElementById('working_unit').value = '';
//     document.getElementById('salary_level').value = '';
//     document.getElementById('date_start_work').value = '';
//     document.getElementById('note').value = '';
//     document.getElementById('username').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('male').checked = false;
//     document.getElementById('female').checked = false;
// }

// // Hàm getUserFormData lấy dữ liệu từ các trường input trên form và trả về dưới dạng một đối tượng JSON
// function getUserFormData() {
//     const id = document.getElementById('id').value;
//     const name = document.getElementById('name').value;
//     const dateOfBirth = document.getElementById('date_of_birth').value;
//     const cccd = document.getElementById('citizen_identification_card').value;
//     const address = document.getElementById('address').value;
//     const phoneNumber = document.getElementById('phone_number').value;
//     const email = document.getElementById('email').value;
//     const jobPosition = document.getElementById('job_position').value;
//     const workingUnit = document.getElementById('working_unit').value;
//     const salaryLevel = document.getElementById('salary_level').value;
//     const dateStartWork = document.getElementById('date_start_work').value;
//     const note = document.getElementById('note').value;
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const gender = document.querySelector('input[name="gender"]:checked').value;

//     const userData = {
//         id: id,
//         name: name,
//         date_of_birth: dateOfBirth,
//         citizen_identification_card: cccd,
//         address: address,
//         phone_number: phoneNumber,
//         email: email,
//         job_position: jobPosition,
//         working_unit: workingUnit,
//         salary_level: salaryLevel,
//         date_start_work: dateStartWork,
//         note: note,
//         username: username,
//         password: password,
//         gender: gender
//     };

//     return userData;
// }

// // Hàm btnthoat thực hiện các hành động khi người dùng nhấp vào nút "Thoát"
// function btnthoat() {
//     window.location.href = '../html/trang_home.html';
// }



// Khi trang web được tải, gọi hàm fetchData để lấy dữ liệu từ máy chủ
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

// Hàm fetchData gửi yêu cầu lấy dữ liệu từ máy chủ thông qua API
function fetchData() {
    const token = localStorage.getItem('Token');

    if (!token) {
        alert('Bạn cần đăng nhập để lấy dữ liệu.');
        return;
    }

    fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            // Đọc và log nội dung phản hồi trong trường hợp có lỗi
            return response.text().then(text => { throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`); });
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            // Nếu phản hồi không phải là JSON, ném ra một lỗi và log nội dung phản hồi
            return response.text().then(text => { throw new Error(`Unexpected response type: ${contentType}, Response: ${text}`); });
        }
    })
    .then(data => {
        if (typeof data === 'object' && data !== null) {
            displayData(data.data);
        } else {
            console.error('Phản hồi không phải là JSON:', data);
        }
    })
    .catch(error => console.error('Error fetching data:', error)); // Bắt lỗi xảy ra trong quá trình fetch dữ liệu
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
            <td>${item.fullname}</td>
            <td>${item.birthday}</td>
            <td>${item.gender === 1 ? 'Nam' : 'Nữ'}</td>
            <td>${item.cccd}</td>
            <td>${item.address}</td>
            <td>${item.phonenumber}</td>
            <td>${item.email}</td>
            <td>${item.jobposition}</td>
            <td>${item.workingunit}</td>
            <td>${item.salarylevel}</td>
            <td>${item.datestartwork}</td>
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
    document.getElementById('id').value = user.id;
    document.getElementById('name').value = user.fullname;
    document.getElementById('date_of_birth').value = user.birthday;
    document.getElementById('citizen_identification_card').value = user.cccd;
    document.getElementById('address').value = user.address;
    document.getElementById('phone_number').value = user.phonenumber;
    document.getElementById('email').value = user.email;
    document.getElementById('job_position').value = user.jobposition;
    document.getElementById('working_unit').value = user.workingunit;
    document.getElementById('salary_level').value = user.salarylevel;
    document.getElementById('date_start_work').value = user.datestartwork;
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

// Function to add new data
function addData() {
    const token = localStorage.getItem('Token');
    if (!token) {
        alert('Bạn cần đăng nhập trước khi thêm dữ liệu.');
        return;
    }

    const data = {
        fullname: document.getElementById('name').value,
        birthday: document.getElementById('date_of_birth').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        cccd: document.getElementById('citizen_identification_card').value,
        address: document.getElementById('address').value,
        phonenumber: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        jobposition: document.getElementById('job_position').value,
        workingunit: document.getElementById('working_unit').value,
        salarylevel: document.getElementById('salary_level').value,
        datestartwork: document.getElementById('date_start_work').value,
        note: document.getElementById('note').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:8000/api/users', options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Chỉ cố gắng parse JSON nếu phản hồi là OK
    })
    .then(serverData => {
        console.log('Server Response:', serverData);

        // Lấy dữ liệu cập nhật từ server và hiển thị
        fetchData();

        // Lưu dữ liệu mới vào localStorage
        localStorage.setItem('userData', JSON.stringify(serverData.data));
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

// Hàm editData gửi yêu cầu PUT để sửa thông tin của một người dùng
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
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('User updated:', data);
        fetchData(); // Refresh the data table after editing the record
    })
    .catch(error => console.error('Error updating user:', error));
}

// Hàm deleteData gửi yêu cầu DELETE để xóa một người dùng khỏi cơ sở dữ liệu
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
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('User deleted:', data);
        fetchData(); // Refresh the data table after deleting the record
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
    const id = document.getElementById('id').value;
    const fullname = document.getElementById('name').value;
    const birthday = document.getElementById('date_of_birth').value;
    const cccd = document.getElementById('citizen_identification_card').value;
    const address = document.getElementById('address').value;
    const phonenumber = document.getElementById('phone_number').value;
    const email = document.getElementById('email').value;
    const jobposition = document.getElementById('job_position').value;
    const workingunit = document.getElementById('working_unit').value;
    const salarylevel = document.getElementById('salary_level').value;
    const datestartwork = document.getElementById('date_start_work').value;
    const note = document.getElementById('note').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    const userData = {
        id: id,
        fullname: fullname,
        birthday: birthday,
        gender: gender,
        cccd: cccd,
        address: address,
        phonenumber: phonenumber,
        email: email,
        jobposition: jobposition,
        workingunit: workingunit,
        salarylevel: salarylevel,
        datestartwork: datestartwork,
        note: note,
        username: username,
        password: password
    };

    return userData;
}

// Hàm btnthoat thực hiện các hành động khi người dùng nhấp vào nút "Thoát"
function btnthoat() {
    window.location.href = '../html/trang_home.html';
}
