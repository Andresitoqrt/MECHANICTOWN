// --- Lógica del Calendario ---
const monthYear = document.getElementById("month-year");
const calendarDates = document.getElementById("calendar-dates");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    if (monthYear) monthYear.textContent = `${monthNames[month]} ${year}`;
    if (calendarDates) calendarDates.innerHTML = "";

    if (calendarDates) {
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement("div");
            calendarDates.appendChild(blank);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = document.createElement("div");
            date.textContent = day;
            date.addEventListener("click", () => {
                document.querySelectorAll(".calendar-dates div").forEach(d => d.classList.remove("selected"));
                date.classList.add("selected");
            });
            calendarDates.appendChild(date);
        }
    }
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

renderCalendar();

// --- Lógica del Selector de Hora y Horas Reservadas ---

// Cargar citas guardadas del localStorage
function getSavedAppointments() {
    const appointments = localStorage.getItem('appointments');
    return appointments ? JSON.parse(appointments) : [];
}

// Guardar citas en localStorage
function saveAppointments(appointments) {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

let allAppointments = getSavedAppointments();
let horasReservadas = allAppointments.map(app => app.hora);

function renderHorasReservadas() {
    const contenedorHoras = document.getElementById("horas");
    if (!contenedorHoras) return;

    contenedorHoras.innerHTML = "";

    const sortedHours = allAppointments.map(app => app.hora).sort((a, b) => {
        const [h1, m1] = a.replace(/ AM| PM/, '').split(':').map(Number);
        const [h2, m2] = b.replace(/ AM| PM/, '').split(':').map(Number);
        
        const isPm1 = a.includes('PM');
        const isPm2 = b.includes('PM');

        if (isPm1 !== isPm2) {
            return isPm1 ? 1 : -1;
        }
        
        const H1 = (isPm1 && h1 !== 12) ? h1 + 12 : (h1 === 12 && !isPm1 ? 0 : h1);
        const H2 = (isPm2 && h2 !== 12) ? h2 + 12 : (h2 === 12 && !isPm2 ? 0 : h2);

        if (H1 !== H2) {
            return H1 - H2;
        }
        return m1 - m2;
    });
    
    for (const hora of sortedHours) {
        const btn = document.createElement("button");
        btn.className = "hora-btn";
        btn.textContent = hora;
        btn.onclick = () => {
            document.querySelectorAll('.hora-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        };
        contenedorHoras.appendChild(btn);
    }
}

let horaActual = 12;
let minutosActuales = 0;
let ampmActual = 'am';

function actualizarPantalla() {
    const horaMostrada = horaActual;
    const minutosMostrados = minutosActuales < 10 ? '0' + minutosActuales : minutosActuales;
    const horaElement = document.getElementById("hora");
    if (horaElement) {
        horaElement.textContent = `${horaMostrada}:${minutosMostrados}`;
    }
}

function cambiarAmPm(nuevoAmPm) {
    const activeAmPm = document.getElementById(ampmActual);
    const newAmPm = document.getElementById(nuevoAmPm);
    if (activeAmPm) activeAmPm.classList.remove('active');
    if (newAmPm) newAmPm.classList.add('active');
    ampmActual = nuevoAmPm;
    actualizarPantalla();
}

function cambiarHora(delta) {
    minutosActuales += delta * 15;

    if (minutosActuales >= 60) {
        minutosActuales = 0;
        horaActual++;
    } else if (minutosActuales < 0) {
        minutosActuales = 45;
        horaActual--;
    }

    if (horaActual > 12) {
        horaActual = 1;
        cambiarAmPm(ampmActual === 'am' ? 'pm' : 'am');
    } else if (horaActual < 1) {
        horaActual = 12;
        cambiarAmPm(ampmActual === 'am' ? 'pm' : 'am');
    }
    actualizarPantalla();
}

actualizarPantalla();

// --- Lógica de la Cita ---
const btnAgendar = document.getElementById('btn-agendar');

if (btnAgendar) {
    btnAgendar.addEventListener('click', () => {
        const fechaSeleccionadaDiv = document.querySelector(".calendar-dates .selected");
        if (!fechaSeleccionadaDiv) {
            alert('Por favor, selecciona una fecha.');
            return;
        }

        const dia = fechaSeleccionadaDiv.textContent;
        const mes = currentDate.getMonth();
        const año = currentDate.getFullYear();
        const fechaCompleta = `${dia}/${mes + 1}/${año}`;

        const horaSeleccionada = document.getElementById("hora").textContent;
        const ampm = ampmActual.toUpperCase();
        const horaCompleta = `${horaSeleccionada} ${ampm}`;

        let allAppointments = getSavedAppointments();
        
        const isReserved = allAppointments.some(app => app.fecha === fechaCompleta && app.hora === horaCompleta);

        if (isReserved) {
            alert('¡Esa fecha y hora ya están reservadas! Por favor, elige otra.');
            return;
        }

        const causaInput = document.getElementById('causa');
        const carroInfo = document.getElementById('selected-car-info');
        
        if (!causaInput || !causaInput.value || !carroInfo || !carroInfo.textContent) {
            alert('Por favor, completa la causa de la visita y selecciona un carro.');
            return;
        }
        
        const newAppointment = {
            fecha: fechaCompleta,
            hora: horaCompleta,
            causa: causaInput.value,
            carro: carroInfo.textContent
        };

        allAppointments.push(newAppointment);
        saveAppointments(allAppointments);

        alert(`Cita agendada para el ${fechaCompleta} a las ${horaCompleta}.`);

        // Recargar el historial y la lista de horas
        renderHorasReservadas();
        renderAppointmentHistory();

        // Limpiar campos después de agendar
        causaInput.value = '';
        carroInfo.textContent = '';
        updateCount('causa', 100);
    });
}

// --- Lógica del contador de caracteres ---
function updateCount(id, max) {
    const input = document.getElementById(id);
    const count = document.getElementById(`count-${id}`);
    if (input && count) {
        count.textContent = `${input.value.length}/${max}`;
    }
}

// --- Lógica del modal de carros (sin cambios) ---
const selectCarBtn = document.getElementById("select-car-btn");
const carModal = document.getElementById("car-modal");
const closeBtn = document.querySelector(".close-btn");
const carListContainer = document.getElementById("car-list-container");
const selectedCarInfo = document.getElementById("selected-car-info");

const carList = {
    "Alemania": {
        "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
        "BMW": ["Serie 1", "Serie 3", "Serie 5", "X1", "X3", "X5"],
        "Mercedes-Benz": ["Clase A", "Clase C", "Clase E", "GLC", "GLE"],
        "Volkswagen": ["Golf", "Polo", "Passat", "Tiguan", "T-Roc"]
    },
    "Estados Unidos": {
        "Chevrolet": ["Spark", "Aveo", "Malibu", "Equinox", "Silverado"],
        "Ford": ["Fiesta", "Focus", "Mustang", "Explorer", "F-150"],
        "Jeep": ["Renegade", "Compass", "Wrangler", "Grand Cherokee"]
    },
    "Japón": {
        "Honda": ["Civic", "Accord", "CR-V", "HR-V", "Pilot"],
        "Toyota": ["Corolla", "Camry", "RAV4", "Hilux", "Tacoma"]
    },
    "Corea del Sur": {
        "Hyundai": ["i10", "Accent", "Elantra", "Tucson", "Santa Fe"],
        "Kia": ["Picanto", "Rio", "Cerato", "Sportage", "Sorento"]
    }
};

function generateCarList() {
    if (!carListContainer) return;

    for (const country in carList) {
        const countryDiv = document.createElement("div");
        countryDiv.className = "car-list-country";
        
        const countryTitle = document.createElement("h3");
        countryTitle.textContent = country;
        countryDiv.appendChild(countryTitle);

        const brandList = document.createElement("ul");
        
        for (const brand in carList[country]) {
            const brandTitle = document.createElement("li");
            brandTitle.innerHTML = `<strong>${brand}</strong>`;
            brandList.appendChild(brandTitle);

            const modelList = carList[country][brand];
            for (const model of modelList) {
                const modelItem = document.createElement("li");
                modelItem.textContent = model;
                modelItem.addEventListener("click", () => {
                    const selectedCar = `${brand} ${model}`;
                    if (selectedCarInfo) selectedCarInfo.textContent = selectedCar;
                    if (carModal) carModal.style.display = "none";
                });
                brandList.appendChild(modelItem);
            }
        }
        countryDiv.appendChild(brandList);
        carListContainer.appendChild(countryDiv);

        countryTitle.addEventListener("click", () => {
            brandList.classList.toggle("show");
        });
    }
}

if (selectCarBtn) {
    selectCarBtn.onclick = () => {
        if (carModal) carModal.style.display = "block";
    };
}
if (closeBtn) {
    closeBtn.onclick = () => {
        if (carModal) carModal.style.display = "none";
    };
}

window.onclick = (event) => {
    if (event.target == carModal) {
        carModal.style.display = "none";
    }
};

// Nueva función para renderizar el historial de citas
function renderAppointmentHistory() {
    const historyContainer = document.querySelector('.appointment-list');
    if (!historyContainer) return;
    
    historyContainer.innerHTML = '';
    const appointments = getSavedAppointments();
    
    if (appointments.length === 0) {
        historyContainer.innerHTML = '<p>No hay citas agendadas aún.</p>';
        return;
    }

    appointments.forEach(appointment => {
        const card = document.createElement('div');
        card.className = 'cards historial';
        card.innerHTML = `
            <div class="cards-header-new">
                <h3>${appointment.fecha}</h3>
                <div class="service-details">
                    <span class="service-tag">Servicio</span>
                    <span class="service-name">${appointment.causa}</span>
                </div>
                <button class="view-details-btn">Ver Cita</button>
            </div>
            <div class="card-content-new" style="display: none;">
                <div class="info-block">
                    <span class="info-label">Día</span>
                    <span class="info-value">${appointment.fecha}</span>
                </div>
                <div class="info-block">
                    <span class="info-label">Hora</span>
                    <span class="info-value">${appointment.hora}</span>
                </div>
                <div class="info-block">
                    <span class="info-label">Carro</span>
                    <span class="info-value">${appointment.carro}</span>
                </div>
            </div>
        `;
        historyContainer.appendChild(card);
    });
    
    // Re-aplicar la lógica de desplegar/ocultar a los nuevos botones
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = this.closest('.cards');
            const cardContent = parentCard.querySelector('.card-content-new');
            if (cardContent) {
                if (cardContent.style.display === 'none' || cardContent.style.display === '') {
                    cardContent.style.display = 'block';
                    this.textContent = 'Ocultar Cita';
                } else {
                    cardContent.style.display = 'none';
                    this.textContent = 'Ver Cita';
                }
            }
        });
    });
}

window.onload = () => {
    generateCarList();
    renderHorasReservadas();
    renderAppointmentHistory();
};