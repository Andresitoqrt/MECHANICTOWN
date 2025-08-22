document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los botones con la clase 'view-details-btn'
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    // Itera sobre cada botón para agregar un 'event listener'
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Encuentra el elemento padre más cercano con la clase 'cards' (la tarjeta completa)
            const parentCard = this.closest('.cards');
            // Dentro de esa tarjeta, encuentra el contenido oculto con la clase 'card-content-new'
            const cardContent = parentCard.querySelector('.card-content-new');

            if (cardContent) {
                // Si el contenido está oculto o no tiene un estilo de display, lo muestra
                if (cardContent.style.display === 'none' || cardContent.style.display === '') {
                    cardContent.style.display = 'block';
                    this.textContent = 'Ocultar Cita'; // Cambia el texto del botón
                } else {
                    cardContent.style.display = 'none'; // Si está visible, lo oculta
                    this.textContent = 'Ver Cita'; // Vuelve a cambiar el texto del botón
                }
            }
        });
    });
});