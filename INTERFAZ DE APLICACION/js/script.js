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

    monthYear.textContent = `${monthNames[month]} ${year}`;
    calendarDates.innerHTML = "";

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

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

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

let horasReservadas = getSavedAppointments();

function renderHorasReservadas() {
    const contenedorHoras = document.getElementById("horas");
    contenedorHoras.innerHTML = ""; // Limpiar el contenedor

    // Ordenar las horas de forma ascendente
    horasReservadas.sort((a, b) => {
        const [h1, m1] = a.replace(/ AM| PM/, '').split(':').map(Number);
        const [h2, m2] = b.replace(/ AM| PM/, '').split(':').map(Number);
        
        // Lógica para ordenar por AM/PM
        const isPm1 = a.includes('PM');
        const isPm2 = b.includes('PM');

        if (isPm1 !== isPm2) {
            return isPm1 ? 1 : -1;
        }
        
        // Corregir horas AM/PM
        const H1 = (isPm1 && h1 !== 12) ? h1 + 12 : (h1 === 12 && !isPm1 ? 0 : h1);
        const H2 = (isPm2 && h2 !== 12) ? h2 + 12 : (h2 === 12 && !isPm2 ? 0 : h2);

        if (H1 !== H2) {
            return H1 - H2;
        }
        return m1 - m2;
    });
    
    for (const hora of horasReservadas) {
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
    document.getElementById("hora").textContent = `${horaMostrada}:${minutosMostrados}`;
}

function cambiarAmPm(nuevoAmPm) {
    document.getElementById(ampmActual).classList.remove('active');
    document.getElementById(nuevoAmPm).classList.add('active');
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

// Iniciar el reloj al cargar la página
actualizarPantalla();

// --- Lógica de la Cita ---
const btnAgendar = document.getElementById('btn-agendar');

btnAgendar.addEventListener('click', () => {
    const horaSeleccionada = document.getElementById("hora").textContent;
    const ampm = ampmActual.toUpperCase();
    const horaCompleta = `${horaSeleccionada} ${ampm}`;

    // Verificar si la hora ya está reservada
    if (horasReservadas.includes(horaCompleta)) {
        alert('¡Esa hora ya está reservada! Por favor, elige otra.');
        return;
    }

    // Validaciones (opcional)
    const causa = document.getElementById('causa').value;
    const carro = document.getElementById('selected-car-info').textContent;
    if (!causa || !carro) {
        alert('Por favor, completa la causa de la visita y selecciona un carro.');
        return;
    }
    
    // Agregar la nueva cita a la lista y guardarla
    horasReservadas.push(horaCompleta);
    saveAppointments(horasReservadas);

    // Actualizar la lista de horas reservadas en la interfaz
    renderHorasReservadas();

    alert(`Cita agendada para las ${horaCompleta}.`);

    // Limpiar campos después de agendar
    document.getElementById('causa').value = '';
    document.getElementById('selected-car-info').textContent = '';
    updateCount('causa', 100);
});

// --- Lógica del contador de caracteres ---
function updateCount(id, max) {
    const input = document.getElementById(id);
    const count = document.getElementById(`count-${id}`);
    count.textContent = `${input.value.length}/${max}`;
}

// --- Lógica del modal de carros ---
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
                    selectedCarInfo.textContent = selectedCar;
                    carModal.style.display = "none";
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

selectCarBtn.onclick = () => {
    carModal.style.display = "block";
};

closeBtn.onclick = () => {
    carModal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == carModal) {
        carModal.style.display = "none";
    }
};

window.onload = () => {
    generateCarList();
    renderHorasReservadas(); 
};