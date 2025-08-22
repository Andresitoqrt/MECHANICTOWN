document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del formulario
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[placeholder="@ga"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('button');
    
    // Validación del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Validaciones básicas
        if (!username.startsWith('@') || username.length < 3) {
            alert('El usuario debe comenzar con @ y tener al menos 3 caracteres');
            return;
        }
        
        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        // Simular registro exitoso
        alert('¡Registro exitoso! Bienvenido ' + username);
        
        // Limpiar formulario
        form.reset();
    });
    
    // Mejorar la experiencia de usuario
    usernameInput.addEventListener('input', function() {
        if (this.value.startsWith('@')) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#f44336';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value.length >= 6) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#f44336';
        }
    });
});