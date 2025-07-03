function togglePasswordVisibility() {
    const passwordField = document.getElementById('contrasena');
    const toggleIcon = document.querySelector('.password-toggle i');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('.btn-register');
    if (registerButton) {
        registerButton.addEventListener('click', (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const identificacion = document.getElementById('identificacion').value;
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;

            if (!nombre || !apellido || !identificacion || !correo || !contrasena) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            console.log('Datos de registro:', {
                nombre,
                apellido,
                identificacion,
                correo,
                contrasena
            });

            alert('¡Registro exitoso! (Consola de desarrollador para ver los datos)');
        });
    }

    const backArrow = document.querySelector('.back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', (event) => {
            event.preventDefault();
            window.history.back();
        });
    }
});