document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email'); // Get the email input element

    // Toggle password visibility
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Optionally change the eye icon:
            // passwordToggle.innerHTML = (type === 'password') ? '&#128065;' : '&#128064;';
        });
    }

    // Handle login button click with validation
    if (loginButton && emailInput && passwordInput) { // Ensure all elements exist
        loginButton.addEventListener('click', () => {
            const email = emailInput.value.trim(); // Get and trim whitespace from email
            const password = passwordInput.value.trim(); // Get and trim whitespace from password

            if (email === '') {
                alert('El correo electrónico es obligatorio.');
                emailInput.focus(); // Focus on the email field
                return; // Stop the function if email is empty
            }

            if (password === '') {
                alert('La contraseña es obligatoria.');
                passwordInput.focus(); // Focus on the password field
                return; // Stop the function if password is empty
            }

            // If both fields are filled, proceed with login attempt
            alert(`Intentando iniciar sesión con:\nCorreo: ${email}\nContraseña: ${password}`);
            // In a real application, you would send this data to your server for authentication
            // Example: sendLoginRequest(email, password);
        });
    }
});