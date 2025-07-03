document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    if (loginButton && emailInput && passwordInput) {
        loginButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (email === '') {
                alert('El correo electrónico es obligatorio.');
                emailInput.focus();
                return;
            }

            if (password === '') {
                alert('La contraseña es obligatoria.');
                passwordInput.focus();
                return;
            }

            alert(`Intentando iniciar sesión con:\nCorreo: ${email}\nContraseña: ${password}`);
        });
    }
});