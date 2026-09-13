const apiURL = "https://6aa5fac1d7765db98507208b.mockapi.io/invitados";

// Registrar invitado
document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const asistencia = document.getElementById("asistencia").value;

  const nuevoInvitado = { nombre, email, asistencia };
  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoInvitado)
  });

  alert("Registro enviado con éxito 🎉");
  e.target.reset();
});

// Consultar invitados
document.getElementById("verInvitados").addEventListener("click", async () => {
  const res = await fetch(apiURL);
  const invitados = await res.json();
  const lista = invitados.map(i => `${i.nombre} - ${i.asistencia}`).join("<br>");
  document.getElementById("resultado").innerHTML = lista;
});

// Calcular días restantes
document.getElementById("verDias").addEventListener("click", () => {
  const fechaEvento = new Date("2026-10-15");
  const hoy = new Date();
  const diasRestantes = Math.ceil((fechaEvento - hoy) / (1000 * 60 * 60 * 24));
  document.getElementById("resultado").innerHTML = `Faltan ${diasRestantes} días para el evento 💖`;
});

function iniciarCuentaRegresiva(fechaEvento) {
  const countdown = document.getElementById("countdown");

  function actualizar() {
    const ahora = new Date();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
      countdown.innerHTML = "¡El gran día ha llegado! 🎉";
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

    countdown.innerHTML = `Faltan ${dias} días, ${horas} horas y ${minutos} minutos 💖`;
  }

  actualizar();
  const intervalo = setInterval(actualizar, 60000); // actualiza cada minuto
}




async function obtenerFechaEvento() {
  try {
    // URL de tu endpoint en Mokapi
    const respuesta = await fetch("https://6aa6ae8bd7765db985078400.mockapi.io/fechadeevento/1");
    const data = await respuesta.json();

    // Asegurate que el JSON tenga un campo "fecha" en formato ISO
    // Ejemplo: { "fecha": "2026-10-30T22:00:00" }
    const fechaEvento = new Date(data.fecha);

    iniciarCuentaRegresiva(fechaEvento);
  } catch (error) {
    console.error("Error al obtener la fecha del evento:", error);
  }
}

obtenerFechaEvento();


