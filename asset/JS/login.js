
const togglePasswordVisibility = () => {
  const passwordInput = document.getElementById('mat-khau');
  const eyeIcons = document.querySelectorAll('.fa-eye, .fa-eye-slash');
  
  eyeIcons.forEach(icon => {
      icon.addEventListener('click', () => {
          if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
          } else {
              passwordInput.type = 'password';
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
          }
      });
  });
};

// Gọi hàm togglePasswordVisibility() để kích hoạt chức năng
togglePasswordVisibility();



// đăng nhập bằng tài khoản đã được cấp
// const loginButton = document.querySelector('.btn');

// loginButton.addEventListener('click', async () => {
//     const username = document.getElementById('Tai-Khoan').value;
//     const password = document.getElementById('mat-khau').value;
    
//     // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
//     if (username === '' || password === '') {
//         alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
//         return;
//     }
    
//     try {
//         const response = await fetch('http://localhost:8000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             // Giả sử server trả về một đối tượng với thuộc tính 'success' để chỉ ra đăng nhập thành công
//             if (data.success && data.token && username == username || password == password) {
//                 alert('Đăng nhập thành công!');

//                 // Lưu token vào localStorage
//                 localStorage.setItem('authToken', data.token);
//                 // Giải mã token để lấy thông tin role
//                 const decodedToken = jwtDecode(data.token);
//                 const userRole = decodedToken.role;

//                 // Redirect hoặc thực hiện hành động sau khi đăng nhập thành công
//                 window.location.href = '../html/trang_home.html';
//             } else {
//                 alert('Tên đăng nhập hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
//             }
//         } else {
//             // Xử lý lỗi HTTP
//             alert('Đã xảy ra lỗi khi đăng nhập, xin vui lòng thử lại sau!');
//         }
//     } catch (error) {
//         // Xử lý lỗi mạng hoặc lỗi khác
//         console.error('Error:', error);
//         alert('Đã xảy ra lỗi khi kết nối tới server, xin vui lòng thử lại sau!');
//     }
// });

// function jwtDecode(token) {
//     try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         return JSON.parse(jsonPayload);
//     } catch (error) {
//         console.error('Invalid token', error);
//         return null;
//     }
// }
// kết thúc đăng nhập


// const loginButton = document.querySelector('.btn');

// loginButton.addEventListener('click', async () => {
//     const username = document.getElementById('Tai-Khoan').value;
//     const password = document.getElementById('mat-khau').value;
    
//     // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
//     if (username === '' || password === '') {
//         alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
//         return;
//     }
    
//     try {
//         const response = await fetch('http://localhost:8000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password}),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             // Giả sử server trả về một đối tượng với thuộc tính 'success' để chỉ ra đăng nhập thành công
//             if (data.success && data.user.role && data.user.token && username == username || password == password) {
//                 alert('Đăng nhập thành công!');
//                 window.location.href = '../html/trang_home.html';
//                 // Lưu token vào localStorage
//                 localStorage.setItem('Token', data.user.token);
//                 localStorage.setItem('Role', data.user.role);
//                 // Giải mã token để lấy thông tin role
//                 const decodedToken = jwtDecode(data.user.token);
//                 const userRole = decodedToken.user.role;

//                 // Điều hướng dựa trên role của người dùng
//                 if (userRole === 'admin') {
//                     window.location.href = '../html/phonglanhdao.html';
//                     window.location.href = '../html/lanhdaodonvi.html';  
//                     window.location.href = '../html/lanhdaotruong.html';
//                     window.location.href = '../html/cacnhansu.html';
//                 } else if (userRole === 'leader') {
//                     window.location.href = '../html/lanhdaodonvi.html';  
//                     window.location.href = '../html/lanhdaotruong.html';
//                     window.location.href = '../html/cacnhansu.html'; 
//                 } else if (userRole === 'personnel') {
//                     window.location.href = '../html/cacnhansu.html';
//                 } else {
//                     alert('Vai trò của bạn không được hỗ trợ!');
//                 }
//             } else {
//                 alert('Tên đăng nhập hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
//             }
//         } else {
//             // Xử lý lỗi HTTP
//             alert('Đã xảy ra lỗi khi đăng nhập, xin vui lòng thử lại sau!');
//         }
//     } catch (error) {
//         // Xử lý lỗi mạng hoặc lỗi khác
//         console.error('Error:', error);
//         alert('Đã xảy ra lỗi khi kết nối tới server, xin vui lòng thử lại sau!');
//     }
// });

// function jwtDecode(token) {
//     try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         return JSON.parse(jsonPayload);
//     } catch (error) {
//         console.error('Invalid token', error);
//         return null;
//     }
// }


const loginButton = document.querySelector('.btn');

loginButton.addEventListener('click', async () => {
    const username = document.getElementById('Tai-Khoan').value;
    const password = document.getElementById('mat-khau').value;
    
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    if (username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Kiểm tra xem đăng nhập thành công và có thông tin người dùng
            if (data.success && data.user.token && data.user.role && username == username || password == password) {
                alert('Đăng nhập thành công!');
                // Lưu token và vai trò vào localStorage
                localStorage.setItem('Token', data.user.token);
                localStorage.setItem('Role', data.user.role);
                window.location.href ='../html/trang_home.html'
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
            }
        } else {
            // Xử lý lỗi HTTP
            alert('Đã xảy ra lỗi khi đăng nhập, xin vui lòng thử lại sau!');
        }
    } catch (error) {
        // Xử lý lỗi mạng hoặc lỗi khác
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi kết nối tới server, xin vui lòng thử lại sau!');
    }
});
