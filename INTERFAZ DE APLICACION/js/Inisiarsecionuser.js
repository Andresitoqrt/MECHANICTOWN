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
                // Mostrar mensaje de campo obligatorio
                emailInput.setCustomValidity('El correo electrónico es obligatorio.');
                emailInput.reportValidity();
                emailInput.focus();
                return;
            } else {
                emailInput.setCustomValidity('');
            }

            if (password === '') {
                // Mostrar mensaje de campo obligatorio
                passwordInput.setCustomValidity('La contraseña es obligatoria.');
                passwordInput.reportValidity();
                passwordInput.focus();
                return;
            } else {
                passwordInput.setCustomValidity('');
            }

            // Aquí puedes continuar con el proceso de inicio de sesión
        });
    }
});