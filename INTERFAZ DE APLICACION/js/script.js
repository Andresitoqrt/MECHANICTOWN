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

  // Espacios en blanco antes del primer día
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarDates.appendChild(blank);
  }

  // Crear los días
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


const horas = document.getElementById("horas");
    for (let i = 0; i < 8; i++) {
      const btn = document.createElement("button");
      btn.className = "hora-btn";
      btn.textContent = "11:20";
      btn.onclick = () => {
        document.querySelectorAll('.hora-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      };
      horas.appendChild(btn);
    }

    // Alternar entre AM y PM
    const am = document.getElementById("am");
    const pm = document.getElementById("pm");

    am.onclick = () => {
      am.classList.add('active');
      pm.classList.remove('active');
    };

    pm.onclick = () => {
      pm.classList.add('active');
      am.classList.remove('active');
    };

    // Cambiar hora con flechas
    let horaActual = 6;

    function cambiarHora(delta) {
      horaActual += delta;
      if (horaActual < 1) horaActual = 12;
      if (horaActual > 12) horaActual = 1;
      document.getElementById("hora").textContent = `${horaActual}:00`;
    }