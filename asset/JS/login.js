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


const loginButton = document.querySelector('.btn');

loginButton.addEventListener('click', () => {
    const username = document.getElementById('Tai-Khoan').value;
    const password = document.getElementById('mat-khau').value;
    
    // Thực hiện kiểm tra thông tin đăng nhập ở đây
    
    // Ví dụ:
    if (username === 'admin' && password === 'admin') {
        alert('Đăng nhập thành công!');
        // Redirect hoặc thực hiện hành động sau khi đăng nhập thành công
        window.location.href ='../html/trang_home.html'
    } else if(username === '' && password === '') {
      alert('Vui lòng nhập đầy đủ (tài khoản và mật khẩu)');
    }
     else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng xin vui lòng nhập lại!');
    }
});


