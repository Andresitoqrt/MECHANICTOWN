function togglePasswordVisibility() {
    const passwordField = document.getElementById('contrasena');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordToggle.textContent = 'visibility_off';
    } else {
        passwordField.type = 'password';
        passwordToggle.textContent = 'visibility';
    }
}

function registerUser() {
    const name = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;

    if (name && email && password) {
        alert('Registro exitoso!\nNombre: ' + name + '\nCorreo: ' + email);
        // Here you would typically send this data to a server
        // For demonstration, we'll just show an alert.
    } else {
        alert('Por favor, completa todos los campos.');
    }
}