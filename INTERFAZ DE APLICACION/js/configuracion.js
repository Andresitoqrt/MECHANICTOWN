// /tu_proyecto/js/configuracion.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const notificationsToggle = document.getElementById('notifications-toggle');
    const languageSelect = document.getElementById('language-select');
    const logoutBtn = document.getElementById('logout-btn');
    const body = document.body;

    // Cargar la configuración guardada al inicio
    loadSettings();

    // Event listener para el modo oscuro
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        saveSettings();
    });

    // Event listener para las notificaciones
    notificationsToggle.addEventListener('change', () => {
        saveSettings();
        if (notificationsToggle.checked) {
            alert('Notificaciones activadas.');
        } else {
            alert('Notificaciones desactivadas.');
        }
    });

    // Event listener para el idioma
    languageSelect.addEventListener('change', () => {
        saveSettings();
        alert(`Idioma cambiado a: ${languageSelect.value}`);
    });

    // Event listener para cerrar sesión
    logoutBtn.addEventListener('click', () => {
        alert('Sesión cerrada correctamente.');
        // Aquí podrías redirigir al usuario a la página de inicio de sesión
        // window.location.href = 'login.html';
    });

    // Función para guardar la configuración en el almacenamiento local
    function saveSettings() {
        const settings = {
            darkMode: themeToggle.checked,
            notifications: notificationsToggle.checked,
            language: languageSelect.value
        };
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }

    // Función para cargar la configuración desde el almacenamiento local
    function loadSettings() {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            themeToggle.checked = settings.darkMode;
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
            }
            notificationsToggle.checked = settings.notifications;
            languageSelect.value = settings.language;
        }
    }
});