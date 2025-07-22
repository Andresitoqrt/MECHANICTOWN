document.addEventListener('DOMContentLoaded', () => {
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const addTimeSlotBtn = document.getElementById('addTimeSlotBtn');
    const clearAllTimeSlotsBtn = document.getElementById('clearAllTimeSlotsBtn');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const agendarBtn = document.getElementById('agendarBtn');

    // Función para crear una nueva franja horaria
    const createTimeSlot = () => {
        const timeSlotDiv = document.createElement('div');
        timeSlotDiv.classList.add('time-slot');

        // Input para la hora de inicio
        const startTimeInput = document.createElement('input');
        startTimeInput.type = 'time';
        startTimeInput.className = 'start-time';
        startTimeInput.value = '09:00'; // Valor predeterminado
        // Puedes añadir lógica aquí para validar o guardar el valor
        startTimeInput.addEventListener('change', () => {});


        // Separador
        const separatorSpan = document.createElement('span');
        separatorSpan.classList.add('time-slot-separator');
        separatorSpan.textContent = ' - ';

        // Input para la hora de fin
        const endTimeInput = document.createElement('input');
        endTimeInput.type = 'time';
        endTimeInput.className = 'end-time';
        endTimeInput.value = '17:00'; // Valor predeterminado
        // Puedes añadir lógica aquí para validar o guardar el valor
        endTimeInput.addEventListener('change', () => {});

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-time-slot-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.title = 'Eliminar franja horaria';
        deleteButton.addEventListener('click', () => {
            timeSlotDiv.remove(); // Elimina la franja horaria del DOM
        });

        timeSlotDiv.appendChild(startTimeInput);
        timeSlotDiv.appendChild(separatorSpan);
        timeSlotDiv.appendChild(endTimeInput);
        timeSlotDiv.appendChild(deleteButton);

        return timeSlotDiv;
    };

    // Event listener para añadir una nueva franja horaria
    addTimeSlotBtn.addEventListener('click', () => {
        const newTimeSlot = createTimeSlot();
        timeSlotsContainer.appendChild(newTimeSlot);
    });

    // Event listener para borrar todas las franjas horarias
    clearAllTimeSlotsBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar todas las franjas horarias?')) {
            timeSlotsContainer.innerHTML = ''; // Vacía el contenedor
        }
    });

    // Funcionalidad de pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover 'active' de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Añadir 'active' al botón y contenido seleccionados
            button.classList.add('active');
            const targetTab = button.dataset.tab;
            document.getElementById(`${targetTab}-content`).classList.add('active');
        });
    });

    // --- Implementación del Calendario para Fechas Habiles ---
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    const calendarDaysGrid = document.getElementById('calendarDaysGrid');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const selectAllDaysBtn = document.getElementById('selectAllDaysBtn');

    let currentCalendarMonth = 3; // Abril (0-indexed)
    let currentCalendarYear = 2025;
    let selectedCalendarDates = new Set(); // Almacena las fechas seleccionadas como 'YYYY-MM-DD'

    const renderCalendar = (month, year) => {
        calendarDaysGrid.innerHTML = ''; // Limpiar días previos
        
        // Formatear el nombre del mes (ej. "Abr 2025")
        // `toLocaleString` puede variar ligeramente en mayúsculas/minúsculas según el navegador y la configuración regional.
        // `replace('.', '')` es para quitar el punto que a veces añade `toLocaleString` a las abreviaciones de mes (ej. "Apr.").
        calendarMonthYear.textContent = new Date(year, month).toLocaleString('es', { month: 'short', year: 'numeric' }).replace('.', '');

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // getDay() devuelve 0 para Domingo, 1 para Lunes...
        // Si nuestro calendario inicia en Lunes, y el 1er día del mes es un Martes (getDay()=2), necesitamos 1 día de relleno (Lunes).
        // Si el 1er día es Domingo (getDay()=0), necesitamos 6 días de relleno (L-S).
        let startDayOfWeek = firstDayOfMonth.getDay();
        let paddingDays = (startDayOfWeek === 0) ? 6 : startDayOfWeek - 1;

        // Añadir celdas vacías para los días antes del 1ro del mes
        for (let i = 0; i < paddingDays; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day', 'empty');
            calendarDaysGrid.appendChild(dayDiv);
        }

        // Añadir días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = day;

            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayDiv.dataset.date = fullDate;

            const dateObj = new Date(year, month, day);
            const dayOfWeek = dateObj.getDay(); // 0 para Domingo, 6 para Sábado

            // Deshabilitar Domingos (siguiendo la imagen)
            if (dayOfWeek === 0) { // Es Domingo
                dayDiv.classList.add('disabled');
                // No se añade event listener para deshabilitados
            } else {
                dayDiv.classList.add('selectable'); // Marcar como seleccionable
                dayDiv.addEventListener('click', () => {
                    if (selectedCalendarDates.has(fullDate)) {
                        selectedCalendarDates.delete(fullDate);
                        dayDiv.classList.remove('selected');
                    } else {
                        selectedCalendarDates.add(fullDate);
                        dayDiv.classList.add('selected');
                    }
                });
            }

            // Restaurar estado seleccionado si la fecha ya estaba seleccionada
            if (selectedCalendarDates.has(fullDate)) {
                dayDiv.classList.add('selected');
            }

            calendarDaysGrid.appendChild(dayDiv);
        }
    };

    // Event listeners para la navegación del calendario
    prevMonthBtn.addEventListener('click', () => {
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        renderCalendar(currentCalendarMonth, currentCalendarYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        renderCalendar(currentCalendarMonth, currentCalendarYear);
    });

    // Event listener para "Seleccionar todo"
    selectAllDaysBtn.addEventListener('click', () => {
        const selectableDays = calendarDaysGrid.querySelectorAll('.calendar-day.selectable');
        const allCurrentlySelected = selectableDays.length > 0 && Array.from(selectableDays).every(dayDiv => selectedCalendarDates.has(dayDiv.dataset.date));

        selectableDays.forEach(dayDiv => {
            const date = dayDiv.dataset.date;
            if (allCurrentlySelected) {
                selectedCalendarDates.delete(date);
                dayDiv.classList.remove('selected');
            } else {
                selectedCalendarDates.add(date);
                dayDiv.classList.add('selected');
            }
        });
    });

    // Renderizado inicial del calendario (Abril 2025)
    renderCalendar(currentCalendarMonth, currentCalendarYear);

    // Actualizar funcionalidad del botón Agendar para incluir fechas seleccionadas
    agendarBtn.addEventListener('click', () => {
        const currentActiveTab = document.querySelector('.tab-content.active').id;
        console.log('Botón "Agendar" clicado.');
        console.log('Pestaña activa:', currentActiveTab);

        if (currentActiveTab === 'horas-habiles-content') {
            const timeSlots = document.querySelectorAll('.time-slot');
            const scheduledHours = [];
            timeSlots.forEach(slot => {
                const startTime = slot.querySelector('.start-time').value;
                const endTime = slot.querySelector('.end-time').value;
                if (startTime && endTime) { // Solo si ambos campos están llenos
                    scheduledHours.push({ start: startTime, end: endTime });
                }
            });
            console.log('Horas hábiles a agendar:', scheduledHours);
            alert('Horas hábiles agendadas (ver consola para detalles)!');
            // Aquí iría la lógica para enviar al backend o procesar
        } else if (currentActiveTab === 'fechas-habiles-content') {
            const sortedDates = Array.from(selectedCalendarDates).sort();
            console.log('Fechas hábiles seleccionadas para agendar:', sortedDates);
            alert(`Fechas hábiles agendadas:\n${sortedDates.length > 0 ? sortedDates.join('\n') : 'Ninguna fecha seleccionada'}`);
            // Aquí iría la lógica para enviar al backend o procesar las fechas
        }
    });
});