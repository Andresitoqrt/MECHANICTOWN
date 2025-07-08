document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('nextButton');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            alert('¡Botón Siguiente presionado!');
        });
    }
});