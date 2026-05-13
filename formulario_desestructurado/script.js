document
  .getElementById("registroEvento")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Variables
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const intereses = document.querySelectorAll(
      'input[name="intereses"]:checked',
    );
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    //** 1. Validaciones básicas
    if (!nombre || !correo || !telefono || intereses.length === 0 || !horario) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    //**  2. Validacion de coherencia Horario vs Hora.
    if (horario.value === "mañana") {
      if (hora >= "12:00") {
        alert(
          'Has seleccionado "Mañana", por favor elige una hora antes de las 12:00 PM.',
        );
        return;
      }
    } else if (horario.value === "tarde") {
      if (hora < "12:00" || hora >= "19:00") {
        alert(
          'Has seleccionado "Tarde", por favor elige una hora entre las 12:00 PM y las 07:00 PM.',
        );
        return;
      }
    } else if (horario.value === "noche") {
      if (hora < "19:00") {
        alert(
          'Has seleccionado "Noche", por favor elige una hora a partir de las 07:00 PM.',
        );
        return;
      }
    }

    //** 3. Validación de fechas
    const fechaInput = document.getElementById("fecha");

    // Fecha de hoy
    const hoy = new Date();

    // Formateamos a YYYY-MM-DD
    //Usamos split('T')[0] porque toISOString() devuelve "2023-10-25T14:30..."
    const fechaFormateada = hoy.toISOString().split("T")[0];

    //Establecemos el minimo permitido en el calendario
    fechaInput.min = fechaFormateada;

    if (fecha < hoy) {
      alert("La fecha no puede ser anterior al día de hoy.");
      event.preventDefault(); //Detenemos el envio
      return;
    }

    // Si pasa todas las validaciones
    console.log("Datos del registro:", {
      nombre,
      correo,
      horario,
      hora,
    });

    // Si todo está bien
    alert("Registro exitoso. ¡Gracias por registrarte!");
    this.reset();
  });
