document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const passwordToggle = document.getElementById('passwordToggle');

    if (passwordInput && passwordToggle) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

      
            passwordToggle.querySelector('i').classList.toggle('fa-eye');
            passwordToggle.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }


    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = document.querySelector('input[type="email"]').value;
            const password = passwordInput.value;

         
            if (email && password) {
                alert('Attempting to log in with:\nEmail: ' + email + '\nPassword: ' + password);

            } else {
                alert('Por Favor poner todos los campos');
            }
        });
    }
});